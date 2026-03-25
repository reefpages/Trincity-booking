export enum PricingModel {
  CAPACITY_TIER = 'capacity_tier_pricing',
  DURATION = 'duration_pricing',
  DURATION_PLUS_EXTRA = 'duration_plus_extra_fees',
  DURATION_MANDATORY = 'duration_with_mandatory_fees',
  FIXED_CAPACITY = 'fixed_capacity_event_pricing',
  SPORTS_FACILITY = 'sports_facility_pricing',
  HYBRID_RULE = 'hybrid_rule_pricing',
  GLOBAL_SERVICE = 'global_service_pricing'
}

export enum AccountType {
  PUBLIC = 'Public User',
  STAFF = 'Staff / Faculty',
  SCHOOL = 'School / Educational Institution',
  NGO = 'NGO / Charitable Organization',
  ALUMNI = 'Alumni / PSG',
  CORPORATE = 'Corporate / Organization'
}

export enum VerificationStatus {
  EMAIL_UNVERIFIED = 'email_unverified',
  ACTIVE = 'active',
  PENDING_REVIEW = 'pending_review',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  SUSPENDED = 'suspended'
}

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  BLOCKED = 'blocked',
  AWAITING_APPROVAL = 'awaiting approval',
  PAID = 'paid',
  PARTIALLY_PAID = 'partially paid',
  UNPAID = 'unpaid'
}

export interface Amenity {
  icon: string;
  label: string;
}

export interface PricingTier {
  minCapacity: number;
  maxCapacity: number;
  baseRate: number;
  vat: number;
  subtotal: number;
  cott: number;
  insurance: number;
  cautionFee: number;
  total: number;
}

export interface Listing {
  id: string;
  title: string;
  category: string;
  pricingModel: PricingModel;
  amenities: string[];
  capacity?: string | { min: number; max: number };
  description: string;
  images: string[];
  pricingTiers?: PricingTier[];
  rates?: {
    hourly?: number;
    daily?: number;
    weekly?: number;
    monthly?: number;
  };
  vatRate?: number;
  cleaningFee?: number;
  insurance?: number;
  cautionFee?: number;
  cott?: number;
  technicianFee?: number;
  adminPercent?: number;
  hourlyLimit?: number;
  attendanceFees?: { range: string; fee: number }[];
  availabilityRule?: string;
  calendarMode?: 'date' | 'time_slot';
  notes?: string[];
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
  unit: 'fixed' | 'per_unit';
  category: 'Media Equipment' | 'Furnishings' | 'Decor / Plants' | 'Special Add-ons';
  adminOnly?: boolean;
}

export interface DiscountRule {
  id: string;
  name: string;
  type: 'percentage' | 'fixed_override';
  value: number;
  roles?: string[];
  conditions?: string;
  requiresApproval?: boolean;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organizationName?: string;
  accountType: AccountType;
  verifiedRole: string;
  verificationStatus: VerificationStatus;
  createdAt: string;
  isAdmin?: boolean;
}

export interface Booking {
  id: string;
  venueId: string;
  userId: string;
  date: string;
  startTime?: string;
  endTime?: string;
  duration?: number;
  guests?: number;
  status: BookingStatus;
  totalPrice: number;
  addOns: { id: string; quantity: number }[];
  discountId?: string;
  createdAt: string;
}
