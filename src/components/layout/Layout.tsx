import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Calendar, 
  Menu, 
  X, 
  User as UserIcon, 
  LogOut, 
  LayoutDashboard, 
  BookOpen, 
  Settings,
  Search,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { useApp } from '@/src/context/AppContext';
import { useNavigate } from 'react-router-dom';

interface NavItem {
  label: string;
  path: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Venues', path: '/venues' },
  { label: 'Services', path: '/services' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
  { label: 'FAQ', path: '/faq' },
];

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useApp();

  const handleSignOut = () => {
    setUser(null);
    setIsUserMenuOpen(false);
    setIsMenuOpen(false);
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img 
                src="https://storage.googleapis.com/test-media-ais-dev/avr6zxhqvpqodcrngx4mkl/shekeeladesigns@gmail.com/logo.png" 
                alt="Trincity College Limited" 
                className="h-12 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-slate-900 leading-none">Trincity College</span>
                <span className="text-[10px] font-bold tracking-widest text-brand uppercase">Booking Platform</span>
              </div>
            </Link>
            
            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <Link 
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    location.pathname === item.path ? "text-brand" : "text-slate-600 hover:text-brand"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="h-6 w-px bg-slate-200 mx-2" />
              
              {user ? (
                <div className="relative">
                    <button 
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-8 h-8 bg-brand/10 rounded-full flex items-center justify-center text-brand font-bold text-xs">
                        {user.firstName[0]}{user.lastName[0]}
                      </div>
                      <span className="text-sm font-medium text-slate-700">{user.firstName}</span>
                    </button>
                  
                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 p-2 overflow-hidden"
                      >
                        <Link to="/dashboard" className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                          <LayoutDashboard className="w-4 h-4" /> Dashboard
                        </Link>
                        <Link to="/my-bookings" className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                          <BookOpen className="w-4 h-4" /> My Bookings
                        </Link>
                        <Link to="/profile" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                          <Settings className="w-4 h-4" /> Profile Settings
                        </Link>
                        {user.isAdmin && (
                          <Link to="/admin/users" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                            <ShieldCheck className="w-4 h-4" /> Admin Manager
                          </Link>
                        )}
                        <div className="h-px bg-slate-100 my-1" />
                        <button 
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-brand">Sign In</Link>
                  <Link to="/register" className="btn-primary py-2 px-6 text-sm">Register</Link>
                </div>
              )}
            </nav>

            {/* Mobile Toggle */}
            <button 
              className="lg:hidden p-2 text-slate-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-b border-slate-100 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                {NAV_ITEMS.map((item) => (
                  <Link 
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-lg font-medium text-slate-900"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="h-px bg-slate-100 my-4" />
                {user ? (
                  <>
                    <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium text-slate-900">Dashboard</Link>
                    <Link to="/my-bookings" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium text-slate-900">My Bookings</Link>
                    <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium text-slate-900">Profile Settings</Link>
                    {user.isAdmin && (
                      <Link to="/admin/users" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium text-slate-900">Admin Manager</Link>
                    )}
                    <button onClick={handleSignOut} className="w-full text-left text-lg font-medium text-red-600">Sign Out</button>
                  </>
                ) : (
                  <div className="space-y-4">
                    <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium text-slate-900">Sign In</Link>
                    <Link to="/register" onClick={() => setIsMenuOpen(false)} className="w-full btn-primary block text-center">Register</Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <img 
                  src="https://storage.googleapis.com/test-media-ais-dev/avr6zxhqvpqodcrngx4mkl/shekeeladesigns@gmail.com/logo.png" 
                  alt="Trincity College Limited" 
                  className="h-10 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
                <span className="text-xl font-bold tracking-tight text-slate-900">Trincity College</span>
              </div>
              <p className="text-slate-500 leading-relaxed">
                Empowering education through accessible and modern venue management solutions.
              </p>
              <div className="flex gap-4">
                <a href="#" className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-brand transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-brand transition-colors"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-brand transition-colors"><Facebook className="w-5 h-5" /></a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-6">Venues</h4>
              <ul className="space-y-4 text-slate-500">
                <li><Link to="/venues/indoor" className="hover:text-brand transition-colors">Indoor Venues</Link></li>
                <li><Link to="/venues/outdoor" className="hover:text-brand transition-colors">Outdoor Listings</Link></li>
                <li><Link to="/venues/classrooms" className="hover:text-brand transition-colors">Classrooms & Labs</Link></li>
                <li><Link to="/venues/special" className="hover:text-brand transition-colors">Special Rooms</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-6">Contact Us</h4>
              <ul className="space-y-4 text-slate-500">
                <li className="flex items-center gap-3"><MapPin className="w-4 h-4 text-brand" /> Trincity, Trinidad & Tobago</li>
                <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-brand" /> +1 (868) 000-0000</li>
                <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-brand" /> info@trincitycollege.edu</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-6">Support</h4>
              <ul className="space-y-4 text-slate-500">
                <li><Link to="/faq" className="hover:text-brand transition-colors">FAQ</Link></li>
                <li><Link to="/contact" className="hover:text-brand transition-colors">Contact Support</Link></li>
                <li><Link to="/about" className="hover:text-brand transition-colors">About Us</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
            <p>© 2026 Trincity College Limited. All rights reserved.</p>
            <div className="flex gap-8">
              <Link to="/privacy" className="hover:text-brand transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-brand transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
