import React, { createContext, useContext, useState, useEffect } from 'react';
import { Booking, BookingStatus, AccountType, VerificationStatus, User } from '../types';

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  bookings: Booking[];
  setBookings: (bookings: Booking[]) => void;
  addBooking: (booking: Booking) => void;
  updateBookingStatus: (id: string, status: BookingStatus) => void;
  isAuthReady: boolean;
  users: User[];
  setUsers: (users: User[]) => void;
  updateUserStatus: (id: string, status: VerificationStatus, role: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    // Simulate auth check
    const savedUser = localStorage.getItem('trincity_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    // Load mock bookings
    const savedBookings = localStorage.getItem('trincity_bookings');
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    } else {
      const mockBookings: Booking[] = [
        {
          id: 'BK-1001',
          venueId: '1',
          userId: 'user-1',
          date: '2026-10-12',
          status: BookingStatus.CONFIRMED,
          totalPrice: 7227.75,
          addOns: [],
          createdAt: new Date().toISOString()
        },
        {
          id: 'BK-1002',
          venueId: '2',
          userId: 'user-1',
          date: '2026-10-15',
          status: BookingStatus.PENDING,
          totalPrice: 7955.25,
          addOns: [],
          createdAt: new Date().toISOString()
        }
      ];
      setBookings(mockBookings);
      localStorage.setItem('trincity_bookings', JSON.stringify(mockBookings));
    }

    // Load mock users
    const savedUsers = localStorage.getItem('trincity_users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      const mockUsers: User[] = [
        {
          id: 'user-1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          phone: '123-456-7890',
          accountType: AccountType.PUBLIC,
          verifiedRole: 'Public',
          verificationStatus: VerificationStatus.ACTIVE,
          createdAt: new Date().toISOString()
        },
        {
          id: 'admin-1',
          firstName: 'Admin',
          lastName: 'User',
          email: 'admin@trincity.edu',
          phone: '123-456-7891',
          accountType: AccountType.STAFF,
          verifiedRole: 'Verified Staff',
          verificationStatus: VerificationStatus.ACTIVE,
          createdAt: new Date().toISOString(),
          isAdmin: true
        }
      ];
      setUsers(mockUsers);
      localStorage.setItem('trincity_users', JSON.stringify(mockUsers));
    }
    
    setIsAuthReady(true);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('trincity_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('trincity_user');
    }
  }, [user]);

  const addBooking = (booking: Booking) => {
    const newBookings = [...bookings, booking];
    setBookings(newBookings);
    localStorage.setItem('trincity_bookings', JSON.stringify(newBookings));
  };

  const updateBookingStatus = (id: string, status: BookingStatus) => {
    const newBookings = bookings.map(b => b.id === id ? { ...b, status } : b);
    setBookings(newBookings);
    localStorage.setItem('trincity_bookings', JSON.stringify(newBookings));
  };

  const updateUserStatus = (id: string, status: VerificationStatus, role: string) => {
    const newUsers = users.map(u => u.id === id ? { ...u, verificationStatus: status, verifiedRole: role } : u);
    setUsers(newUsers);
    localStorage.setItem('trincity_users', JSON.stringify(newUsers));
    
    // If the updated user is the current user, update their state too
    if (user && user.id === id) {
      setUser({ ...user, verificationStatus: status, verifiedRole: role });
    }
  };

  return (
    <AppContext.Provider value={{ 
      user, 
      setUser, 
      bookings, 
      setBookings, 
      addBooking, 
      updateBookingStatus,
      isAuthReady,
      users,
      setUsers,
      updateUserStatus
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
