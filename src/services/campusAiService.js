// Campus AI Intelligence Service for Campus Navigation - BIT Sathy
// Provides client-side semantic intent parsing, natural language routing, and campus knowledge.

import { CATEGORIES, INITIAL_LOCATIONS, INITIAL_NODES } from '../data/campusData';

// Campus Knowledge Base with curated FAQs, timings, tips, and keywords
const CAMPUS_KNOWLEDGE = [
  {
    category: 'dining',
    keywords: ['coffee', 'tea', 'snack', 'snacks', 'food', 'canteen', 'cafeteria', 'eat', 'hungry', 'lunch', 'breakfast', 'juice', 'bakery', 'dinner'],
    primaryLocationId: 'loc-14',
    secondaryLocationIds: ['loc-15', 'loc-17'],
    reply: "For dining and refreshments, you have multiple options! The **Central Cafeteria & Food Court** serves meals, short eats, hot coffee, and fresh juices. If it's late evening or night, head to the **Night Canteen & Bakery** near the hostel complex.",
    tips: "Central Cafeteria is open 7:30 AM – 8:30 PM. Night Canteen stays open till 10:30 PM."
  },
  {
    category: 'study',
    keywords: ['study', 'library', 'books', 'silent', 'reading', 'read', 'digital library', 'journals', 'peaceful', 'quiet', 'exam prep'],
    primaryLocationId: 'loc-09',
    secondaryLocationIds: ['loc-01', 'loc-04'],
    reply: "The best place for focused study is the **Central Library**. It features 3 air-conditioned floors with quiet reading halls, digital catalog access, research journals, and over 100,000 reference volumes.",
    tips: "Central Library is open 8:00 AM – 8:00 PM on all instructional days. Wi-Fi and power sockets are available on all floors."
  },
  {
    category: 'emergency',
    keywords: ['emergency', 'hospital', 'clinic', 'doctor', 'medical', 'medicine', 'sick', 'hurt', 'wound', 'fever', 'first aid', 'pharmacy', 'ambulance'],
    primaryLocationId: 'loc-23',
    secondaryLocationIds: [],
    reply: "⚠️ If you need medical attention, proceed immediately to the **Campus Medical Centre & Pharmacy** located near the Women's Hostel gateway bridge. It operates 24/7 with resident medical staff and emergency ambulance support.",
    tips: "Emergency helpline and 24/7 doctor on call. Free first aid, basic medicines, and observation beds."
  },
  {
    category: 'admin',
    keywords: ['fee', 'fees', 'pay', 'tuition', 'scholarship', 'exam', 'coe', 'hall ticket', 'mark sheet', 'accounts', 'admission', 'principal', 'office'],
    primaryLocationId: 'loc-12',
    secondaryLocationIds: ['loc-11'],
    reply: "For fee payments, scholarship inquiries, semester examination certificates, and COE affairs, visit the **Controller of Examinations (COE) & Accounts** in the Admin Block. For official institutional approvals, visit the **Principal Office**.",
    tips: "Fee counters open Monday to Friday: 9:00 AM – 4:30 PM. Bring your student ID card."
  },
  {
    category: 'money',
    keywords: ['atm', 'bank', 'cash', 'money', 'withdraw', 'baroda', 'deposit'],
    primaryLocationId: 'loc-24',
    secondaryLocationIds: [],
    reply: "Need cash? The **Bank of Baroda 24/7 ATM** and campus branch are situated near the Main Parking junction right along the main entrance boulevard.",
    tips: "2 ATMs active 24/7. Supports UPI QR cash withdrawals and all major bank cards."
  },
  {
    category: 'transport',
    keywords: ['bus', 'bus bay', 'bus terminal', 'transport', 'college bus', 'erode', 'coimbatore', 'tirupur', 'salem', 'day scholar'],
    primaryLocationId: 'loc-25',
    secondaryLocationIds: ['loc-01'],
    reply: "Day scholar transport is stationed at the **Day Scholar Bus Terminal**, accommodating over 50 buses connecting Erode, Tirupur, Coimbatore, Sathyamangalam, and surrounding regions.",
    tips: "Evening buses depart at 5:00 PM sharp from their designated bay numbers."
  },
  {
    category: 'sports',
    keywords: ['sports', 'gym', 'football', 'cricket', 'track', 'running', 'workout', 'basketball', 'tennis', 'badminton', 'volleyball'],
    primaryLocationId: 'loc-21',
    secondaryLocationIds: ['loc-22'],
    reply: "For athletics and workouts, head over to the **Main Sports Complex** featuring a 400m synthetic running track and soccer/cricket fields, or the **Outdoor Basketball & Tennis Courts** beside the central dining avenue.",
    tips: "Floodlit courts are active 5:30 AM – 7:30 AM and 4:30 PM – 7:00 PM."
  },
  {
    category: 'placement',
    keywords: ['placement', 'job', 'interview', 'career', 'recruitment', 'training', 'internship', 'tpo', 'gd hall'],
    primaryLocationId: 'loc-04',
    secondaryLocationIds: ['loc-10'],
    reply: "The **Placement & Career Guidance Cell** is located on the Ground Floor of IB Block next to the Main Auditorium hub. It houses interview chambers, mock GD halls, and corporate training suites.",
    tips: "Formal attire and student identity cards are mandatory during campus recruitment drives."
  },
  {
    category: 'tech_cse',
    keywords: ['cse', 'computer science', 'programming', 'coding', 'ai lab', 'software', 'cloud', 'it dept', 'ib block'],
    primaryLocationId: 'loc-01',
    secondaryLocationIds: ['loc-02', 'loc-03'],
    reply: "The computing disciplines are centered in the **International Block (IB Block)**: CSE on the 1st floor, IT Department on 1st & 2nd floors, and AI & Data Science labs on the 2nd floor with specialized GPU workstations.",
    tips: "All programming labs are equipped with gigabit fiber LAN and high-speed Wi-Fi."
  },
  {
    category: 'hostels',
    keywords: ['hostel', 'room', 'stay', 'accommodation', 'boys hostel', 'girls hostel', 'bhavani', 'ganga', 'cauvery', 'warden'],
    primaryLocationId: 'loc-18',
    secondaryLocationIds: ['loc-19', 'loc-20'],
    reply: "Residential hostel facilities are segregated into secure zones: **Women's Residential Complex (Ganga, Cauvery, Narmadha)** across the security bridge, and **Men's Hostels (Bhavani, Sapphire, Ruby)** along the southeastern ring road.",
    tips: "Hostel gates close at 8:30 PM. Biometric attendance is verified daily."
  }
];

// Helper: Tokenize and score query against text
function calculateSimilarityScore(query, text) {
  if (!query || !text) return 0;
  const qTokens = query.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);
  const target = text.toLowerCase();
  let score = 0;

  for (const token of qTokens) {
    if (token.length < 2) continue;
    if (target.includes(token)) {
      score += token.length >= 4 ? 3 : 1;
    }
  }
  return score;
}

// Extract Origin & Destination if user asks navigation query like "from X to Y"
function parseNavigationIntent(query, locations) {
  const q = query.toLowerCase();
  const fromMatch = q.match(/(?:from|starting from|start at)\s+([^to\n\r]+?)\s+(?:to|towards|heading to)\s+(.+)/i);
  const toMatch = q.match(/(?:how to go to|directions? to|take me to|navigate to|route to|way to|go to)\s+(.+)/i);

  if (fromMatch) {
    const rawOrigin = fromMatch[1].trim();
    const rawDest = fromMatch[2].trim();
    const originLoc = findBestMatchingLocation(rawOrigin, locations);
    const destLoc = findBestMatchingLocation(rawDest, locations);
    if (destLoc) {
      return {
        isNavIntent: true,
        origin: originLoc,
        destination: destLoc,
        confidence: originLoc ? 0.95 : 0.8
      };
    }
  }

  if (toMatch) {
    const rawDest = toMatch[1].trim();
    const destLoc = findBestMatchingLocation(rawDest, locations);
    if (destLoc) {
      return {
        isNavIntent: true,
        origin: null,
        destination: destLoc,
        confidence: 0.85
      };
    }
  }

  return { isNavIntent: false };
}

// Find closest matching location from location array
export function findBestMatchingLocation(term, locations = INITIAL_LOCATIONS) {
  if (!term || !locations.length) return null;
  const cleanTerm = term.toLowerCase().trim();

  // 1. Exact or starts-with name match
  let match = locations.find(l => l.name.toLowerCase() === cleanTerm);
  if (match) return match;

  // 2. Alias match
  match = locations.find(l => l.aliases && l.aliases.some(a => a.toLowerCase() === cleanTerm || cleanTerm.includes(a.toLowerCase())));
  if (match) return match;

  // 3. Substring match
  match = locations.find(l => l.name.toLowerCase().includes(cleanTerm) || (l.building && l.building.toLowerCase().includes(cleanTerm)));
  if (match) return match;

  // 4. Token scoring
  let bestLoc = null;
  let maxScore = 0;
  for (const loc of locations) {
    const corpus = `${loc.name} ${loc.building} ${loc.rooms || ''} ${loc.description || ''} ${(loc.aliases || []).join(' ')}`;
    const score = calculateSimilarityScore(cleanTerm, corpus);
    if (score > maxScore) {
      maxScore = score;
      bestLoc = loc;
    }
  }

  return maxScore >= 2 ? bestLoc : null;
}

// AI Semantic Search for the Search Bar
export function searchLocationsWithAi(query, locations = INITIAL_LOCATIONS) {
  if (!query || !query.trim()) return [];
  const q = query.toLowerCase().trim();

  // 1. Direct text matches
  const directMatches = locations.filter(loc => {
    const matchName = loc.name.toLowerCase().includes(q);
    const matchBuilding = loc.building && loc.building.toLowerCase().includes(q);
    const matchRooms = loc.rooms && loc.rooms.toLowerCase().includes(q);
    const matchAliases = loc.aliases && loc.aliases.some(a => a.toLowerCase().includes(q));
    return matchName || matchBuilding || matchRooms || matchAliases;
  }).map(loc => ({ ...loc, isAiMatch: false, matchReason: 'Keyword Match' }));

  // 2. Semantic Knowledge Base matches (e.g., "fee" -> Admin Office, "doctor" -> Medical Centre)
  const semanticResults = [];
  for (const item of CAMPUS_KNOWLEDGE) {
    const matchedKeyword = item.keywords.find(kw => q.includes(kw) || kw.includes(q));
    if (matchedKeyword) {
      const primaryLoc = locations.find(l => l.id === item.primaryLocationId);
      if (primaryLoc && !directMatches.some(m => m.id === primaryLoc.id)) {
        semanticResults.push({
          ...primaryLoc,
          isAiMatch: true,
          matchReason: `AI Match: "${matchedKeyword}" (${item.category.toUpperCase()})`
        });
      }
      for (const secId of item.secondaryLocationIds) {
        const secLoc = locations.find(l => l.id === secId);
        if (secLoc && !directMatches.some(m => m.id === secLoc.id) && !semanticResults.some(s => s.id === secLoc.id)) {
          semanticResults.push({
            ...secLoc,
            isAiMatch: true,
            matchReason: `AI Suggested: ${item.category}`
          });
        }
      }
    }
  }

  return [...directMatches, ...semanticResults].slice(0, 8);
}

// Main AI Assistant query processing function
export async function queryCampusAi(userQuery, locations = INITIAL_LOCATIONS) {
  const q = userQuery.trim();
  if (!q) {
    return {
      text: "Hello! I am your BIT Sathy Campus AI Guide. Ask me anything like *'Where can I get coffee?'*, *'Where to pay fees?'*, or *'Take me to Mechanical Block'*!",
      action: null,
      locations: []
    };
  }

  // 1. Check for direct navigation intent ("from X to Y" or "how to reach Y")
  const navIntent = parseNavigationIntent(q, locations);
  if (navIntent.isNavIntent && navIntent.destination) {
    const dest = navIntent.destination;
    const origin = navIntent.origin;
    return {
      text: origin
        ? `I have planned your route from **${origin.name}** to **${dest.name}** (${dest.building}). Click below to start Google Maps walking directions!`
        : `I've found **${dest.name}** located at **${dest.building}** (${dest.floor || 'Ground Level'}). Click below to navigate immediately along the pedestrian walkways!`,
      action: {
        type: 'NAVIGATE',
        destinationId: dest.id,
        originId: origin ? origin.id : 'USER_CURRENT_GPS',
        destinationName: dest.name
      },
      locations: [dest],
      tips: `Walking along the dedicated dark blue walkways ensures safety and zero traffic obstructions.`
    };
  }

  // 2. Check Campus Knowledge Base for intents
  let bestKnowledge = null;
  let maxKeywordScore = 0;
  const qLower = q.toLowerCase();

  for (const item of CAMPUS_KNOWLEDGE) {
    let score = 0;
    for (const kw of item.keywords) {
      if (qLower.includes(kw)) {
        score += kw.length >= 5 ? 4 : 2;
      }
    }
    if (score > maxKeywordScore) {
      maxKeywordScore = score;
      bestKnowledge = item;
    }
  }

  if (bestKnowledge && maxKeywordScore > 0) {
    const primaryLoc = locations.find(l => l.id === bestKnowledge.primaryLocationId);
    const secLocs = bestKnowledge.secondaryLocationIds
      .map(id => locations.find(l => l.id === id))
      .filter(Boolean);

    const recLocs = [primaryLoc, ...secLocs].filter(Boolean);

    return {
      text: bestKnowledge.reply,
      action: primaryLoc ? {
        type: 'NAVIGATE',
        destinationId: primaryLoc.id,
        originId: 'USER_CURRENT_GPS',
        destinationName: primaryLoc.name
      } : null,
      locations: recLocs,
      tips: bestKnowledge.tips
    };
  }

  // 3. Fallback: Search across all locations and buildings
  const matchingLoc = findBestMatchingLocation(q, locations);
  if (matchingLoc) {
    return {
      text: `Found **${matchingLoc.name}** located in **${matchingLoc.building}** (${matchingLoc.floor || 'Ground Floor'}). ${matchingLoc.description || ''}`,
      action: {
        type: 'NAVIGATE',
        destinationId: matchingLoc.id,
        originId: 'USER_CURRENT_GPS',
        destinationName: matchingLoc.name
      },
      locations: [matchingLoc],
      tips: matchingLoc.rooms ? `Rooms/Sections: ${matchingLoc.rooms}` : null
    };
  }

  // 4. General fallback response
  return {
    text: `I'm your **BIT Sathy Campus AI Guide**! You can ask me about classrooms, departments (CSE, IT, Mech, ECE), canteens, hostels, ATMs, sports grounds, or ask me for directions (e.g., *"How do I reach the library?"*).`,
    action: null,
    locations: [
      locations.find(l => l.id === 'loc-09'), // Library
      locations.find(l => l.id === 'loc-14'), // Cafeteria
      locations.find(l => l.id === 'loc-23')  // Medical
    ].filter(Boolean),
    tips: "Try clicking one of the suggested quick prompts below!"
  };
}
