export interface Activity {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  duration: string;
  groupSize: string;
  price: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  location: string;
  city: string;
  state: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  highlights: string[];
  included: string[];
  availableDates: string[]; // Array of available dates in YYYY-MM-DD format
  availableTimes: string[]; // Array of available time slots like "9:00 AM", "2:00 PM"
  organizationId?: string; // Optional - for organization-created activities
  organizationName?: string; // Optional - for display purposes
  isApproved?: boolean; // For moderation purposes
}

export interface UserLocation {
  city: string;
  state: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export const CATEGORIES = [
  'All',
  'Team Building',
  'Creative Workshop',
  'Cooking & Food',
  'Adventure',
  'Problem Solving',
  'Wellness'
] as const;

export type Category = typeof CATEGORIES[number];

export interface Organization {
  id: string;
  name: string;
  email: string;
  phone: string;
  website?: string;
  description: string;
  logo?: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  contactPerson: string;
  createdAt: string;
  isVerified: boolean;
}

export interface OrganizationAuth {
  isAuthenticated: boolean;
  organization: Organization | null;
}