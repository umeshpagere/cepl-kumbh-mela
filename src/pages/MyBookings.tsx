/**
 * My Bookings Page - Cart functionality for Kumbh Mela bookings
 * Displays all bookings, allows editing/removing, and handles checkout with Razorpay
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ShoppingCart, 
  Trash2, 
  Edit, 
  Plus, 
  Minus, 
  CreditCard,
  MapPin,
  Clock,
  Bed,
  Train,
  Calendar,
  CheckCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  getBookings, 
  removeBooking, 
  updateBookingQuantity, 
  getTotalAmount, 
  clearBookings,
  BookingItem 
} from '@/utils/localStorage';

// Razorpay types
declare global {
  interface Window {
    Razorpay: any;
  }
}

const MyBookings = () => {
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Load bookings on component mount
  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = () => {
    const currentBookings = getBookings();
    setBookings(currentBookings);
  };

  const handleRemoveBooking = (id: string, type: string) => {
    removeBooking(id, type);
    loadBookings();
    toast({
      title: "Item Removed",
      description: "Booking has been removed from your cart.",
    });
  };

  const handleQuantityChange = (id: string, type: string, newQuantity: number) => {
    updateBookingQuantity(id, type, newQuantity);
    loadBookings();
  };

  const getBookingIcon = (booking: BookingItem) => {
    if (booking.type === 'transport') {
      return <Train className="w-5 h-5" />;
    } else if (booking.type === 'accommodation') {
      return <Bed className="w-5 h-5" />;
    } else if (booking.type === 'aarti') {
      return <Calendar className="w-5 h-5" />;
    }
    return <ShoppingCart className="w-5 h-5" />;
  };

  const formatBookingDetails = (booking: BookingItem) => {
    if (booking.type === 'transport') {
      return `${booking.details.from} → ${booking.details.to} • ${booking.details.departure}`;
    } else if (booking.type === 'accommodation') {
      return `${booking.details.location} • ${booking.details.distance} from Ramkund`;
    } else if (booking.type === 'aarti') {
      return `${booking.details.location} • ${booking.details.time}`;
    }
    return 'Booking details';
  };

  // Initialize Razorpay payment
  const initiatePayment = async () => {
    setLoading(true);
    
    try {
      // In a real app, you'd call your backend to create an order
      const totalAmount = getTotalAmount();
      
      const options = {
        key: 'rzp_test_1234567890', // Test key - replace with actual key
        amount: totalAmount * 100, // Amount in paise
        currency: 'INR',
        name: 'Nashik Kumbh Mela 2027',
        description: 'Trip Booking Payment',
        image: '/favicon.ico',
        order_id: 'order_' + Date.now().toString(), // Generate order ID from backend
        handler: function (response: any) {
          handlePaymentSuccess(response);
        },
        prefill: {
          name: 'Devotee',
          email: 'devotee@example.com',
          contact: '9999999999'
        },
        notes: {
          booking_type: 'kumbh_trip'
        },
        theme: {
          color: '#f97316'
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on('payment.failed', function (response: any) {
        handlePaymentFailure(response);
      });
      
      razorpay.open();
    } catch (error) {
      console.error('Payment initialization failed:', error);
      toast({
        title: "Payment Error",
        description: "Failed to initialize payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = (response: any) => {
    const bookingId = 'KUMBH' + Date.now().toString().slice(-8);
    
    // Clear bookings after successful payment
    clearBookings();
    setBookings([]);
    
    toast({
      title: "Payment Successful! 🎉",
      description: `Your booking is confirmed. Booking ID: ${bookingId}`,
    });

    // In a real app, you'd redirect to confirmation page or show modal
    console.log('Payment successful:', response);
  };

  const handlePaymentFailure = (response: any) => {
    toast({
      title: "Payment Failed",
      description: "Payment could not be processed. Please try again.",
      variant: "destructive"
    });
    console.error('Payment failed:', response);
  };

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (bookings.length === 0) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              My Bookings
            </h1>
            <p className="text-lg text-muted-foreground">
              Your cart is empty. Start planning your Kumbh journey!
            </p>
          </div>

          {/* Empty State */}
          <Card className="shadow-card bg-card/90">
            <CardContent className="p-12 text-center">
              <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
                No Bookings Yet
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Start your sacred journey by adding transportation, accommodation, and aarti bookings to your cart.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <a href="/travel">Browse Transport</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/stay">Find Accommodation</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            My Bookings
          </h1>
          <p className="text-lg text-muted-foreground">
            Review and manage your Kumbh Mela trip bookings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Bookings List */}
          <div className="lg:col-span-2">
            <Card className="shadow-card bg-card/90">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Your Bookings ({bookings.length})
                </CardTitle>
                <CardDescription>
                  Manage your transportation, accommodation, and aarti bookings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings.map((booking, index) => (
                    <div key={`${booking.id}-${booking.type}`}>
                      <div className="flex items-start justify-between p-4 border border-border/50 rounded-lg">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                            {getBookingIcon(booking)}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-foreground">{booking.name}</h4>
                              <Badge variant="outline" className="text-xs">
                                {booking.category.replace('_', ' ')}
                              </Badge>
                            </div>
                            
                            <p className="text-sm text-muted-foreground mb-2">
                              {formatBookingDetails(booking)}
                            </p>
                            
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleQuantityChange(booking.id, booking.type, booking.quantity - 1)}
                                  disabled={booking.quantity <= 1}
                                >
                                  <Minus className="w-3 h-3" />
                                </Button>
                                <span className="text-sm font-medium min-w-8 text-center">
                                  {booking.quantity}
                                </span>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleQuantityChange(booking.id, booking.type, booking.quantity + 1)}
                                >
                                  <Plus className="w-3 h-3" />
                                </Button>
                              </div>
                              
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleRemoveBooking(booking.id, booking.type)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="font-semibold text-primary">
                              ₹{booking.price * booking.quantity}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              ₹{booking.price} × {booking.quantity}
                            </div>
                          </div>
                        </div>
                      </div>
                      {index < bookings.length - 1 && <Separator className="my-4" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="shadow-card bg-card/90 sticky top-8">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Booking breakdown */}
                  <div className="space-y-2">
                    {bookings.map((booking) => (
                      <div key={`${booking.id}-${booking.type}`} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {booking.name} × {booking.quantity}
                        </span>
                        <span>₹{booking.price * booking.quantity}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Separator />
                  
                  {/* Total */}
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg">Total Amount</span>
                    <span className="font-bold text-xl text-primary">₹{getTotalAmount()}</span>
                  </div>
                  
                  <Separator />
                  
                  {/* Checkout Button */}
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={initiatePayment}
                    disabled={loading}
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    {loading ? 'Processing...' : 'Proceed to Payment'}
                  </Button>
                  
                  <Button
                    className="w-full mt-2"
                    variant="destructive"
                    onClick={() => {
                      clearBookings();
                      setBookings([]);
                      toast({
                        title: "All Bookings Cancelled",
                        description: "Your cart has been cleared.",
                        variant: "destructive"
                      });
                    }}
                  >
                    <Trash2 className="w-5 h-5 mr-2" />
                    Cancel All Bookings
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    Secure payment powered by Razorpay
                  </p>
                  
                  {/* Continue Shopping */}
                  <div className="pt-4 border-t border-border/50">
                    <h4 className="font-medium mb-3">Continue Planning</h4>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                        <a href="/travel">
                          <Train className="w-4 h-4 mr-2" />
                          Add Transport
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                        <a href="/stay">
                          <Bed className="w-4 h-4 mr-2" />
                          Add Accommodation
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                        <a href="/aarti-saints">
                          <Calendar className="w-4 h-4 mr-2" />
                          Book Aarti
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Features */}
        <div className="mt-16">
          <Card className="shadow-card bg-gradient-warm/10 border-primary/20">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <CheckCircle className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold text-foreground mb-1">Secure Payments</h4>
                  <p className="text-sm text-muted-foreground">
                    Your payments are secured with bank-level encryption
                  </p>
                </div>
                <div>
                  <Calendar className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold text-foreground mb-1">Instant Confirmation</h4>
                  <p className="text-sm text-muted-foreground">
                    Get booking confirmations immediately after payment
                  </p>
                </div>
                <div>
                  <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold text-foreground mb-1">24/7 Support</h4>
                  <p className="text-sm text-muted-foreground">
                    Round-the-clock assistance for your spiritual journey
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;