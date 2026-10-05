// Campus Data for Campus Navigation - Bannari Amman Institute of Technology (BIT Sathy)
// Calibrated for Campus Map: Width 3392, Height 3913

export const MAP_DIMENSIONS = {
  width: 3392,
  height: 3913
};

export const CATEGORIES = [
  { id: 'cat-academic', slug: 'academic', name: 'Academic & Departments', icon: 'GraduationCap', color: '#3B82F6', badge: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  { id: 'cat-admin', slug: 'admin', name: 'Administration & Offices', icon: 'Building2', color: '#6366F1', badge: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' },
  { id: 'cat-hostels', slug: 'hostels', name: 'Hostels & Residential', icon: 'Home', color: '#EC4899', badge: 'bg-pink-500/20 text-pink-400 border-pink-500/30' },
  { id: 'cat-dining', slug: 'dining', name: 'Canteens & Dining', icon: 'Utensils', color: '#F97316', badge: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
  { id: 'cat-sports', slug: 'sports', name: 'Sports & Fitness', icon: 'Trophy', color: '#10B981', badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
  { id: 'cat-amenities', slug: 'amenities', name: 'Amenities & Utilities', icon: 'Sparkles', color: '#8B5CF6', badge: 'bg-purple-500/20 text-purple-400 border-purple-500/30' }
];

export const INITIAL_NODES = [
  { id: 'N01_MAIN_GATE', name: 'Main Gate', type: 'gate', x: 1805, y: 299, is_wheelchair_accessible: true, description: 'Campus main vehicle and pedestrian entrance from north highway.' },
  { id: 'N02_PARKING_ATM_JCT', name: 'Main Parking & ATM Junction', type: 'intersection', x: 1863, y: 882, is_wheelchair_accessible: true, description: 'Junction leading east to Lake and Main Parking lot, and ATM.' },
  { id: 'N03_GUEST_HOUSE', name: 'BIT Guest House Porch', type: 'door', x: 2171, y: 555, is_wheelchair_accessible: true, description: 'Drop-off loop in front of the executive guest house.' },
  { id: 'N04_ADMIN_JCT', name: 'Research Park & Admin Junction', type: 'intersection', x: 1878, y: 1394, is_wheelchair_accessible: true, description: 'Major four-way junction between Admin blocks, Bus Bay, and AS Block.' },
  { id: 'N05_BUS_BAY_JCT', name: 'Day Scholar Bus Bay Junction', type: 'intersection', x: 1262, y: 1394, is_wheelchair_accessible: true, description: 'Junction between Bus Bay, Staff Quarters road, and IB academic spine.' },
  { id: 'N06_SPORTS_WEST_JCT', name: 'Sports West Entrance', type: 'intersection', x: 807, y: 1394, is_wheelchair_accessible: true, description: 'Entrance avenue serving the football ground, track, and cricket field.' },
  { id: 'N07_IB_NORTH_PORCH', name: 'IB Block North Porch', type: 'door', x: 1174, y: 1892, is_wheelchair_accessible: true, description: 'Covered north entrance portico of the International Block.' },
  { id: 'N08_AS_NORTH_PORCH', name: 'AS Block North Porch', type: 'door', x: 1570, y: 1892, is_wheelchair_accessible: true, description: 'Covered north entrance portico of the AS Academic Block.' },
  { id: 'N09_SF_MECH_JCT', name: 'SF & Mech Block Junction', type: 'intersection', x: 1907, y: 1992, is_wheelchair_accessible: true, description: 'Access route serving SF Block Labs and Mechanical engineering workshops.' },
  { id: 'N10_CHILLER_XING', name: 'Academic Mid Walkway (Chiller Plant)', type: 'corridor', x: 1373, y: 2291, is_wheelchair_accessible: true, description: 'Cross-walk connecting IB Rib 5 and AS Rib 5 past the central Chiller Plant.' },
  { id: 'N11_AUDITORIUM_HUB', name: 'Main Auditorium Central Hub', type: 'door', x: 1373, y: 2689, is_wheelchair_accessible: true, description: 'Central hub connecting the academic spines with the main auditorium and placement cell.' },
  { id: 'N12_LIBRARY_NORTH', name: 'Central Library North Plaza', type: 'door', x: 1379, y: 2874, is_wheelchair_accessible: true, description: 'Paved plaza outside the entrance to the multi-floor Central Library.' },
  { id: 'N13_COMM_RADIO_JCT', name: 'Radio Station & West Parking Junction', type: 'intersection', x: 954, y: 2988, is_wheelchair_accessible: true, description: 'Avenue connecting West Parking, BIT Community Radio, and Library perimeter.' },
  { id: 'N14_CENTRAL_CROSS', name: 'Central Campus Crossroad', type: 'intersection', x: 1937, y: 2988, is_wheelchair_accessible: true, description: 'Key arterial intersection between academic zone, cafeteria, and hostels.' },
  { id: 'N15_GIRLS_ENTRY', name: 'Girls Campus Entrance Walkway', type: 'gate', x: 1408, y: 3130, is_wheelchair_accessible: true, description: 'Bridge/walkway into the Women\'s Hostel residential compound and Medical Centre.' },
  { id: 'N16_GIRLS_CENTRAL_HUB', name: 'Girls Mess & Courtyard Hub', type: 'intersection', x: 1174, y: 3500, is_wheelchair_accessible: true, description: 'Central courtyard connecting Narmadha, Ganga, Cauvery, Yamuna, Mess & Gym.' },
  { id: 'N17_BHAVANI_JCT', name: 'Bhavani Hostels Junction', type: 'intersection', x: 1540, y: 3586, is_wheelchair_accessible: true, description: 'Eastern pathway connecting North, Old, and South Bhavani hostels.' },
  { id: 'N18_CAFETERIA_PLAZA', name: 'Cafeteria & Dining Plaza', type: 'door', x: 1658, y: 3130, is_wheelchair_accessible: true, description: 'Central open-air plaza serving the Cafeteria, Day Scholar Mess, and Recreation Hall.' },
  { id: 'N19_SOUTH_COURTS', name: 'Outdoor Sports Courts', type: 'intersection', x: 1658, y: 3429, is_wheelchair_accessible: true, description: 'Walkway beside Tennis, Basketball, and Volleyball courts.' },
  { id: 'N20_BOYS_ROUNDABOUT', name: 'Boys Hostel Roundabout', type: 'intersection', x: 2391, y: 2960, is_wheelchair_accessible: true, description: 'Central traffic and pedestrian circle in the men\'s hostel zone.' },
  { id: 'N21_BOYS_MESS_PLAZA', name: 'Boys Mess Entrance Plaza', type: 'door', x: 2641, y: 2960, is_wheelchair_accessible: true, description: 'Wide paved promenade outside the main dining complex and Boys Gym.' },
  { id: 'N22_UTILITY_CANTEEN_JCT', name: 'Power House & Canteen Junction', type: 'intersection', x: 2245, y: 3130, is_wheelchair_accessible: true, description: 'Access route for Power House, Boys Laundry, and Canteen.' },
  { id: 'N23_SAPPHIRE_RUBY_JCT', name: 'Sapphire & Ruby Hostels Road', type: 'intersection', x: 2538, y: 3230, is_wheelchair_accessible: true, description: 'Connecting roadway between Sapphire and Ruby residential hostels.' },
  { id: 'N24_PEARL_AGRI_JCT', name: 'Pearl Hostel & Agri Ground Road', type: 'intersection', x: 2949, y: 3415, is_wheelchair_accessible: true, description: 'South-east ring road curve beside Pearl Hostel and Agri Playground.' },
  { id: 'N25_WEST_SPORTS_PATH', name: 'Cricket & Football Walkway', type: 'intersection', x: 807, y: 2476, is_wheelchair_accessible: true, description: 'Western pedestrian footpath skirting between Cricket ground and empty playgrounds.' }
];

export const INITIAL_EDGES = [
  { id: 'E01', from: 'N01_MAIN_GATE', to: 'N02_PARKING_ATM_JCT', distance: 140, path_type: 'road', is_wheelchair_accessible: true, turn_instruction: 'Head straight south down the Main Entrance Avenue.' },
  { id: 'E02', from: 'N02_PARKING_ATM_JCT', to: 'N03_GUEST_HOUSE', distance: 90, path_type: 'road', is_wheelchair_accessible: true, turn_instruction: 'Turn east along the driveway towards BIT Guest House.' },
  { id: 'E03', from: 'N02_PARKING_ATM_JCT', to: 'N04_ADMIN_JCT', distance: 130, path_type: 'road', is_wheelchair_accessible: true, turn_instruction: 'Continue south along the main central avenue past the parking.' },
  { id: 'E04', from: 'N04_ADMIN_JCT', to: 'N05_BUS_BAY_JCT', distance: 150, path_type: 'road', is_wheelchair_accessible: true, turn_instruction: 'Head west along the wide connecting road past Day Scholar Buses.' },
  { id: 'E05', from: 'N05_BUS_BAY_JCT', to: 'N06_SPORTS_WEST_JCT', distance: 120, path_type: 'road', is_wheelchair_accessible: true, turn_instruction: 'Walk west towards the Football and Cricket sports complex.' },
  { id: 'E06', from: 'N06_SPORTS_WEST_JCT', to: 'N25_WEST_SPORTS_PATH', distance: 210, path_type: 'footpath', is_wheelchair_accessible: true, turn_instruction: 'Follow the western footpath south alongside the sports fields.' },
  { id: 'E07', from: 'N25_WEST_SPORTS_PATH', to: 'N13_COMM_RADIO_JCT', distance: 140, path_type: 'footpath', is_wheelchair_accessible: true, turn_instruction: 'Continue south-east towards the West Parking and Community Radio.' },
  { id: 'E08', from: 'N05_BUS_BAY_JCT', to: 'N07_IB_NORTH_PORCH', distance: 100, path_type: 'footpath', is_wheelchair_accessible: true, turn_instruction: 'Head south into the entrance of International Block (IB).' },
  { id: 'E09', from: 'N04_ADMIN_JCT', to: 'N08_AS_NORTH_PORCH', distance: 110, path_type: 'footpath', is_wheelchair_accessible: true, turn_instruction: 'Take the pathway south-west into AS Block North entrance.' },
  { id: 'E10', from: 'N04_ADMIN_JCT', to: 'N09_SF_MECH_JCT', distance: 120, path_type: 'footpath', is_wheelchair_accessible: true, turn_instruction: 'Follow the east avenue towards SF Block and Mechanical Block.' },
  { id: 'E11', from: 'N07_IB_NORTH_PORCH', to: 'N08_AS_NORTH_PORCH', distance: 95, path_type: 'corridor', is_wheelchair_accessible: true, turn_instruction: 'Cross the covered portico walkway between IB Block and AS Block.' },
  { id: 'E12', from: 'N07_IB_NORTH_PORCH', to: 'N10_CHILLER_XING', distance: 85, path_type: 'corridor', is_wheelchair_accessible: true, turn_instruction: 'Walk south along the main central spine of IB Block past Ribs 1 to 4.' },
  { id: 'E13', from: 'N08_AS_NORTH_PORCH', to: 'N10_CHILLER_XING', distance: 85, path_type: 'corridor', is_wheelchair_accessible: true, turn_instruction: 'Walk south along the central corridor of AS Block past Ribs 1 to 4.' },
  { id: 'E14', from: 'N10_CHILLER_XING', to: 'N11_AUDITORIUM_HUB', distance: 85, path_type: 'corridor', is_wheelchair_accessible: true, turn_instruction: 'Continue south down the academic corridor past the Chiller Plant to the Auditorium.' },
  { id: 'E15', from: 'N11_AUDITORIUM_HUB', to: 'N12_LIBRARY_NORTH', distance: 45, path_type: 'corridor', is_wheelchair_accessible: true, turn_instruction: 'Proceed straight south out the auditorium lobby to the Central Library plaza.' },
  { id: 'E16', from: 'N13_COMM_RADIO_JCT', to: 'N14_CENTRAL_CROSS', distance: 240, path_type: 'road', is_wheelchair_accessible: true, turn_instruction: 'Follow the perimeter ring road east past the Central Library.' },
  { id: 'E17', from: 'N12_LIBRARY_NORTH', to: 'N14_CENTRAL_CROSS', distance: 140, path_type: 'footpath', is_wheelchair_accessible: true, turn_instruction: 'Walk east along the paved pedestrian path to the Central Crossroad.' },
  { id: 'E18', from: 'N14_CENTRAL_CROSS', to: 'N18_CAFETERIA_PLAZA', distance: 70, path_type: 'footpath', is_wheelchair_accessible: true, turn_instruction: 'Turn south-west onto the wide plaza leading to the Central Cafeteria.' },
  { id: 'E19', from: 'N18_CAFETERIA_PLAZA', to: 'N19_SOUTH_COURTS', distance: 60, path_type: 'footpath', is_wheelchair_accessible: true, turn_instruction: 'Walk south past the dining halls to the outdoor tennis and basketball courts.' },
  { id: 'E20', from: 'N14_CENTRAL_CROSS', to: 'N15_GIRLS_ENTRY', distance: 130, path_type: 'road', is_wheelchair_accessible: true, turn_instruction: 'Head west along the main road and turn into the Women\'s Hostel gate.' },
  { id: 'E21', from: 'N15_GIRLS_ENTRY', to: 'N16_GIRLS_CENTRAL_HUB', distance: 90, path_type: 'footpath', is_wheelchair_accessible: true, turn_instruction: 'Walk south across the pedestrian bridge past the Medical Centre into the central courtyard.' },
  { id: 'E22', from: 'N16_GIRLS_CENTRAL_HUB', to: 'N17_BHAVANI_JCT', distance: 90, path_type: 'footpath', is_wheelchair_accessible: true, turn_instruction: 'Take the eastern courtyard walkway towards the Bhavani hostels.' },
  { id: 'E23', from: 'N14_CENTRAL_CROSS', to: 'N20_BOYS_ROUNDABOUT', distance: 120, path_type: 'road', is_wheelchair_accessible: true, turn_instruction: 'Head east along the main campus road towards the Men\'s Hostel Roundabout.' },
  { id: 'E24', from: 'N20_BOYS_ROUNDABOUT', to: 'N21_BOYS_MESS_PLAZA', distance: 60, path_type: 'road', is_wheelchair_accessible: true, turn_instruction: 'Take the east exit of the roundabout directly into the Boys Mess plaza.' },
  { id: 'E25', from: 'N20_BOYS_ROUNDABOUT', to: 'N22_UTILITY_CANTEEN_JCT', distance: 55, path_type: 'road', is_wheelchair_accessible: true, turn_instruction: 'Take the southern branch towards the Power House and hostel canteen.' },
  { id: 'E26', from: 'N22_UTILITY_CANTEEN_JCT', to: 'N23_SAPPHIRE_RUBY_JCT', distance: 75, path_type: 'road', is_wheelchair_accessible: true, turn_instruction: 'Follow the road curve towards Sapphire and Ruby Hostels.' },
  { id: 'E27', from: 'N23_SAPPHIRE_RUBY_JCT', to: 'N24_PEARL_AGRI_JCT', distance: 100, path_type: 'road', is_wheelchair_accessible: true, turn_instruction: 'Follow the outer campus road curving past Pearl Hostel and Agri grounds.' },
  { id: 'E28', from: 'N09_SF_MECH_JCT', to: 'N20_BOYS_ROUNDABOUT', distance: 190, path_type: 'road', is_wheelchair_accessible: true, turn_instruction: 'Walk south-east down the avenue connecting Mechanical block to the Boys Roundabout.' }
];

export const INITIAL_LOCATIONS = [
  // Academic & Departments
  { id: 'loc-01', name: 'IB Block - Computer Science (CSE)', category_id: 'cat-academic', nearest_node_id: 'N07_IB_NORTH_PORCH', floor: '1st Floor', building: 'IB Block', rooms: 'CSE-101 to 110, AI Workstations', description: 'Department of CSE, Advanced Software Labs, and HOD Office.', aliases: ['cse', 'computer science', 'cse dept', 'software lab', 'ib block'] },
  { id: 'loc-02', name: 'Information Technology (IT) Dept', category_id: 'cat-academic', nearest_node_id: 'N10_CHILLER_XING', floor: '1st Floor', building: 'IB Block', rooms: 'IT-201 to 208, Cloud Computing Lab', description: 'Department of IT, Cloud Computing & Web Technology Labs.', aliases: ['it', 'it dept', 'information technology', 'cloud lab'] },
  { id: 'loc-03', name: 'Artificial Intelligence & Data Science (AI & DS)', category_id: 'cat-academic', nearest_node_id: 'N10_CHILLER_XING', floor: '2nd Floor', building: 'IB Block', rooms: 'AI-301 to 308, Deep Learning Lab', description: 'AI & Data Science Labs, Machine Learning Workstations, and smart classrooms.', aliases: ['ai', 'aids', 'ai ds', 'data science', 'machine learning'] },
  { id: 'loc-04', name: 'Placement & Career Guidance Cell', category_id: 'cat-academic', nearest_node_id: 'N11_AUDITORIUM_HUB', floor: 'Ground Floor', building: 'IB Block', rooms: 'Interview Chambers 1-8, Group Discussion Hall', description: 'Career Guidance Bureau, Corporate Interview Chambers, and Placement Office.', aliases: ['placement', 'training', 'campus placement', 'jobs'] },
  { id: 'loc-05', name: 'AS Block - Electronics & Comm (ECE)', category_id: 'cat-academic', nearest_node_id: 'N08_AS_NORTH_PORCH', floor: '1st Floor', building: 'AS Block', rooms: 'ECE-101 to 112, VLSI Design Lab', description: 'Department of ECE, VLSI Design Lab, and Embedded Systems Lab.', aliases: ['ece', 'electronics', 'vlsi lab', 'communication engg'] },
  { id: 'loc-06', name: 'Electrical & Electronics Engg (EEE)', category_id: 'cat-academic', nearest_node_id: 'N08_AS_NORTH_PORCH', floor: '1st Floor', building: 'AS Block', rooms: 'EEE-201 to 208, Power Machines Lab', description: 'Department of EEE, Power Electronics Lab, and Electrical Machines Lab.', aliases: ['eee', 'electrical', 'power electronics'] },
  { id: 'loc-07', name: 'SF Block & Biotechnology Labs', category_id: 'cat-academic', nearest_node_id: 'N09_SF_MECH_JCT', floor: 'Ground & 1st Floor', building: 'SF Block', rooms: 'Bio Lab 1-4, Genetic Engg Center', description: 'Biotechnology, Food Technology, and Biomedical Engineering departments.', aliases: ['biotech', 'biotechnology', 'sf block', 'food tech'] },
  { id: 'loc-08', name: 'Mechanical Engineering Workshops', category_id: 'cat-academic', nearest_node_id: 'N09_SF_MECH_JCT', floor: 'Ground Floor', building: 'Mech Block', rooms: 'CNC Lab, Foundry, Welding & Fitting Lab', description: 'Department of Mechanical Engineering, CAD/CAM studios, and Heavy Machinery workshop.', aliases: ['mech', 'mechanical', 'workshop', 'cad cam'] },
  { id: 'loc-09', name: 'Central Library', category_id: 'cat-academic', nearest_node_id: 'N12_LIBRARY_NORTH', floor: 'Ground, 1st & 2nd Floor', building: 'Library', rooms: 'Digital Section, Silent Reading Zone, Book Stacks', description: '3-floor central library with over 100,000 volumes, e-journals, and silent study zones.', aliases: ['library', 'books', 'digital library', 'reading room', 'study'] },
  { id: 'loc-10', name: 'Main Auditorium', category_id: 'cat-academic', nearest_node_id: 'N11_AUDITORIUM_HUB', floor: 'Ground Floor', building: 'Main Auditorium', rooms: 'Main Hall, VIP Green Rooms', description: 'Air-conditioned main auditorium with 1,500 seating capacity for symposiums and events.', aliases: ['audi', 'auditorium', 'main audi', 'seminar hall'] },

  // Administration
  { id: 'loc-11', name: 'Principal Office & Administration', category_id: 'cat-admin', nearest_node_id: 'N04_ADMIN_JCT', floor: 'Ground Floor', building: 'Admin Block', rooms: 'Admin Room 101, Secretarial Section', description: 'Administrative headquarters of the institution.', aliases: ['principal office', 'administration', 'admin office'] },
  { id: 'loc-12', name: 'Controller of Examinations (COE) & Accounts', category_id: 'cat-admin', nearest_node_id: 'N04_ADMIN_JCT', floor: 'Ground Floor', building: 'Admin Block', rooms: 'Counter 1-4, COE Secure Record Room', description: 'Fee payment counters, exam cell, and hall ticket validation.', aliases: ['coe', 'exam cell', 'accounts', 'fee counter'] },
  { id: 'loc-13', name: 'BIT Executive Guest House', category_id: 'cat-admin', nearest_node_id: 'N03_GUEST_HOUSE', floor: 'Ground & 1st Floor', building: 'Guest House', rooms: 'Suites 1-12, Dining Hall', description: 'Executive accommodation for university guests and visiting recruiters.', aliases: ['guest house', 'executive suites'] },

  // Canteens & Dining
  { id: 'loc-14', name: 'Central Cafeteria & Food Court', category_id: 'cat-dining', nearest_node_id: 'N18_CAFETERIA_PLAZA', floor: 'Ground Floor', building: 'Cafeteria', rooms: 'Juice Corner, Hot Meals Counter, Bakery', description: 'Multi-cuisine food court serving breakfast, meals, snacks, juices, and hot beverages.', aliases: ['canteen', 'cafeteria', 'food court', 'coffee', 'snacks', 'lunch'] },
  { id: 'loc-15', name: 'Day Scholar Dining Mess', category_id: 'cat-dining', nearest_node_id: 'N18_CAFETERIA_PLAZA', floor: 'Ground Floor', building: 'Cafeteria', rooms: 'East & West Dining Halls', description: 'Subsidized meal service wings for day scholar students and faculty.', aliases: ['day scholar mess', 'mess', 'lunch mess'] },
  { id: 'loc-16', name: 'Boys Central Mess & Dining Complex', category_id: 'cat-dining', nearest_node_id: 'N21_BOYS_MESS_PLAZA', floor: 'Ground Floor', building: 'Boys Mess', rooms: 'Dining Halls A, B, C', description: 'Full-service residential dining hall for all men\'s hostels.', aliases: ['boys mess', 'hostel mess', 'boys dining'] },
  { id: 'loc-17', name: 'Night Canteen & Bakery', category_id: 'cat-dining', nearest_node_id: 'N22_UTILITY_CANTEEN_JCT', floor: 'Ground Floor', building: 'Hostel Commercial Complex', rooms: 'Night Counter, Beverage Stall', description: 'Late-night snacks, fresh juices, and stationery shop.', aliases: ['night canteen', 'bakery', 'late night snacks'] },

  // Hostels & Residential
  { id: 'loc-18', name: 'Women\'s Residential Complex (Ganga & Cauvery)', category_id: 'cat-hostels', nearest_node_id: 'N16_GIRLS_CENTRAL_HUB', floor: 'All Floors', building: 'Girls Hostels', rooms: 'Warden Office, Rooms 101-450', description: 'Secure gated residential hostel complex for female undergraduate students.', aliases: ['girls hostel', 'ganga', 'cauvery', 'narmadha', 'yamuna'] },
  { id: 'loc-19', name: 'Bhavani Men\'s Hostels (North & South)', category_id: 'cat-hostels', nearest_node_id: 'N17_BHAVANI_JCT', floor: 'All Floors', building: 'Bhavani Block', rooms: 'Blocks A-D, Rooms 101-380', description: 'Undergraduate men\'s hostel wings.', aliases: ['bhavani', 'bhavani hostel', 'south bhavani', 'north bhavani'] },
  { id: 'loc-20', name: 'Sapphire & Ruby Hostels', category_id: 'cat-hostels', nearest_node_id: 'N23_SAPPHIRE_RUBY_JCT', floor: 'All Floors', building: 'Sapphire Block', rooms: 'Rooms 101-300', description: 'Air-conditioned and deluxe hostel blocks for senior students.', aliases: ['sapphire', 'ruby', 'deluxe hostel'] },

  // Sports & Fitness
  { id: 'loc-21', name: 'Main Sports Complex (Football & Track)', category_id: 'cat-sports', nearest_node_id: 'N06_SPORTS_WEST_JCT', floor: 'Ground Level', building: 'Sports Pavilion', rooms: '400m Athletic Track, Football Ground', description: 'Standard 400m synthetic athletic track, football ground, and cricket pavilion.', aliases: ['sports', 'ground', 'football', 'cricket', 'track'] },
  { id: 'loc-22', name: 'Outdoor Basketball & Tennis Courts', category_id: 'cat-sports', nearest_node_id: 'N19_SOUTH_COURTS', floor: 'Ground Level', building: 'Sports Complex', rooms: 'Floodlit Tennis Courts 1-2, Basketball Courts 1-2', description: 'Floodlit hard courts for competitive basketball, volleyball, and tennis matches.', aliases: ['tennis', 'basketball', 'volleyball', 'courts'] },

  // Amenities & Utilities
  { id: 'loc-23', name: 'Campus Medical Centre & Pharmacy', category_id: 'cat-amenities', nearest_node_id: 'N15_GIRLS_ENTRY', floor: 'Ground Floor', building: 'Health Centre', rooms: 'OPD, Pharmacy, Emergency Ward', description: '24/7 emergency medical clinic with resident doctor, nursing staff, and ambulance.', aliases: ['hospital', 'clinic', 'medical', 'doctor', 'health centre', 'emergency'] },
  { id: 'loc-24', name: 'Bank of Baroda & 24/7 ATM', category_id: 'cat-amenities', nearest_node_id: 'N02_PARKING_ATM_JCT', floor: 'Ground Floor', building: 'Commercial Block', rooms: 'ATM Counter 1 & 2', description: 'On-campus bank branch and ATM kiosk.', aliases: ['atm', 'bank', 'cash', 'money', 'bob'] },
  { id: 'loc-25', name: 'Day Scholar Bus Terminal (50+ Buses)', category_id: 'cat-amenities', nearest_node_id: 'N05_BUS_BAY_JCT', floor: 'Ground Level', building: 'Transport Bay', rooms: 'Bays 1 to 50', description: 'Central staging terminal for college fleet buses connecting Erode, Tirupur, Coimbatore, and Salem.', aliases: ['bus', 'bus bay', 'bus terminal', 'transport', 'college bus'] }
];

export const INITIAL_FRIENDS = [
  {
    id: 'f-1',
    name: 'Arun Kumar',
    roll: '7376221CS101',
    email: 'arunkumar.cs22@bitsathy.ac.in',
    avatar: 'AK',
    avatarBg: 'bg-indigo-600',
    online: true,
    lastSeen: 'Active now',
    locationName: 'Central Library - 2nd Floor',
    coords: { x: 1379, y: 2874 },
    nearestNodeId: 'N12_LIBRARY_NORTH'
  },
  {
    id: 'f-2',
    name: 'Priya Sharma',
    roll: '7376221EC145',
    email: 'priya.ec22@bitsathy.ac.in',
    avatar: 'PS',
    avatarBg: 'bg-emerald-600',
    online: true,
    lastSeen: 'Active now',
    locationName: 'Central Cafeteria (Snack Area)',
    coords: { x: 1658, y: 3130 },
    nearestNodeId: 'N18_CAFETERIA_PLAZA'
  },
  {
    id: 'f-3',
    name: 'Sanjay Ram',
    roll: '7376221IT189',
    email: 'sanjay.it22@bitsathy.ac.in',
    avatar: 'SR',
    avatarBg: 'bg-amber-600',
    online: true,
    lastSeen: '5m ago',
    locationName: 'IB Block - Cloud Computing Lab',
    coords: { x: 1174, y: 1892 },
    nearestNodeId: 'N07_IB_NORTH_PORCH'
  },
  {
    id: 'f-4',
    name: 'Divya M',
    roll: '7376221AI112',
    email: 'divya.ai22@bitsathy.ac.in',
    avatar: 'DM',
    avatarBg: 'bg-pink-600',
    online: false,
    lastSeen: '35m ago',
    locationName: 'Women\'s Residential Complex',
    coords: { x: 1174, y: 3500 },
    nearestNodeId: 'N16_GIRLS_CENTRAL_HUB'
  },
  {
    id: 'f-5',
    name: 'Karthik V',
    roll: '7376221ME133',
    email: 'karthik.me22@bitsathy.ac.in',
    avatar: 'KV',
    avatarBg: 'bg-sky-600',
    online: true,
    lastSeen: 'Active now',
    locationName: 'Main Sports Complex (Cricket Nets)',
    coords: { x: 807, y: 2476 },
    nearestNodeId: 'N25_WEST_SPORTS_PATH'
  }
];

export const INITIAL_REQUESTS = [
  {
    id: 'req-1',
    name: 'Rithanya S',
    email: 'rithanya.cs23@bitsathy.ac.in',
    dept: 'Computer Science (2nd Year)',
    avatar: 'RS',
    avatarBg: 'bg-purple-600',
    time: '2 hours ago'
  },
  {
    id: 'req-2',
    name: 'Harish Babu',
    email: 'harish.ec22@bitsathy.ac.in',
    dept: 'Electronics & Comm (3rd Year)',
    avatar: 'HB',
    avatarBg: 'bg-blue-600',
    time: 'Yesterday'
  }
];

export const INITIAL_EVENTS = [
  {
    id: 'ev-1',
    title: 'Autonomous Systems & AI Hackathon',
    date: '2026-10-10',
    time: '09:00 AM - 05:00 PM',
    type: 'Academic Event',
    category: 'academic',
    location: 'IB Block AI & DS Labs',
    nearestNodeId: 'N10_CHILLER_XING',
    description: '36-hour internal hackathon on robotics, embedded vision, and LLM edge inference.',
    badge: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
  },
  {
    id: 'ev-2',
    title: 'End Semester Practical Examinations',
    date: '2026-10-15',
    time: '09:30 AM - 12:30 PM',
    type: 'Exam',
    category: 'exam',
    location: 'SF Block & IB Block Special Labs',
    nearestNodeId: 'N09_SF_MECH_JCT',
    description: 'Laboratory assessment for 2nd and 3rd year engineering disciplines.',
    badge: 'bg-rose-500/20 text-rose-400 border-rose-500/30'
  },
  {
    id: 'ev-3',
    title: 'Inter-College Sports Gala (Athletics)',
    date: '2026-10-20',
    time: '03:00 PM - 07:00 PM',
    type: 'Sports Meet',
    category: 'sports',
    location: 'Main Sports Complex (Synthetic Track)',
    nearestNodeId: 'N06_SPORTS_WEST_JCT',
    description: 'Annual track & field events and 4x100m relay finals.',
    badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
  },
  {
    id: 'ev-4',
    title: 'National Cultural Fest & Rock Night',
    date: '2026-10-25',
    time: '06:00 PM - 10:00 PM',
    type: 'Campus Event',
    category: 'cultural',
    location: 'Main Auditorium & Open Air Theatre',
    nearestNodeId: 'N11_AUDITORIUM_HUB',
    description: 'Pro-night performances, battle of bands, and choreography showcase.',
    badge: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
  },
  {
    id: 'ev-5',
    title: 'Deepavali Festival Holiday',
    date: '2026-10-31',
    time: 'All Day',
    type: 'Holiday',
    category: 'holiday',
    location: 'Campus-wide',
    nearestNodeId: 'N01_MAIN_GATE',
    description: 'College and administrative offices closed. Residential mess timings apply.',
    badge: 'bg-amber-500/20 text-amber-400 border-amber-500/30'
  }
];

export const INITIAL_ANNOUNCEMENTS = [
  {
    id: 'ann-1',
    title: 'Campus Navigation Live Tracking Active',
    content: 'Students can now share live campus location with registered @bitsathy.ac.in classmates in real-time.',
    date: 'Today, 10:15 AM',
    pinned: true
  },
  {
    id: 'ann-2',
    title: 'Walkway Improvement Near Central Library',
    content: 'Pedestrian pathway repaving work is in progress between Library North Plaza and Central Crossroad.',
    date: 'Yesterday, 04:30 PM',
    pinned: false
  }
];
