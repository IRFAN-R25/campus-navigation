import gridData from '../data/bluePathGrid.json';
import { MAP_DIMENSIONS } from '../data/campusData';
import { simplifyPathRDP } from './simplifyPath';

const { rows, cols, scale, b64 } = gridData;

// Unpack bitmask grid once on module load
let grid = null;

function getGrid() {
  if (grid) return grid;

  // In browser, decode base64
  const binaryString = atob(b64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  grid = new Uint8Array(rows * cols);
  for (let byteIdx = 0; byteIdx < bytes.length; byteIdx++) {
    const byte = bytes[byteIdx];
    for (let bit = 7; bit >= 0; bit--) {
      const pixelIdx = byteIdx * 8 + (7 - bit);
      if (pixelIdx < rows * cols) {
        grid[pixelIdx] = (byte >> bit) & 1;
      }
    }
  }

  return grid;
}

// Find nearest point on the dark blue path
function snapToWalkable(targetR, targetC, walkGrid) {
  targetR = Math.max(0, Math.min(rows - 1, targetR));
  targetC = Math.max(0, Math.min(cols - 1, targetC));

  // Quick check center
  if (walkGrid[targetR * cols + targetC] === 1) {
    return { r: targetR, c: targetC };
  }

  // Spiral / radial search outward up to radius 50
  for (let radius = 1; radius < 50; radius++) {
    for (let dr = -radius; dr <= radius; dr++) {
      for (let dc = -radius; dc <= radius; dc++) {
        if (Math.abs(dr) !== radius && Math.abs(dc) !== radius) continue;
        const nr = targetR + dr;
        const nc = targetC + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
          if (walkGrid[nr * cols + nc] === 1) {
            return { r: nr, c: nc };
          }
        }
      }
    }
  }

  return { r: targetR, c: targetC };
}

export function calculateShortestPath(nodes, edges, startId, endId, wheelchairMode = false, locations = []) {
  if (!startId || !endId) return null;

  const walkGrid = getGrid();

  // Find start and end pixel coordinates in map space (3392 x 3913)
  let startX = 1805;
  let startY = 299; // Default Main Gate
  let endX = 1373;
  let endY = 2689; // Default Auditorium

  if (startId === 'USER_CURRENT_GPS') {
    startX = 1805;
    startY = 299;
  } else {
    const startLoc = locations.find(l => l.id === startId);
    if (startLoc) {
      if (startLoc.customCoords) {
        startX = startLoc.customCoords.x;
        startY = startLoc.customCoords.y;
      } else {
        const n = nodes.find(nd => nd.id === startLoc.nearest_node_id);
        if (n) { startX = n.x; startY = n.y; }
      }
    }
  }

  const endLoc = locations.find(l => l.id === endId);
  if (endLoc) {
    if (endLoc.customCoords) {
      endX = endLoc.customCoords.x;
      endY = endLoc.customCoords.y;
    } else {
      const n = nodes.find(nd => nd.id === endLoc.nearest_node_id);
      if (n) { endX = n.x; endY = n.y; }
    }
  }

  const sR = Math.round(startY / scale);
  const sC = Math.round(startX / scale);
  const eR = Math.round(endY / scale);
  const eC = Math.round(endX / scale);

  const startPt = snapToWalkable(sR, sC, walkGrid);
  const endPt = snapToWalkable(eR, eC, walkGrid);

  const startIdx = startPt.r * cols + startPt.c;
  const endIdx = endPt.r * cols + endPt.c;

  if (startIdx === endIdx) {
    return {
      polylineCoordinates: [[MAP_DIMENSIONS.height - startPt.r * scale, startPt.c * scale]],
      totalDistance: 0,
      estimatedTimeMinutes: 1,
      steps: [{ instruction: 'You have arrived at your destination.', distance: 0, turnType: 'destination' }]
    };
  }

  // Fast A* Search
  const gScore = new Float32Array(rows * cols).fill(Infinity);
  const fScore = new Float32Array(rows * cols).fill(Infinity);
  const cameFrom = new Int32Array(rows * cols).fill(-1);
  const closed = new Uint8Array(rows * cols);

  gScore[startIdx] = 0;
  fScore[startIdx] = Math.hypot(startPt.r - endPt.r, startPt.c - endPt.c);

  const openSet = [startIdx];

  while (openSet.length > 0) {
    // Pick node with lowest fScore
    let minI = 0;
    let minF = fScore[openSet[0]];
    for (let i = 1; i < openSet.length; i++) {
      const f = fScore[openSet[i]];
      if (f < minF) {
        minF = f;
        minI = i;
      }
    }

    const currentIdx = openSet.splice(minI, 1)[0];
    if (currentIdx === endIdx) break;

    closed[currentIdx] = 1;
    const currR = Math.floor(currentIdx / cols);
    const currC = currentIdx % cols;
    const currG = gScore[currentIdx];

    // 8 neighbors
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        const nr = currR + dr;
        const nc = currC + dc;
        if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;

        const nIdx = nr * cols + nc;
        if (walkGrid[nIdx] !== 1 || closed[nIdx] === 1) continue;

        const moveCost = (dr !== 0 && dc !== 0) ? 1.414 : 1.0;
        const tentativeG = currG + moveCost;

        if (tentativeG < gScore[nIdx]) {
          cameFrom[nIdx] = currentIdx;
          gScore[nIdx] = tentativeG;
          const h = Math.hypot(nr - endPt.r, nc - endPt.c);
          fScore[nIdx] = tentativeG + h * 1.15; // Fast weighted A*

          if (!openSet.includes(nIdx)) {
            openSet.push(nIdx);
          }
        }
      }
    }
  }

  if (cameFrom[endIdx] === -1 && startIdx !== endIdx) {
    return null; // No path
  }

  // Reconstruct path
  const rawPath = [];
  let curr = endIdx;
  while (curr !== -1) {
    const r = Math.floor(curr / cols);
    const c = curr % cols;
    rawPath.unshift([r * scale, c * scale]); // [y, x]
    curr = cameFrom[curr];
  }

  // Simplify smooth path using RDP
  const smoothed = simplifyPathRDP(rawPath, 4);

  // Convert to Leaflet coordinates [lat, lng] = [height - y, x]
  const polylineCoordinates = smoothed.map(([y, x]) => [
    MAP_DIMENSIONS.height - y,
    x
  ]);

  // Calculate real distance in meters (~0.45m per pixel)
  let pixelDist = 0;
  for (let i = 0; i < smoothed.length - 1; i++) {
    pixelDist += Math.hypot(smoothed[i + 1][1] - smoothed[i][1], smoothed[i + 1][0] - smoothed[i][0]);
  }
  const meters = Math.round(pixelDist * 0.45);
  const etaMinutes = Math.max(1, Math.round(meters / 75)); // 75m/min walking pace

  // Generate Google Maps-style turn-by-turn guidance
  const steps = [];
  steps.push({
    stepNumber: 1,
    instruction: `Head out onto the dark blue walkway towards ${endLoc?.building || 'destination'}`,
    distance: Math.round(meters * 0.2),
    turnType: 'straight'
  });

  if (meters > 120) {
    steps.push({
      stepNumber: 2,
      instruction: 'Follow the main blue pedestrian path along academic corridor',
      distance: Math.round(meters * 0.5),
      turnType: 'straight'
    });
    steps.push({
      stepNumber: 3,
      instruction: `Turn toward ${endLoc?.name || 'Destination'} entrance`,
      distance: Math.round(meters * 0.3),
      turnType: 'destination'
    });
  } else {
    steps.push({
      stepNumber: 2,
      instruction: `Arrive at ${endLoc?.name || 'Destination'}`,
      distance: Math.round(meters * 0.8),
      turnType: 'destination'
    });
  }

  return {
    polylineCoordinates,
    totalDistance: meters,
    estimatedTimeMinutes: etaMinutes,
    steps
  };
}
