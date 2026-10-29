export type AppTab = 'chats' | 'services' | 'news' | 'profile' | 'admin';

export type OrganizationType = 
  | 'police' 
  | 'rss' 
  | 'vhp' 
  | 'bajrangdal' 
  | 'abvp' 
  | 'aisf' 
  | 'welfare';

export interface OrgBadge {
  type: OrganizationType;
  label: string;
  iconName: string;
  color: string;
  description: string;
}

export type ProfessionCategory =
  | 'Electrician'
  | 'Priest'
  | 'Plumbing'
  | 'Maintenance'
  | 'Health / Medical Services'
  | 'Education / Tutoring'
  | 'Legal / Advisory'
  | 'Delivery Partner'
  | 'Rider'
  | 'Porter'
  | 'Driver'
  | 'Police'
  | 'RSS Representative'
  | 'VHP Sevadal'
  | 'Bajrang Dal Seva'
  | 'ABVP Student Lead'
  | 'AISF Student Lead'
  | 'Hindu Welfare Agency';

export interface ServiceProvider {
  id: string;
  name: string;
  phone: string;
  profession: ProfessionCategory;
  organization?: OrganizationType;
  orgBadgeLabel?: string;
  religion: 'Hindu';
  avatar: string;
  rating: number;
  reviewCount: number;
  distanceKm: number;
  area: string;
  isAvailableNow: boolean;
  serviceRadiusKm: number;
  availabilityDays: string[];
  availabilityTime: {
    start: string;
    end: string;
  };
  experienceYears: number;
  specializations: string[];
  hourlyRateInr: number;
  verifiedByDevine: boolean;
  about: string;
  completedJobsCount: number;
  communityHelpsCount: number;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text?: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  type: 'text' | 'image' | 'video' | 'audio' | 'location' | 'contact' | 'document' | 'news';
  mediaUrl?: string;
  locationData?: {
    title: string;
    address: string;
    lat: number;
    lng: number;
    isLiveTracking?: boolean;
    etaMinutes?: number;
  };
  contactData?: {
    name: string;
    phone: string;
    profession: string;
  };
  documentData?: {
    fileName: string;
    fileSize: string;
    fileType: string;
  };
  newsData?: {
    title: string;
    source: string;
    snippet: string;
    imageUrl?: string;
  };
}

export interface ChatConversation {
  id: string;
  name: string;
  avatar: string;
  isGroup: boolean;
  participantsCount?: number;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  profession?: ProfessionCategory;
  organization?: OrganizationType;
  verifiedByDevine: boolean;
  messages: ChatMessage[];
}

export interface CommunityNewsItem {
  id: string;
  title: string;
  category: 'Local News' | 'Events' | 'Temple & Dharma' | 'Urgent Alert' | 'Maintenance';
  date: string;
  source: string;
  verifiedSource: boolean;
  summary: string;
  content: string;
  imageUrl?: string;
  attendeesCount?: number;
  location: string;
  isUrgent?: boolean;
}

export interface ServiceJob {
  id: string;
  providerId: string;
  providerName: string;
  profession: string;
  date: string;
  status: 'Completed' | 'In Progress' | 'Cancelled';
  serviceCharge: number;
  partsCharge: number;
  totalAmount: number;
  paymentMethod: 'UPI' | 'Cash' | 'Card';
  transactionId: string;
  rating?: number;
  reviewTags?: string[];
  reviewComment?: string;
}

export interface PendingVerification {
  id: string;
  applicantName: string;
  profession: string;
  organization: string;
  documentType: 'Aadhaar / Voter ID' | 'Professional License' | 'Affiliation Letter';
  submissionDate: string;
  smartMatchPercent: number;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Info Requested';
  notes?: string;
}
