/**
 * Local Storage utilities for managing booking data
 * Handles storing and retrieving user bookings across sessions
 */

export interface BookingItem {
  id: string;
  type: 'transport' | 'accommodation' | 'aarti';
  category: string; // train, flight, bus, car, hotel, camp, etc.
  name: string;
  price: number;
  details: any; // Flexible object to store specific details
  quantity: number;
  addedAt: string;
}

const BOOKINGS_KEY = 'kumbh_bookings';

/**
 * Get all bookings from localStorage
 */
export const getBookings = (): BookingItem[] => {
  try {
    const bookings = localStorage.getItem(BOOKINGS_KEY);
    return bookings ? JSON.parse(bookings) : [];
  } catch (error) {
    console.error('Error reading bookings from localStorage:', error);
    return [];
  }
};

/**
 * Add a new booking item to localStorage
 */
export const addBooking = (booking: Omit<BookingItem, 'addedAt'>): void => {
  try {
    const bookings = getBookings();
    const newBooking: BookingItem = {
      ...booking,
      addedAt: new Date().toISOString()
    };
    
    // Check if item already exists, if so, increase quantity
    const existingIndex = bookings.findIndex(b => 
      b.id === booking.id && b.type === booking.type
    );
    
    if (existingIndex !== -1) {
      bookings[existingIndex].quantity += booking.quantity;
    } else {
      bookings.push(newBooking);
    }
    
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  } catch (error) {
    console.error('Error adding booking to localStorage:', error);
  }
};

/**
 * Remove a booking item from localStorage
 */
export const removeBooking = (id: string, type: string): void => {
  try {
    const bookings = getBookings();
    const updatedBookings = bookings.filter(b => !(b.id === id && b.type === type));
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updatedBookings));
  } catch (error) {
    console.error('Error removing booking from localStorage:', error);
  }
};

/**
 * Update booking quantity
 */
export const updateBookingQuantity = (id: string, type: string, quantity: number): void => {
  try {
    const bookings = getBookings();
    const bookingIndex = bookings.findIndex(b => b.id === id && b.type === type);
    
    if (bookingIndex !== -1) {
      if (quantity <= 0) {
        removeBooking(id, type);
      } else {
        bookings[bookingIndex].quantity = quantity;
        localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
      }
    }
  } catch (error) {
    console.error('Error updating booking quantity:', error);
  }
};

/**
 * Clear all bookings
 */
export const clearBookings = (): void => {
  try {
    localStorage.removeItem(BOOKINGS_KEY);
  } catch (error) {
    console.error('Error clearing bookings:', error);
  }
};

/**
 * Get total booking amount
 */
export const getTotalAmount = (): number => {
  const bookings = getBookings();
  return bookings.reduce((total, booking) => total + (booking.price * booking.quantity), 0);
};

/**
 * Get booking count
 */
export const getBookingCount = (): number => {
  const bookings = getBookings();
  return bookings.reduce((count, booking) => count + booking.quantity, 0);
};