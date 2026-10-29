import { 
  ServiceProvider, 
  ChatConversation, 
  CommunityNewsItem, 
  ServiceJob, 
  PendingVerification 
} from '../types/kattar';

export const INITIAL_SERVICE_PROVIDERS: ServiceProvider[] = [
  {
    id: 'prov-1',
    name: 'Rajesh Sharma',
    phone: '+91 98450 23145',
    profession: 'Plumbing',
    organization: 'rss',
    orgBadgeLabel: 'RSS Swayamsevak',
    religion: 'Hindu',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80',
    rating: 4.92,
    reviewCount: 142,
    distanceKm: 1.8,
    area: 'Indiranagar 12th Main',
    isAvailableNow: true,
    serviceRadiusKm: 8,
    availabilityDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    availabilityTime: { start: '08:00 AM', end: '08:00 PM' },
    experienceYears: 11,
    specializations: ['Pipe Relining', 'Water Heater Repair', 'Sanitary Fittings', 'Emergency Leak Fix'],
    hourlyRateInr: 350,
    verifiedByDevine: true,
    about: 'Experienced residential & commercial plumber dedicated to transparent pricing, punctual arrivals, and dharmic service.',
    completedJobsCount: 310,
    communityHelpsCount: 64,
    coordinates: { lat: 12.9716, lng: 77.6412 }
  },
  {
    id: 'prov-2',
    name: 'Ramesh Electricals',
    phone: '+91 99012 87654',
    profession: 'Electrician',
    organization: 'bajrangdal',
    orgBadgeLabel: 'Bajrang Dal Seva',
    religion: 'Hindu',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&h=120&q=80',
    rating: 4.96,
    reviewCount: 189,
    distanceKm: 2.4,
    area: 'Defence Colony, Indiranagar',
    isAvailableNow: true,
    serviceRadiusKm: 10,
    availabilityDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    availabilityTime: { start: '07:30 AM', end: '09:00 PM' },
    experienceYears: 14,
    specializations: ['Inverter Wiring', 'Short Circuit Triage', 'Main Board Breakers', 'EV Charger Setup'],
    hourlyRateInr: 400,
    verifiedByDevine: true,
    about: 'Licensed certified electrical contractor. Quick emergency turnarounds across 5-10km Indiranagar and surrounding layouts.',
    completedJobsCount: 420,
    communityHelpsCount: 88,
    coordinates: { lat: 12.9785, lng: 77.6385 }
  },
  {
    id: 'prov-3',
    name: 'Pandit Radheshyam Shastri',
    phone: '+91 94481 55678',
    profession: 'Priest',
    organization: 'vhp',
    orgBadgeLabel: 'VHP Purohit Parishad',
    religion: 'Hindu',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
    rating: 5.0,
    reviewCount: 230,
    distanceKm: 3.1,
    area: 'HAL 2nd Stage, Bangalore',
    isAvailableNow: true,
    serviceRadiusKm: 10,
    availabilityDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    availabilityTime: { start: '06:00 AM', end: '08:30 PM' },
    experienceYears: 22,
    specializations: ['Griha Pravesh', 'Satyanarayan Katha', 'Vastu Shanti', 'Navagraha Homam', 'Kundali Matching'],
    hourlyRateInr: 1100,
    verifiedByDevine: true,
    about: 'Vedic scholar with 22 years of authentic archana and homam practice. All samagri assistance provided locally.',
    completedJobsCount: 580,
    communityHelpsCount: 120,
    coordinates: { lat: 12.9644, lng: 77.6499 }
  },
  {
    id: 'prov-4',
    name: 'Inspector Vikram Patil',
    phone: '+91 94808 01100',
    profession: 'Police',
    organization: 'police',
    orgBadgeLabel: 'Bangalore City Police (Retd/Liaison)',
    religion: 'Hindu',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80',
    rating: 4.98,
    reviewCount: 95,
    distanceKm: 2.9,
    area: 'Indiranagar Police Station Jurisdiction',
    isAvailableNow: true,
    serviceRadiusKm: 10,
    availabilityDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    availabilityTime: { start: '24 Hours', end: 'Emergency Response' },
    experienceYears: 18,
    specializations: ['Community Safety', 'Senior Citizen Helpline', 'Tenant Verification', 'Night Patrol Coordination'],
    hourlyRateInr: 0,
    verifiedByDevine: true,
    about: 'Dedicated community liaison helping residents coordinate neighborhood security, emergency reporting, and police verification.',
    completedJobsCount: 160,
    communityHelpsCount: 140,
    coordinates: { lat: 12.9734, lng: 77.6441 }
  },
  {
    id: 'prov-5',
    name: 'Rahul K. (KATTAR Rider)',
    phone: '+91 88840 99123',
    profession: 'Rider',
    organization: 'rss',
    orgBadgeLabel: 'RSS Yuva Seva',
    religion: 'Hindu',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
    rating: 4.89,
    reviewCount: 310,
    distanceKm: 1.2,
    area: 'Domlur & Indiranagar Link',
    isAvailableNow: true,
    serviceRadiusKm: 6,
    availabilityDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    availabilityTime: { start: '07:00 AM', end: '11:00 PM' },
    experienceYears: 4,
    specializations: ['Instant Medicine Drop', 'Elderly Grocery Run', 'Temple Prasad Transit', 'Express Document Delivery'],
    hourlyRateInr: 120,
    verifiedByDevine: true,
    about: 'Reliable neighborhood rider on two-wheeler. Fast 15-minute drops within 5-10km radius.',
    completedJobsCount: 650,
    communityHelpsCount: 92,
    coordinates: { lat: 12.9667, lng: 77.6355 }
  },
  {
    id: 'prov-6',
    name: 'Pooja Iyer M.Sc',
    phone: '+91 97401 33421',
    profession: 'Education / Tutoring',
    organization: 'abvp',
    orgBadgeLabel: 'ABVP Vidya Bharati',
    religion: 'Hindu',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80',
    rating: 4.95,
    reviewCount: 88,
    distanceKm: 4.2,
    area: 'Old Airport Road, Kodihalli',
    isAvailableNow: false,
    serviceRadiusKm: 7,
    availabilityDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    availabilityTime: { start: '04:00 PM', end: '08:30 PM' },
    experienceYears: 8,
    specializations: ['Vedic Mathematics', 'CBSE Class 10/12 Physics', 'Samskritam Basics', 'Competitive Foundation'],
    hourlyRateInr: 500,
    verifiedByDevine: true,
    about: 'Passionate educator integrating traditional Vedic analytical techniques with modern science curricula for local school students.',
    completedJobsCount: 140,
    communityHelpsCount: 45,
    coordinates: { lat: 12.9592, lng: 77.6521 }
  },
  {
    id: 'prov-7',
    name: 'Hindu Seva Samiti Emergency Cell',
    phone: '+91 80 2520 9090',
    profession: 'Hindu Welfare Agency',
    organization: 'welfare',
    orgBadgeLabel: 'Rashtriya Seva Bharati Affiliate',
    religion: 'Hindu',
    avatar: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=120&h=120&q=80',
    rating: 5.0,
    reviewCount: 340,
    distanceKm: 3.8,
    area: 'Tippasandra Main Road',
    isAvailableNow: true,
    serviceRadiusKm: 10,
    availabilityDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    availabilityTime: { start: '24 Hours', end: 'Non-stop' },
    experienceYears: 16,
    specializations: ['Emergency Blood Donor Network', 'Free Ambulance Transport', 'Natural Calamity Aid', 'Gau Seva Support'],
    hourlyRateInr: 0,
    verifiedByDevine: true,
    about: '24/7 volunteer-driven Hindu community welfare and emergency response cell serving eastern Bangalore.',
    completedJobsCount: 890,
    communityHelpsCount: 750,
    coordinates: { lat: 12.9750, lng: 77.6550 }
  }
];

export const INITIAL_CONVERSATIONS: ChatConversation[] = [
  {
    id: 'chat-1',
    name: 'Rajesh Plumber',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80',
    isGroup: false,
    profession: 'Plumbing',
    organization: 'rss',
    verifiedByDevine: true,
    lastMessage: 'I am on the way, live tracking is shared below.',
    lastMessageTime: '09:42 AM',
    unreadCount: 0,
    isOnline: true,
    messages: [
      {
        id: 'msg-1',
        senderId: 'user',
        senderName: 'You',
        text: 'Namaste Rajesh ji, our kitchen sink pipe joint has burst and leaking heavily. Are you available nearby?',
        timestamp: '09:30 AM',
        status: 'read',
        type: 'text'
      },
      {
        id: 'msg-2',
        senderId: 'prov-1',
        senderName: 'Rajesh Plumber',
        text: 'Namaste! Yes, I am at 100ft road Indiranagar right now (1.8km away). Please send a photo of the joint.',
        timestamp: '09:32 AM',
        status: 'read',
        type: 'text'
      },
      {
        id: 'msg-3',
        senderId: 'user',
        senderName: 'You',
        text: 'Here is the leaking pipe coupling under the granite slab:',
        timestamp: '09:34 AM',
        status: 'read',
        type: 'image',
        mediaUrl: '/src/assets/images/screen_preview_analytics_1793279021632.jpg'
      },
      {
        id: 'msg-4',
        senderId: 'prov-1',
        senderName: 'Rajesh Plumber',
        text: 'Understood, PVC threaded collar failure. I have the replacement brass coupling in my toolkit. Rushing to your location right now!',
        timestamp: '09:38 AM',
        status: 'read',
        type: 'text'
      },
      {
        id: 'msg-5',
        senderId: 'prov-1',
        senderName: 'Rajesh Plumber',
        text: 'Live Service Tracking Active: ETA 6 minutes',
        timestamp: '09:42 AM',
        status: 'delivered',
        type: 'location',
        locationData: {
          title: 'Rajesh Plumber (On Two-Wheeler)',
          address: 'Approaching 12th Main Road, Indiranagar',
          lat: 12.9716,
          lng: 77.6412,
          isLiveTracking: true,
          etaMinutes: 6
        }
      }
    ]
  },
  {
    id: 'chat-2',
    name: 'Indiranagar Hindu Community Circle',
    avatar: '/assets/aistudio/screen_0dd7bf8b.png',
    isGroup: true,
    participantsCount: 148,
    organization: 'welfare',
    verifiedByDevine: true,
    lastMessage: 'Tomorrow 7:30 AM: Community Temple Deepotsav coordination meet.',
    lastMessageTime: '08:15 AM',
    unreadCount: 3,
    isOnline: true,
    messages: [
      {
        id: 'grp-1',
        senderId: 'prov-4',
        senderName: 'Inspector Vikram Patil',
        text: 'Notice: Special police patrolling teams deployed between 100ft road and Defence Colony for festive security.',
        timestamp: '07:50 AM',
        status: 'read',
        type: 'text'
      },
      {
        id: 'grp-2',
        senderId: 'prov-3',
        senderName: 'Pandit Radheshyam Shastri',
        text: 'Jayatu Sanatan Dharma. The temple trust has organized evening Maha Aarti and prasadam distribution. All families welcome.',
        timestamp: '08:10 AM',
        status: 'read',
        type: 'text'
      },
      {
        id: 'grp-3',
        senderId: 'admin',
        senderName: 'KATTAR Seva Lead',
        text: 'Verified News Article shared with 5-10km community:',
        timestamp: '08:15 AM',
        status: 'read',
        type: 'news',
        newsData: {
          title: 'Local Temple Heritage Restoration & Free Sanskrit Classes Announced',
          source: 'Dharmic Samvad Indiranagar',
          snippet: 'Vedic scholar committee launches weekend children classes and community seva initiatives.',
          imageUrl: '/src/assets/images/hero_stitch_workspace_1793279020938.jpg'
        }
      }
    ]
  },
  {
    id: 'chat-3',
    name: 'Pandit Radheshyam Shastri',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
    isGroup: false,
    profession: 'Priest',
    organization: 'vhp',
    verifiedByDevine: true,
    lastMessage: 'Vastu Shanti Pooja List document attached for Sunday morning.',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    isOnline: false,
    messages: [
      {
        id: 'p-1',
        senderId: 'user',
        senderName: 'You',
        text: 'Pranam Pandit ji. We want to conduct Vastu Shanti on coming Sunday at our new home in HAL 2nd Stage.',
        timestamp: 'Yesterday 04:15 PM',
        status: 'read',
        type: 'text'
      },
      {
        id: 'p-2',
        senderId: 'prov-3',
        senderName: 'Pandit Radheshyam Shastri',
        text: 'Shubhashirvad! Sunday auspicious Muhurta is 07:15 AM to 09:30 AM. Here is the verified Pooja Samagri checklist:',
        timestamp: 'Yesterday 04:22 PM',
        status: 'read',
        type: 'document',
        documentData: {
          fileName: 'Vastu_Shanti_Samagri_Indiranagar.pdf',
          fileSize: '1.4 MB',
          fileType: 'PDF'
        }
      }
    ]
  },
  {
    id: 'chat-4',
    name: 'Ramesh Electricals',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&h=120&q=80',
    isGroup: false,
    profession: 'Electrician',
    organization: 'bajrangdal',
    verifiedByDevine: true,
    lastMessage: 'Invoice #KTR-8812 for MCB replacement sent.',
    lastMessageTime: '28 Oct',
    unreadCount: 0,
    isOnline: true,
    messages: [
      {
        id: 'e-1',
        senderId: 'prov-2',
        senderName: 'Ramesh Electricals',
        text: 'MCB box test completed. Load balance nominal at 230V.',
        timestamp: '28 Oct 06:10 PM',
        status: 'read',
        type: 'text'
      }
    ]
  }
];

export const INITIAL_COMMUNITY_NEWS: CommunityNewsItem[] = [
  {
    id: 'news-1',
    title: 'Navratri Deepotsav & Grand Aarti in Indiranagar 12th Main',
    category: 'Temple & Dharma',
    date: 'Today, 07:00 PM',
    source: 'Sri Rama Temple Trust Indiranagar',
    verifiedSource: true,
    summary: 'Over 1,000 traditional earthen diyas to illuminate the temple courtyard with Vedic chanting by local purohits.',
    content: 'All families residing within the 5-10km radius are cordially invited for the annual Deepotsav. Free prasadam and safe parking arrangements have been organized with volunteer seva by KATTAR youth.',
    imageUrl: '/src/assets/images/hero_stitch_workspace_1793279020938.jpg',
    attendeesCount: 420,
    location: '12th Main Sri Rama Mandir, Indiranagar',
    isUrgent: false
  },
  {
    id: 'news-2',
    title: 'Urgent Alert: O-Negative Blood Donors Needed at Manipal Hospital',
    category: 'Urgent Alert',
    date: '28 mins ago',
    source: 'Hindu Seva Samiti Emergency Cell',
    verifiedSource: true,
    summary: 'Critical emergency requirement for 2 units of O-Negative blood for a community elder undergoing emergency cardiac bypass.',
    content: 'Eligible donors residing in Indiranagar, Domlur, or HAL please contact immediately via KATTAR Quick Chat or call the welfare coordinator. Verified transport arranged.',
    attendeesCount: 14,
    location: 'HAL Old Airport Road, Bangalore',
    isUrgent: true
  },
  {
    id: 'news-3',
    title: 'Free Weekend Vedic Mathematics & Coding Workshop for Students',
    category: 'Events',
    date: 'Saturday, 10:00 AM',
    source: 'ABVP Vidya Bharati Chapter',
    verifiedSource: true,
    summary: 'Speed mental calculations, algebraic sutras, and algorithmic logic taught by experienced educators.',
    content: 'Open for students from 8th to 12th grade. Includes complimentary study materials and participation certificates.',
    attendeesCount: 85,
    location: 'KATTAR Community Hall, Defence Colony',
    isUrgent: false
  }
];

export const INITIAL_SERVICE_HISTORY: ServiceJob[] = [
  {
    id: 'job-101',
    providerId: 'prov-1',
    providerName: 'Rajesh Sharma',
    profession: 'Plumber',
    date: '29 Oct 2026, 10:15 AM',
    status: 'Completed',
    serviceCharge: 450,
    partsCharge: 305,
    totalAmount: 755,
    paymentMethod: 'UPI',
    transactionId: 'UPI-KTR-99482104',
    rating: 5,
    reviewTags: ['Punctual', 'Professional', 'Fair Pricing', 'Clean Work'],
    reviewComment: 'Arrived within 10 minutes of booking! Fixed the high-pressure leak cleanly with genuine brass joint. Highly recommended.'
  },
  {
    id: 'job-102',
    providerId: 'prov-2',
    providerName: 'Ramesh Electricals',
    profession: 'Electrician',
    date: '27 Oct 2026, 04:30 PM',
    status: 'Completed',
    serviceCharge: 400,
    partsCharge: 650,
    totalAmount: 1050,
    paymentMethod: 'UPI',
    transactionId: 'UPI-KTR-88129032',
    rating: 5,
    reviewTags: ['Punctual', 'Fair Pricing'],
    reviewComment: 'Prompt service and very respectful. Replaced heavy load circuit breaker with safety seal.'
  }
];

export const INITIAL_PENDING_VERIFICATIONS: PendingVerification[] = [
  {
    id: 'verif-1',
    applicantName: 'Suresh Bhat',
    profession: 'Priest',
    organization: 'VHP Purohit Parishad',
    documentType: 'Professional License',
    submissionDate: '29 Oct 2026',
    smartMatchPercent: 98,
    status: 'Pending',
    notes: 'Vedic Gurukula Certificate and Aadhaar authenticated.'
  },
  {
    id: 'verif-2',
    applicantName: 'Anil Deshmukh',
    profession: 'Electrician',
    organization: 'RSS Swayamsevak',
    documentType: 'Aadhaar / Voter ID',
    submissionDate: '28 Oct 2026',
    smartMatchPercent: 96,
    status: 'Pending',
    notes: 'Govt Electrical Wireman License Grade 1.'
  },
  {
    id: 'verif-3',
    applicantName: 'Manoj Hegde',
    profession: 'Delivery Partner',
    organization: 'Bajrang Dal Seva',
    documentType: 'Aadhaar / Voter ID',
    submissionDate: '27 Oct 2026',
    smartMatchPercent: 99,
    status: 'Approved',
    notes: 'Driving license and identity cross-verified.'
  }
];
