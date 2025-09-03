import { Activity } from '../types/activity';

export const MOCK_ACTIVITIES: Activity[] = [
  {
    id: '1',
    title: 'Interactive Team Building Challenge',
    description: 'Engage your team in a series of collaborative challenges designed to strengthen communication, trust, and problem-solving skills. Our professional facilitators guide teams through activities that break down silos and build stronger working relationships.',
    shortDescription: 'Collaborative challenges to strengthen team bonds and communication',
    category: 'Team Building',
    duration: '3 hours',
    groupSize: '8-20 people',
    price: 75,
    rating: 4.8,
    reviewCount: 127,
    imageUrl: 'https://images.unsplash.com/photo-1663246544984-2730f63628b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwYnVpbGRpbmclMjBhY3Rpdml0aWVzfGVufDF8fHx8MTc1NjkwMDMxN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    location: 'Downtown Conference Center',
    city: 'San Francisco',
    state: 'CA',
    coordinates: { lat: 37.7749, lng: -122.4194 },
    highlights: [
      'Professional facilitation',
      'Customizable challenges',
      'Team assessment report',
      'Refreshments included'
    ],
    included: [
      'Professional facilitator',
      'All activity materials',
      'Team report and insights',
      'Light refreshments',
      'Digital photos'
    ],
    availableDates: ['2025-01-06', '2025-01-08', '2025-01-10', '2025-01-13', '2025-01-15'],
    availableTimes: ['9:00 AM', '1:00 PM', '3:00 PM']
  },
  {
    id: '2',
    title: 'Hands-On Cooking Class Experience',
    description: 'Unite your team through the joy of cooking! Learn to prepare a complete meal together under the guidance of a professional chef. Perfect for fostering collaboration while creating something delicious to share.',
    shortDescription: 'Cook together as a team with professional chef guidance',
    category: 'Cooking & Food',
    duration: '4 hours',
    groupSize: '6-16 people',
    price: 95,
    rating: 4.9,
    reviewCount: 203,
    imageUrl: 'https://images.unsplash.com/photo-1578366941741-9e517759c620?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29raW5nJTIwY2xhc3MlMjBncm91cHxlbnwxfHx8fDE3NTY5MDAzMTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    location: 'Culinary Arts Studio',
    city: 'New York',
    state: 'NY',
    coordinates: { lat: 40.7128, lng: -74.0060 },
    highlights: [
      'Professional chef instructor',
      'All ingredients provided',
      'Recipe cards to take home',
      'Full meal included'
    ],
    included: [
      'Professional chef instruction',
      'All ingredients and equipment',
      'Aprons and recipe cards',
      'Complete meal and beverages',
      'Group photo session'
    ],
    availableDates: ['2025-01-04', '2025-01-07', '2025-01-11', '2025-01-14', '2025-01-18'],
    availableTimes: ['10:00 AM', '2:00 PM', '6:00 PM']
  },
  {
    id: '3',
    title: 'Escape Room Challenge',
    description: 'Test your team\'s problem-solving abilities in an immersive escape room experience. Work together to solve puzzles, uncover clues, and escape before time runs out. Perfect for improving communication and logical thinking.',
    shortDescription: 'Solve puzzles and escape together as a team',
    category: 'Problem Solving',
    duration: '2 hours',
    groupSize: '4-12 people',
    price: 45,
    rating: 4.7,
    reviewCount: 89,
    imageUrl: 'https://images.unsplash.com/photo-1569002925653-ed18f55d7292?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc2NhcGUlMjByb29tJTIwdGVhbXxlbnwxfHx8fDE3NTY5MDAzMTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    location: 'Adventure Zone',
    city: 'Austin',
    state: 'TX',
    coordinates: { lat: 30.2672, lng: -97.7431 },
    highlights: [
      'Multiple themed rooms',
      'Professional game master',
      'Victory celebration',
      'Team photo opportunity'
    ],
    included: [
      'Private escape room session',
      'Professional game master',
      'Celebration drinks',
      'Team performance analysis',
      'Achievement certificates'
    ],
    availableDates: ['2025-01-03', '2025-01-05', '2025-01-08', '2025-01-12', '2025-01-15', '2025-01-19'],
    availableTimes: ['11:00 AM', '2:00 PM', '4:00 PM', '7:00 PM']
  },
  {
    id: '4',
    title: 'Outdoor Adventure Challenge',
    description: 'Take your team outside for an exciting day of outdoor challenges and activities. From trust falls to obstacle courses, this experience builds confidence and strengthens team bonds in a natural setting.',
    shortDescription: 'Outdoor challenges and activities in a natural setting',
    category: 'Adventure',
    duration: '5 hours',
    groupSize: '10-25 people',
    price: 85,
    rating: 4.8,
    reviewCount: 156,
    imageUrl: 'https://images.unsplash.com/photo-1742067131963-c466fc838f3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwYWR2ZW50dXJlJTIwZ3JvdXB8ZW58MXx8fHwxNzU2OTAwMzE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    location: 'Adventure Park',
    city: 'Denver',
    state: 'CO',
    coordinates: { lat: 39.7392, lng: -104.9903 },
    highlights: [
      'Various outdoor challenges',
      'Safety equipment provided',
      'Lunch included',
      'Weather backup plan'
    ],
    included: [
      'Professional outdoor guides',
      'All safety equipment',
      'Lunch and refreshments',
      'Activity instruction and support',
      'Group achievement ceremony'
    ],
    availableDates: ['2025-01-04', '2025-01-11', '2025-01-18', '2025-01-25'],
    availableTimes: ['9:00 AM', '1:00 PM']
  },
  {
    id: '5',
    title: 'Creative Art Workshop',
    description: 'Unleash your team\'s creativity in this collaborative art workshop. No experience necessary! Work together on a large group piece or individual projects while learning new artistic techniques and expressing yourselves.',
    shortDescription: 'Collaborative art creation with professional artist guidance',
    category: 'Creative Workshop',
    duration: '3.5 hours',
    groupSize: '5-15 people',
    price: 65,
    rating: 4.6,
    reviewCount: 94,
    imageUrl: 'https://images.unsplash.com/photo-1632718028184-30ec03135771?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjB3b3Jrc2hvcCUyMGNyZWF0aXZlfGVufDF8fHx8MTc1NjgzNzQzOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    location: 'Creative Arts Center',
    city: 'Seattle',
    state: 'WA',
    coordinates: { lat: 47.6062, lng: -122.3321 },
    highlights: [
      'No experience needed',
      'All materials provided',
      'Take your artwork home',
      'Professional artist guidance'
    ],
    included: [
      'Professional artist instructor',
      'All art supplies and materials',
      'Individual and group projects',
      'Light refreshments',
      'Artwork packaging for transport'
    ],
    availableDates: ['2025-01-05', '2025-01-09', '2025-01-12', '2025-01-16', '2025-01-19'],
    availableTimes: ['10:00 AM', '2:00 PM', '5:00 PM']
  },
  {
    id: '6',
    title: 'Wine Tasting & Team Building',
    description: 'Combine sophistication with team bonding in this guided wine tasting experience. Learn about wine varieties, tasting techniques, and enjoy curated pairings while engaging in conversation and connection.',
    shortDescription: 'Guided wine tasting with team bonding activities',
    category: 'Team Building',
    duration: '2.5 hours',
    groupSize: '8-20 people',
    price: 80,
    rating: 4.9,
    reviewCount: 178,
    imageUrl: 'https://images.unsplash.com/photo-1676476623306-566a9b7afc44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5lJTIwdGFzdGluZyUyMGdyb3VwfGVufDF8fHx8MTc1NjgwNTg5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    location: 'Wine Bar & Lounge',
    city: 'San Francisco',
    state: 'CA',
    coordinates: { lat: 37.7849, lng: -122.4094 },
    highlights: [
      'Premium wine selection',
      'Expert sommelier guide',
      'Gourmet appetizers',
      'Elegant atmosphere'
    ],
    included: [
      'Professional sommelier',
      '5 wine tastings per person',
      'Gourmet appetizer pairings',
      'Tasting notes and education',
      'Group conversation activities'
    ],
    availableDates: ['2025-01-03', '2025-01-06', '2025-01-10', '2025-01-13', '2025-01-17', '2025-01-20'],
    availableTimes: ['5:00 PM', '7:00 PM']
  },
  {
    id: '7',
    title: 'Virtual Reality Team Experience',
    description: 'Step into the future with this cutting-edge VR team building experience. Navigate virtual worlds together, solve puzzles in immersive environments, and work as a team in ways you never thought possible.',
    shortDescription: 'Immersive VR challenges that push the boundaries of teamwork',
    category: 'Problem Solving',
    duration: '2.5 hours',
    groupSize: '4-16 people',
    price: 95,
    rating: 4.7,
    reviewCount: 112,
    imageUrl: 'https://images.unsplash.com/photo-1692607434694-eabce19d35fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXJ0dWFsJTIwcmVhbGl0eSUyMHRlYW18ZW58MXx8fHwxNzU2OTAwMzE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    location: 'VR Experience Center',
    city: 'Los Angeles',
    state: 'CA',
    coordinates: { lat: 34.0522, lng: -118.2437 },
    highlights: [
      'Latest VR technology',
      'Team-based challenges',
      'Multi-player experiences',
      'Expert VR guides'
    ],
    included: [
      'VR headsets and equipment',
      'Professional VR guide',
      'Multiple experience options',
      'Team debrief session',
      'Refreshments'
    ],
    availableDates: ['2025-01-04', '2025-01-07', '2025-01-09', '2025-01-14', '2025-01-16', '2025-01-21'],
    availableTimes: ['11:00 AM', '2:00 PM', '5:00 PM']
  },
  {
    id: '8',
    title: 'Urban Scavenger Hunt',
    description: 'Explore the city like never before in this high-energy scavenger hunt that combines teamwork, problem-solving, and local discovery. Race against other teams while learning interesting facts about your city.',
    shortDescription: 'City exploration with competitive team challenges',
    category: 'Adventure',
    duration: '3 hours',
    groupSize: '6-24 people',
    price: 55,
    rating: 4.5,
    reviewCount: 203,
    imageUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMHNjYXZlbmdlciUyMGh1bnR8ZW58MXx8fHwxNzU2OTAwMzE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    location: 'Downtown Starting Point',
    city: 'Chicago',
    state: 'IL',
    coordinates: { lat: 41.8781, lng: -87.6298 },
    highlights: [
      'City exploration',
      'Mobile app guided',
      'Photo challenges',
      'Local insights'
    ],
    included: [
      'Mobile app access',
      'Professional game host',
      'Route planning',
      'Victory celebration',
      'Team photos'
    ],
    availableDates: ['2025-01-05', '2025-01-08', '2025-01-11', '2025-01-15', '2025-01-18', '2025-01-22'],
    availableTimes: ['10:00 AM', '1:00 PM', '3:00 PM']
  },
  {
    id: '9',
    title: 'Pottery Team Building Workshop',
    description: 'Get your hands dirty in this relaxing yet engaging pottery workshop. Create individual pieces while working together on a collaborative project that represents your team\'s unity and creativity.',
    shortDescription: 'Hands-on pottery creation with collaborative team elements',
    category: 'Creative Workshop',
    duration: '4 hours',
    groupSize: '6-14 people',
    price: 85,
    rating: 4.8,
    reviewCount: 76,
    imageUrl: 'https://images.unsplash.com/photo-1578501373631-bbba7e2e8e32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3R0ZXJ5JTIwd29ya3Nob3AlMjB0ZWFtfGVufDF8fHx8MTc1NjkwMDMxOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    location: 'Artisan Pottery Studio',
    city: 'Portland',
    state: 'OR',
    coordinates: { lat: 45.5152, lng: -122.6784 },
    highlights: [
      'Professional pottery instruction',
      'Individual and team projects',
      'Take home your creations',
      'Zen-like team bonding'
    ],
    included: [
      'Professional pottery instructor',
      'All clay and tools',
      'Firing and glazing service',
      'Light refreshments',
      'Pottery to take home'
    ],
    availableDates: ['2025-01-06', '2025-01-09', '2025-01-13', '2025-01-16', '2025-01-20'],
    availableTimes: ['9:00 AM', '1:00 PM']
  },
  {
    id: '10',
    title: 'Food Truck Challenge',
    description: 'Compete in teams to create and operate your own mini food truck experience! Plan menus, cook dishes, and serve customers in this fast-paced culinary team building adventure.',
    shortDescription: 'Competitive cooking challenge with food truck simulation',
    category: 'Cooking & Food',
    duration: '5 hours',
    groupSize: '8-20 people',
    price: 120,
    rating: 4.9,
    reviewCount: 89,
    imageUrl: 'https://images.unsplash.com/photo-1571115089332-7d5c6eda6b50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwdHJ1Y2slMjBjaGFsbGVuZ2V8ZW58MXx8fHwxNzU2OTAwMzE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    location: 'Culinary Competition Kitchen',
    city: 'Miami',
    state: 'FL',
    coordinates: { lat: 25.7617, lng: -80.1918 },
    highlights: [
      'Professional chef judges',
      'Real food truck simulation',
      'Team competition format',
      'Full meal service'
    ],
    included: [
      'Professional chef instruction',
      'All ingredients and equipment',
      'Food truck setup simulation',
      'Full lunch service',
      'Winner prizes'
    ],
    availableDates: ['2025-01-04', '2025-01-11', '2025-01-18', '2025-01-25'],
    availableTimes: ['10:00 AM', '2:00 PM']
  },
  {
    id: '11',
    title: 'Mindfulness & Team Wellness Retreat',
    description: 'Reduce stress and strengthen team bonds through guided meditation, yoga, and wellness activities. This peaceful experience promotes mental health and team harmony in a serene environment.',
    shortDescription: 'Wellness-focused team building with meditation and mindfulness',
    category: 'Wellness',
    duration: '4 hours',
    groupSize: '6-18 people',
    price: 75,
    rating: 4.6,
    reviewCount: 124,
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwd2VsbG5lc3MlMjByZXRyZWF0fGVufDF8fHx8MTc1NjkwMDMxOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    location: 'Wellness Retreat Center',
    city: 'Asheville',
    state: 'NC',
    coordinates: { lat: 35.5951, lng: -82.5515 },
    highlights: [
      'Certified wellness instructors',
      'Stress reduction techniques',
      'Team bonding exercises',
      'Peaceful natural setting'
    ],
    included: [
      'Certified wellness guide',
      'Yoga mats and props',
      'Healthy refreshments',
      'Meditation materials',
      'Wellness resource packet'
    ],
    availableDates: ['2025-01-05', '2025-01-07', '2025-01-12', '2025-01-14', '2025-01-19', '2025-01-21'],
    availableTimes: ['9:00 AM', '11:00 AM', '4:00 PM']
  },
  {
    id: '12',
    title: 'High-Tech Laser Tag Tournament',
    description: 'Engage in strategic team warfare with state-of-the-art laser tag equipment. Multiple game modes and scenarios test communication, strategy, and teamwork in an adrenaline-pumping environment.',
    shortDescription: 'Strategic laser tag battles with advanced team dynamics',
    category: 'Team Building',
    duration: '3 hours',
    groupSize: '8-32 people',
    price: 65,
    rating: 4.7,
    reviewCount: 167,
    imageUrl: 'https://images.unsplash.com/photo-1566577134342-330c0c6f68b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXNlciUyMHRhZyUyMHRlYW18ZW58MXx8fHwxNzU2OTAwMzE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    location: 'Laser Combat Arena',
    city: 'Atlanta',
    state: 'GA',
    coordinates: { lat: 33.7490, lng: -84.3880 },
    highlights: [
      'Multi-level arena',
      'Team strategy sessions',
      'Multiple game modes',
      'Real-time scoring'
    ],
    included: [
      'Laser tag equipment',
      'Professional game master',
      'Multiple battle rounds',
      'Team strategy coaching',
      'Victory celebration'
    ],
    availableDates: ['2025-01-03', '2025-01-06', '2025-01-08', '2025-01-10', '2025-01-13', '2025-01-17', '2025-01-20'],
    availableTimes: ['12:00 PM', '3:00 PM', '6:00 PM', '8:00 PM']
  }
];