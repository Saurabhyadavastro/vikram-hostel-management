export interface Room {
  id: string;
  number: string;
  type: 'single' | 'double' | 'triple';
  occupied: boolean;
  capacity: number;
  currentOccupants: number;
  facilities: string[];
  monthlyRent: number;
  studentIds?: string[];
}

export interface MessInfo {
  name: string;
  location: string;
  capacity: number;
  mealTypes: string[];
  monthlyFee: number;
  timings: {
    breakfast: string;
    lunch: string;
    dinner: string;
  };
}

export interface Official {
  name: string;
  position: string;
  contact: string;
  email: string;
  image?: string;
}

export interface Hostel {
  id: string;
  name: string;
  type: 'boys' | 'girls';
  capacity: number;
  currentOccupancy: number;
  established: string;
  description: string;
  facilities: string[];
  images: string[];
  rooms: Room[];
  warden: Official;
  assistantWardens: Official[];
  mess: MessInfo;
  fees: {
    roomRent: number; // Monthly rent
    monthlyFee: number; // Monthly fee
    securityDeposit: number;
    maintenanceFee: number;
    admissionFee: number;
  };
  rules: string[];
  location: string;
  nearbyLandmarks: string[];
  isAutonomous?: boolean;
  specialCategory?: string;
  status?: 'active' | 'closed' | 'maintenance';
}

export const hostelsData: Hostel[] = [
  // Boys Hostels
  {
    id: 'sandipini',
    name: 'Sandipini Boys Hostel',
    type: 'boys',
    capacity: 200,
    currentOccupancy: 185,
    established: '1995',
    description: 'One of the premier hostels of Vikram University, Sandipini Boys Hostel provides excellent accommodation with modern facilities. Named after the ancient sage Sandipini, this hostel maintains the highest standards of discipline and academic excellence.',
    facilities: [
      'Wi-Fi Internet',
      'Common Room with TV',
      'Reading Room',
      'Gym Facilities',
      'Laundry Service',
      'Water Cooler',
      'Mess Hall',
      'Parking Area',
      'Security 24/7',
      'Medical First Aid',
      'Study Tables',
      'Wardrobe'
    ],
    images: [
      '/images/Boys Hostel/Sandipini Hostel.jpg'
    ],
    rooms: generateRooms(200, 'sandipini'),
    warden: {
      name: 'Dr. Rajesh Sharma',
      position: 'Chief Warden',
      contact: '+91 9876543210',
      email: 'rajesh.sharma@vikramuniv.ac.in'
    },
    assistantWardens: [
      {
        name: 'Mr. Anil Kumar',
        position: 'Assistant Warden',
        contact: '+91 9876543211',
        email: 'anil.kumar@vikramuniv.ac.in'
      },
      {
        name: 'Mr. Suresh Patel',
        position: 'Assistant Warden',
        contact: '+91 9876543212',
        email: 'suresh.patel@vikramuniv.ac.in'
      }
    ],
    mess: {
      name: 'Sandipini Mess',
      location: 'Ground Floor, Sandipini Hostel',
      capacity: 200,
      mealTypes: ['Vegetarian', 'Non-Vegetarian', 'Jain'],
      monthlyFee: 2000,
      timings: {
        breakfast: '7:00 AM - 9:00 AM',
        lunch: '12:00 PM - 2:00 PM',
        dinner: '7:00 PM - 9:00 PM'
      }
    },
    fees: {
      roomRent: 800, // Monthly rent (₹9,600 yearly / 12 months)
      monthlyFee: 800, // Monthly fee (₹9,600 yearly / 12 months)
      securityDeposit: 5000,
      maintenanceFee: 500,
      admissionFee: 1000
    },
    rules: [
      'Maintain discipline and follow hostel timings',
      'No smoking or alcohol consumption',
      'Keep rooms clean and tidy',
      'Respect fellow residents',
      'Follow mess timings strictly',
      'No unauthorized guests after 9 PM',
      'Damage to property will be charged',
      'Report any issues to warden immediately'
    ],
    location: 'University Campus, Ujjain',
    nearbyLandmarks: ['Central Library', 'Administrative Block', 'Sports Complex']
  },
  {
    id: 'kalidash',
    name: 'Kalidash Boys Hostel',
    type: 'boys',
    capacity: 180,
    currentOccupancy: 165,
    established: '1998',
    description: 'Kalidash Boys Hostel is known for its serene environment and excellent infrastructure. Named after the great poet Kalidasa, this hostel fosters creativity and academic excellence among its residents.',
    facilities: [
      'Wi-Fi Internet',
      'Air Conditioned Common Room',
      'Library',
      'Sports Equipment',
      'Laundry Service',
      'Water Purifier',
      'Cafeteria',
      'Parking Area',
      'CCTV Surveillance',
      'Medical Room',
      'Study Halls',
      'Recreation Room'
    ],
    images: [
      '/images/Boys Hostel/Kalidash Hostel Front View.jpg',
      '/images/Boys Hostel/Kalidash Hostel Room View.jpg',
      '/images/Boys Hostel/Kalidash Hostel Side View.jpg'
    ],
    rooms: generateRooms(180, 'kalidash'),
    warden: {
      name: 'Dr. Priya Verma',
      position: 'Chief Warden',
      contact: '+91 9876543220',
      email: 'priya.verma@vikramuniv.ac.in'
    },
    assistantWardens: [
      {
        name: 'Mr. Vikash Singh',
        position: 'Assistant Warden',
        contact: '+91 9876543221',
        email: 'vikash.singh@vikramuniv.ac.in'
      }
    ],
    mess: {
      name: 'Kalidash Mess',
      location: 'Ground Floor, Kalidash Hostel',
      capacity: 180,
      mealTypes: ['Vegetarian', 'Non-Vegetarian'],
      monthlyFee: 2000,
      timings: {
        breakfast: '7:30 AM - 9:30 AM',
        lunch: '12:30 PM - 2:30 PM',
        dinner: '7:30 PM - 9:30 PM'
      }
    },
    fees: {
      roomRent: 800, // Monthly rent (₹9,600 yearly / 12 months)
      monthlyFee: 800, // Monthly fee (₹9,600 yearly / 12 months)
      securityDeposit: 4500,
      maintenanceFee: 450,
      admissionFee: 1000
    },
    rules: [
      'Maintain cleanliness in rooms and common areas',
      'No smoking or drinking allowed',
      'Respect fellow residents and staff',
      'Follow mess timings and rules',
      'Keep noise levels low during study hours',
      'No unauthorized guests after 9 PM',
      'Participate in hostel activities',
      'Report maintenance issues promptly'
    ],
    location: 'University Campus, Ujjain',
    nearbyLandmarks: ['Art Gallery', 'Botanical Garden', 'Faculty Club']
  },
  {
    id: 'bhartihari',
    name: 'Bhartihari Boys Hostel',
    type: 'boys',
    capacity: 160,
    currentOccupancy: 145,
    established: '2000',
    description: 'Bhartihari Boys Hostel, named after the legendary poet-king Bhartihari, provides a perfect blend of tradition and modernity. The hostel is known for its academic atmosphere and cultural activities.',
    facilities: [
      'High-Speed Wi-Fi',
      'Digital Common Room',
      'Computer Lab',
      'Indoor Games',
      'Laundry Service',
      'RO Water System',
      'Multi-cuisine Mess',
      'Bicycle Parking',
      'Biometric Security',
      'Health Center',
      'Conference Room',
      'Music Room'
    ],
    images: [
      '/images/Boys Hostel/Bhartihari Hostel Front View.jpg',
      '/images/Boys Hostel/Bhartihari Room view 1.jpg',
      '/images/Boys Hostel/Bhartihari Room view 2.jpg'
    ],
    rooms: generateRooms(160, 'bhartihari'),
    warden: {
      name: 'Dr. Sanjay Tiwari',
      position: 'Chief Warden',
      contact: '+91 9876543230',
      email: 'sanjay.tiwari@vikramuniv.ac.in'
    },
    assistantWardens: [
      {
        name: 'Mr. Rahul Jain',
        position: 'Assistant Warden',
        contact: '+91 9876543231',
        email: 'rahul.jain@vikramuniv.ac.in'
      }
    ],
    mess: {
      name: 'Bhartihari Mess',
      location: 'Ground Floor, Bhartihari Hostel',
      capacity: 160,
      mealTypes: ['Vegetarian', 'Non-Vegetarian', 'South Indian'],
      monthlyFee: 2000,
      timings: {
        breakfast: '7:00 AM - 9:00 AM',
        lunch: '12:00 PM - 2:00 PM',
        dinner: '7:00 PM - 9:00 PM'
      }
    },
    fees: {
      roomRent: 800, // Monthly rent (₹9,600 yearly / 12 months)
      monthlyFee: 800, // Monthly fee (₹9,600 yearly / 12 months)
      securityDeposit: 4800,
      maintenanceFee: 480,
      admissionFee: 1000
    },
    rules: [
      'Maintain academic focus and discipline',
      'No substance abuse of any kind',
      'Participate in cultural activities',
      'Respect hostel property and facilities',
      'Follow proper visitor protocols',
      'Maintain personal hygiene',
      'Support fellow residents',
      'Keep hostel premises clean'
    ],
    location: 'University Campus, Ujjain',
    nearbyLandmarks: ['Literature Department', 'Auditorium', 'Cafeteria']
  },
  {
    id: 'shaligram-tomar',
    name: 'Shaligram Tomar Boys Hostel',
    type: 'boys',
    capacity: 170,
    currentOccupancy: 155,
    established: '2003',
    description: 'Shaligram Tomar Boys Hostel is a modern facility named after the brave warrior Shaligram Tomar. The hostel emphasizes leadership qualities and all-round development of its residents.',
    facilities: [
      'Premium Wi-Fi',
      'Smart Common Room',
      'Fitness Center',
      'Outdoor Sports',
      'Professional Laundry',
      'Filtered Water',
      'Gourmet Mess',
      'Covered Parking',
      'Advanced Security',
      'Wellness Center',
      'Seminar Hall',
      'Gaming Zone'
    ],
    images: [
      '/images/Boys Hostel/Shaligram Tomar Hostel Front View.jpg',
      '/images/Boys Hostel/Shaligram Tomar Hostel Interior View.jpg',
      '/images/Boys Hostel/Shaligram Tomar Hostel Room Front.jpg',
      '/images/Boys Hostel/Shaligram Tomar Hostel Room Side.jpg',
      '/images/Boys Hostel/Shaligram Tomar Hostel Side View.jpg'
    ],
    rooms: generateRooms(170, 'shaligram-tomar'),
    warden: {
      name: 'Dr. Amit Gupta',
      position: 'Chief Warden',
      contact: '+91 9876543240',
      email: 'amit.gupta@vikramuniv.ac.in'
    },
    assistantWardens: [
      {
        name: 'Mr. Ravi Sharma',
        position: 'Assistant Warden',
        contact: '+91 9876543241',
        email: 'ravi.sharma@vikramuniv.ac.in'
      }
    ],
    mess: {
      name: 'Shaligram Tomar Mess',
      location: 'Ground Floor, Shaligram Tomar Hostel',
      capacity: 170,
      mealTypes: ['Vegetarian', 'Non-Vegetarian', 'Continental'],
      monthlyFee: 2000,
      timings: {
        breakfast: '7:00 AM - 9:00 AM',
        lunch: '12:00 PM - 2:00 PM',
        dinner: '7:00 PM - 9:00 PM'
      }
    },
    fees: {
      roomRent: 800, // Monthly rent (₹9,600 yearly / 12 months)
      monthlyFee: 800, // Monthly fee (₹9,600 yearly / 12 months)
      securityDeposit: 5100,
      maintenanceFee: 510,
      admissionFee: 1000
    },
    rules: [
      'Develop leadership and teamwork skills',
      'Maintain high standards of conduct',
      'Participate in community service',
      'Respect diversity and inclusion',
      'Follow sustainable practices',
      'Engage in skill development',
      'Promote healthy competition',
      'Support hostel traditions'
    ],
    location: 'University Campus, Ujjain',
    nearbyLandmarks: ['Leadership Center', 'Innovation Hub', 'Sports Stadium']
  },
  {
    id: 'baba-saheb-ambedkar',
    name: 'Baba Saheb Ambedkar Boys Hostel',
    type: 'boys',
    capacity: 150,
    currentOccupancy: 140,
    established: '2010',
    description: 'Baba Saheb Ambedkar Boys Hostel is an autonomous hostel exclusively for SC/ST students. Named after Dr. B.R. Ambedkar, this hostel focuses on educational empowerment and social justice, providing special support and facilities for reserved category students.',
    facilities: [
      'Dedicated Wi-Fi',
      'Study Support Center',
      'Coaching Classes',
      'Counseling Services',
      'Free Laundry',
      'Subsidized Mess',
      'Career Guidance',
      'Scholarship Desk',
      'Mentorship Program',
      'Skill Development',
      'Cultural Programs',
      'Academic Support'
    ],
    images: [
      '/images/Boys Hostel/Baba Shab Ambedikar Hostel.jpg'
    ],
    rooms: generateRooms(150, 'baba-saheb-ambedkar'),
    warden: {
      name: 'Dr. Kailash Meena',
      position: 'Chief Warden',
      contact: '+91 9876543250',
      email: 'kailash.meena@vikramuniv.ac.in'
    },
    assistantWardens: [
      {
        name: 'Mr. Sunil Kumar',
        position: 'Assistant Warden',
        contact: '+91 9876543251',
        email: 'sunil.kumar@vikramuniv.ac.in'
      }
    ],
    mess: {
      name: 'Baba Saheb Ambedkar Mess',
      location: 'Ground Floor, Baba Saheb Ambedkar Hostel',
      capacity: 150,
      mealTypes: ['Vegetarian', 'Non-Vegetarian', 'Special Diet'],
      monthlyFee: 2000,
      timings: {
        breakfast: '7:00 AM - 9:00 AM',
        lunch: '12:00 PM - 2:00 PM',
        dinner: '7:00 PM - 9:00 PM'
      }
    },
    fees: {
      roomRent: 0, // Autonomous hostel - no room rent
      monthlyFee: 0, // Free for SC/ST students
      securityDeposit: 2000, // Reduced security deposit
      maintenanceFee: 0, // No maintenance fee
      admissionFee: 0 // No admission fee
    },
    rules: [
      'Maintain academic excellence',
      'Support fellow community members',
      'Participate in awareness programs',
      'Promote social justice and equality',
      'Engage in educational activities',
      'Respect cultural diversity',
      'Follow hostel guidelines',
      'Contribute to community development'
    ],
    location: 'University Campus, Ujjain',
    nearbyLandmarks: ['Social Justice Center', 'Scholarship Office', 'Counseling Center'],
    isAutonomous: true,
    specialCategory: 'SC/ST Students Only'
  },
  {
    id: 'jawaharlal-nehru',
    name: 'Jawaharlal Nehru Boys Hostel',
    type: 'boys',
    capacity: 180,
    currentOccupancy: 0,
    established: '2020',
    description: 'Jawaharlal Nehru Boys Hostel is one of the newest and most modern accommodation facilities at Vikram University. Named after India\'s first Prime Minister, this hostel embodies the spirit of unity, progress, and modern education. With state-of-the-art facilities and contemporary infrastructure, it provides an excellent living environment for students. Currently closed for maintenance and upgrades.',
    facilities: [
      'Wi-Fi Internet',
      'Air Conditioned Common Areas',
      'Modern Gym',
      'Digital Library',
      'Recreation Hall',
      'Laundry Service',
      'Water Purification System',
      'Mess Hall',
      'Secure Parking',
      '24/7 Security',
      'Medical Facility',
      'Study Rooms',
      'Gaming Zone',
      'Solar Power System',
      'CCTV Surveillance'
    ],
    images: [
      '/images/Boys Hostel/Jawaharlal Nehu Boys Hostel/Front.jpg',
      '/images/Boys Hostel/Jawaharlal Nehu Boys Hostel/IMG-20250709-WA0012.jpg',
      '/images/Boys Hostel/Jawaharlal Nehu Boys Hostel/IMG-20250709-WA0014.jpg',
      '/images/Boys Hostel/Jawaharlal Nehu Boys Hostel/IMG-20250709-WA0015.jpg'
    ],
    rooms: generateRooms(180, 'jawaharlal-nehru'),
    warden: {
      name: 'Dr. Vikash Kumar',
      position: 'Chief Warden',
      contact: '+91 9876543260',
      email: 'vikash.kumar@vikramuniv.ac.in'
    },
    assistantWardens: [
      {
        name: 'Mr. Rajesh Gupta',
        position: 'Assistant Warden',
        contact: '+91 9876543261',
        email: 'rajesh.gupta@vikramuniv.ac.in'
      },
      {
        name: 'Mr. Sunil Sharma',
        position: 'Assistant Warden',
        contact: '+91 9876543262',
        email: 'sunil.sharma@vikramuniv.ac.in'
      }
    ],
    mess: {
      name: 'Nehru Mess',
      location: 'Ground Floor, Jawaharlal Nehru Hostel',
      capacity: 200,
      mealTypes: ['Vegetarian', 'Non-Vegetarian', 'Jain', 'Special Diet'],
      monthlyFee: 2200,
      timings: {
        breakfast: '7:00 AM - 9:00 AM',
        lunch: '12:00 PM - 2:00 PM',
        dinner: '7:00 PM - 9:00 PM'
      }
    },
    fees: {
      roomRent: 1800,
      monthlyFee: 800, // Monthly fee (₹9,600 yearly / 12 months)
      securityDeposit: 3000,
      maintenanceFee: 1200,
      admissionFee: 2000
    },
    rules: [
      'Maintain discipline and order',
      'Follow prescribed entry/exit timings',
      'Keep rooms and common areas clean',
      'No unauthorized guests allowed',
      'Respect fellow residents',
      'Participate in hostel activities',
      'Follow environmental guidelines',
      'Report any issues to authorities'
    ],
    location: 'University Campus, Ujjain',
    nearbyLandmarks: ['New Academic Block', 'Sports Complex', 'IT Center', 'Conference Hall'],
    isAutonomous: false,
    status: 'closed'
  },

  // Girls Hostels
  {
    id: 'vidyatama',
    name: 'Vidyatama Girls Hostel',
    type: 'girls',
    capacity: 250,
    currentOccupancy: 230,
    established: '1992',
    description: 'Vidyatama Girls Hostel is the flagship accommodation for female students at Vikram University. Named after the concept of knowledge and wisdom, it provides a safe, secure, and nurturing environment for academic and personal growth.',
    facilities: [
      'Ladies Only Wi-Fi',
      'Women-Centric Library',
      'Fitness & Yoga Center',
      'Self-Defense Training',
      'Professional Laundry',
      'Purified Water System',
      'Nutritious Mess',
      'Ladies Parking',
      'Female Security Staff',
      'Health & Wellness',
      'Skill Development',
      'Cultural Activities'
    ],
    images: [
      '/images/Girls Hostel/IMG-20250701-WA0063.jpg',
      '/images/Girls Hostel/IMG-20250701-WA0064.jpg',
      '/images/Girls Hostel/IMG-20250701-WA0062.jpg',
      '/images/Girls Hostel/IMG-20250701-WA0061.jpg',
      '/images/Girls Hostel/IMG-20250701-WA0060.jpg',
      '/images/Girls Hostel/IMG-20250701-WA0065.jpg',
      '/images/Girls Hostel/IMG-20250701-WA0066.jpg'
    ],
    rooms: generateRooms(250, 'vidyatama'),
    warden: {
      name: 'Dr. Sunita Agarwal',
      position: 'Chief Warden',
      contact: '+91 9876543260',
      email: 'sunita.agarwal@vikramuniv.ac.in'
    },
    assistantWardens: [
      {
        name: 'Ms. Rekha Joshi',
        position: 'Assistant Warden',
        contact: '+91 9876543261',
        email: 'rekha.joshi@vikramuniv.ac.in'
      },
      {
        name: 'Ms. Priyanka Singh',
        position: 'Assistant Warden',
        contact: '+91 9876543262',
        email: 'priyanka.singh@vikramuniv.ac.in'
      }
    ],
    mess: {
      name: 'Vidyatama Mess',
      location: 'Ground Floor, Vidyatama Hostel',
      capacity: 250,
      mealTypes: ['Vegetarian', 'Jain', 'South Indian', 'North Indian'],
      monthlyFee: 2000,
      timings: {
        breakfast: '7:00 AM - 9:00 AM',
        lunch: '12:00 PM - 2:00 PM',
        dinner: '7:00 PM - 9:00 PM'
      }
    },
    fees: {
      roomRent: 500, // Monthly rent (₹6,000 yearly / 12 months)
      monthlyFee: 500, // Monthly fee (₹6,000 yearly / 12 months)
      securityDeposit: 3000,
      maintenanceFee: 300,
      admissionFee: 500
    },
    rules: [
      'Maintain discipline and decorum',
      'No male visitors in hostel premises',
      'Follow hostel timings strictly',
      'Keep rooms and common areas clean',
      'Respect fellow residents',
      'No loud music after 9 PM',
      'Register all visitors',
      'Report any issues to warden'
    ],
    location: 'University Campus, Ujjain',
    nearbyLandmarks: ['Women Studies Center', 'Central Library', 'Health Center']
  },
  {
    id: 'ramabai',
    name: 'Ramabai Girls Hostel',
    type: 'girls',
    capacity: 50,
    currentOccupancy: 48,
    established: '2015',
    description: 'A boutique hostel named after Ramabai Ranade, providing premium accommodation for female students from SC/ST category. With smaller capacity, it offers personalized care and attention to each resident with special focus on educational empowerment.',
    facilities: [
      'Premium Wi-Fi',
      'Elegant Common Room',
      'Private Study Areas',
      'Yoga Room',
      'In-house Laundry',
      'Premium Water System',
      'Fine Dining Mess',
      'Reserved Parking',
      'Advanced Security',
      'Wellness Center',
      'Conference Room',
      'Art & Craft Room'
    ],
    images: [
      '/images/Girls Hostel/IMG-20250701-WA0067.jpg',
      '/images/Girls Hostel/IMG-20250701-WA0068.jpg',
      '/images/Girls Hostel/IMG-20250701-WA0069.jpg',
      '/images/Girls Hostel/IMG-20250701-WA0070.jpg',
      '/images/Girls Hostel/IMG-20250701-WA0071.jpg',
      '/images/Girls Hostel/IMG-20250701-WA0072.jpg',
      '/images/Girls Hostel/IMG-20250701-WA0073.jpg'
    ],
    rooms: generateRooms(50, 'ramabai'),
    warden: {
      name: 'Prof. Meera Patel',
      position: 'Chief Warden',
      contact: '+91 9876543270',
      email: 'meera.patel@vikramuniv.ac.in'
    },
    assistantWardens: [
      {
        name: 'Ms. Anjali Sharma',
        position: 'Assistant Warden',
        contact: '+91 9876543271',
        email: 'anjali.sharma@vikramuniv.ac.in'
      }
    ],
    mess: {
      name: 'Ramabai Premium Mess',
      location: 'Ground Floor, Ramabai Hostel',
      capacity: 60,
      mealTypes: ['Vegetarian', 'Organic', 'International', 'Diet Special'],
      monthlyFee: 2000,
      timings: {
        breakfast: '7:30 AM - 9:30 AM',
        lunch: '12:30 PM - 2:30 PM',
        dinner: '7:30 PM - 9:30 PM'
      }
    },
    fees: {
      roomRent: 417, // Monthly rent (₹5,000 yearly / 12 months)
      monthlyFee: 417, // Monthly fee (₹5,000 yearly / 12 months)
      securityDeposit: 2500,
      maintenanceFee: 250,
      admissionFee: 500
    },
    rules: [
      'Maintain highest standards of conduct',
      'Respect privacy and personal space',
      'Follow premium service protocols',
      'Engage in cultural activities',
      'Maintain academic excellence',
      'Use facilities responsibly',
      'Support community initiatives',
      'Promote women empowerment'
    ],
    location: 'University Campus, Ujjain',
    nearbyLandmarks: ['Premium Guest House', 'Conference Center', 'Executive Block'],
    specialCategory: 'SC/ST Students Only'
  }
];

function generateRooms(capacity: number, hostelId: string): Room[] {
  const rooms: Room[] = [];
  const floorsCount = Math.ceil(capacity / 20); // Assuming 20 rooms per floor
  
  for (let floor = 1; floor <= floorsCount; floor++) {
    const roomsOnFloor = Math.min(20, capacity - rooms.length);
    
    for (let roomNum = 1; roomNum <= roomsOnFloor; roomNum++) {
      const roomNumber = `${floor}${roomNum.toString().padStart(2, '0')}`;
      const roomType = roomNum <= 5 ? 'single' : roomNum <= 15 ? 'double' : 'triple';
      const roomCapacity = roomType === 'single' ? 1 : roomType === 'double' ? 2 : 3;
      const occupied = Math.random() > 0.1; // 90% occupancy rate
      const currentOccupants = occupied ? Math.floor(Math.random() * roomCapacity) + 1 : 0;
      
      rooms.push({
        id: `${hostelId}-${roomNumber}`,
        number: roomNumber,
        type: roomType,
        occupied,
        capacity: roomCapacity,
        currentOccupants,
        facilities: [
          'Study Table',
          'Wardrobe',
          'Bed',
          'Mattress',
          'Fan',
          'Tube Light',
          'Power Socket',
          'Window',
          ...(roomType === 'single' ? ['Attached Bathroom'] : ['Shared Bathroom']),
          ...(Math.random() > 0.5 ? ['Balcony'] : [])
        ],
        monthlyRent: roomType === 'single' ? 3000 : roomType === 'double' ? 2500 : 2000,
        studentIds: occupied ? Array.from({ length: currentOccupants }, (_, i) => `STU${Date.now()}-${i}`) : []
      });
    }
  }
  
  return rooms.slice(0, capacity);
}

export const newsData = [
  {
    id: '1',
    title: 'New Hostel Block Construction Started',
    content: 'Construction of a new 300-capacity hostel block has begun near the main campus.',
    date: '2025-07-01',
    type: 'announcement',
    priority: 'high'
  },
  {
    id: '2',
    title: 'Mess Menu Updated for July',
    content: 'New continental dishes added to the mess menu. Check out the updated weekly menu.',
    date: '2025-06-30',
    type: 'mess',
    priority: 'medium'
  },
  {
    id: '3',
    title: 'Room Allotment for New Session',
    content: 'Room allotment for the new academic session 2025-26 will begin from July 15th.',
    date: '2025-06-28',
    type: 'admission',
    priority: 'high'
  },
  {
    id: '4',
    title: 'Hostel Fee Payment Reminder',
    content: 'All students are reminded to pay their hostel fees before July 10th to avoid late fees.',
    date: '2025-06-25',
    type: 'payment',
    priority: 'high'
  },
  {
    id: '5',
    title: 'Cultural Night at Vidyatama Hostel',
    content: 'Annual cultural night celebration will be held on July 5th at 7 PM in the hostel auditorium.',
    date: '2025-06-20',
    type: 'event',
    priority: 'medium'
  }
];