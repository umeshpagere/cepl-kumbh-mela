import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Menu, X } from 'lucide-react';
import { getBookingCount } from '@/utils/localStorage';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [bookingCount, setBookingCount] = useState(0);
  const location = useLocation();

  // Update booking count when localStorage changes
  useEffect(() => {
    const updateBookingCount = () => {
      setBookingCount(getBookingCount());
    };

    updateBookingCount();
    
    // Listen for storage changes
    window.addEventListener('storage', updateBookingCount);
    
    // Also listen for custom events when bookings are modified
    const interval = setInterval(updateBookingCount, 1000);
    
    return () => {
      window.removeEventListener('storage', updateBookingCount);
      clearInterval(interval);
    };
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Travel', href: '/travel' },
    { name: 'Stay', href: '/stay' },
    { name: 'Food', href: '/food' },
    { name: 'Locations', href: '/locations' },
    { name: 'Aarti & Saints', href: '/aarti-saints' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'My Bookings', href: '/my-bookings' }
  ];

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-hero rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">ॐ</span>
              </div>
              <div className="font-display font-semibold text-lg text-foreground">
                Nashik Kumbh <span className="text-primary">2027</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${
                  location.pathname === item.href
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                {item.name}
                {item.name === 'My Bookings' && bookingCount > 0 && (
                  <Badge variant="destructive" className="text-xs px-1 min-w-5 h-5">
                    {bookingCount}
                  </Badge>
                )}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2"
            >
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-t border-border/40">
              <div className="space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center gap-2 ${
                      location.pathname === item.href
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                    {item.name === 'My Bookings' && bookingCount > 0 && (
                      <Badge variant="destructive" className="text-xs px-1 min-w-5 h-5">
                        {bookingCount}
                      </Badge>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;