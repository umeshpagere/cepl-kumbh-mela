import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Phone, Star, IndianRupee, Bed, Wifi, Car, Coffee, ShoppingCart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { addBooking } from '@/utils/localStorage';

const Stay = () => {
  const [budgetFilter, setBudgetFilter] = useState('all');
  const [distanceFilter, setDistanceFilter] = useState('all');
  const { toast } = useToast();

  const handleBookStay = (place: any) => {
    addBooking({
      id: `stay_${place.name.replace(/\s+/g, '_').toLowerCase()}`,
      type: 'accommodation',
      category: 'hotel',
      name: place.name,
      price: parseInt(place.priceRange.split('-')[0].replace(/[^\d]/g, '')),
      details: {
        ...place,
        location: place.address,
        distance: place.distance
      },
      quantity: 1
    });

    toast({
      title: "Added to Cart!",
      description: `${place.name} has been added to your bookings.`,
    });
  };

  const stayOptions = [
    {
      category: 'Budget Hotels',
      places: [
        {
          name: 'Hotel Panchavati',
          address: 'Panchavati Road, Near Ramkund',
          contact: '+91 253 2570800',
          priceRange: '₹800-1,500',
          distance: '0.5 km',
          amenities: ['Wifi', 'AC', 'Room Service'],
          rating: 3.8
        },
        {
          name: 'Hotel Raj Palace',
          address: 'MG Road, City Center',
          contact: '+91 253 2571200',
          priceRange: '₹1,000-2,000',
          distance: '1.2 km',
          amenities: ['Wifi', 'Restaurant', 'Parking'],
          rating: 4.0
        }
      ]
    },
    {
      category: 'Dharamshalas',
      places: [
        {
          name: 'Ramkund Dharamshala',
          address: 'Near Ramkund Ghat',
          contact: '+91 253 2570500',
          priceRange: '₹200-500',
          distance: '0.2 km',
          amenities: ['Basic Room', 'Common Bath', 'Prayer Hall'],
          rating: 3.5
        },
        {
          name: 'Ganga Bhavan Trust',
          address: 'Tapovan Road',
          contact: '+91 253 2572100',
          priceRange: '₹300-600',
          distance: '0.8 km',
          amenities: ['Dormitory', 'Meals', 'Library'],
          rating: 3.7
        }
      ]
    },
    {
      category: 'Premium Hotels',
      places: [
        {
          name: 'Hotel Sai Palace',
          address: 'Mumbai Highway, Nashik',
          contact: '+91 253 2573000',
          priceRange: '₹3,000-6,000',
          distance: '2.5 km',
          amenities: ['Pool', 'Spa', 'Multi-cuisine Restaurant', 'Conference Hall'],
          rating: 4.5
        },
        {
          name: 'Grand Tulip',
          address: 'Pathardi Phata, Nashik',
          contact: '+91 253 2574500',
          priceRange: '₹4,000-8,000',
          distance: '3.0 km',
          amenities: ['Luxury Rooms', 'Gym', 'Business Center', '24/7 Service'],
          rating: 4.7
        }
      ]
    }
  ];

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi': return <Wifi className="w-4 h-4" />;
      case 'parking': case 'car': return <Car className="w-4 h-4" />;
      case 'restaurant': case 'meals': return <Coffee className="w-4 h-4" />;
      default: return <Bed className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Accommodation Options
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find comfortable and affordable accommodation near sacred ghats and temples. 
            From budget-friendly dharamshalas to luxury hotels.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-4 justify-center">
          <Select value={budgetFilter} onValueChange={setBudgetFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by Budget" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Budgets</SelectItem>
              <SelectItem value="budget">Under ₹1,500</SelectItem>
              <SelectItem value="mid">₹1,500 - ₹3,000</SelectItem>
              <SelectItem value="premium">Above ₹3,000</SelectItem>
            </SelectContent>
          </Select>

          <Select value={distanceFilter} onValueChange={setDistanceFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by Distance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Distances</SelectItem>
              <SelectItem value="near">Under 1 km</SelectItem>
              <SelectItem value="moderate">1-2 km</SelectItem>
              <SelectItem value="far">Above 2 km</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stay Categories */}
        <div className="space-y-12">
          {stayOptions.map((category, categoryIndex) => (
            <section key={category.category}>
              <div className="mb-8">
                <h2 className="font-display text-3xl font-bold text-foreground mb-2">
                  {category.category}
                </h2>
                <div className="h-1 w-24 bg-gradient-hero rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {category.places.map((place, index) => (
                  <Card 
                    key={place.name}
                    className="shadow-card hover-lift bg-card/90 border-border/50"
                    style={{ animationDelay: `${(categoryIndex * 2 + index) * 0.1}s` }}
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="font-display text-xl mb-1">
                            {place.name}
                          </CardTitle>
                          <div className="flex items-center text-primary mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${
                                  i < Math.floor(place.rating) 
                                    ? 'fill-current' 
                                    : 'text-muted-foreground'
                                }`} 
                              />
                            ))}
                            <span className="ml-2 text-sm text-muted-foreground">
                              {place.rating}
                            </span>
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-lg font-semibold">
                          {place.priceRange}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-3">
                        {/* Address */}
                        <div className="flex items-start text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4 mt-0.5 mr-2 text-primary flex-shrink-0" />
                          <div>
                            <p>{place.address}</p>
                            <p className="text-primary font-medium">
                              {place.distance} from Ramkund
                            </p>
                          </div>
                        </div>

                        {/* Contact */}
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Phone className="w-4 h-4 mr-2 text-primary" />
                          <span>{place.contact}</span>
                        </div>

                        {/* Amenities */}
                        <div>
                          <p className="text-sm font-medium text-foreground mb-2">Amenities:</p>
                          <div className="flex flex-wrap gap-2">
                            {place.amenities.map((amenity, idx) => (
                              <Badge 
                                key={idx} 
                                variant="outline" 
                                className="text-xs flex items-center gap-1"
                              >
                                {getAmenityIcon(amenity)}
                                {amenity}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 pt-2">
                          <Button 
                            size="sm" 
                            className="flex-1"
                            onClick={() => handleBookStay(place)}
                          >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Book Stay
                          </Button>
                          <a
                            href={`tel:${place.contact.replace(/[^+\d]/g, '')}`}
                            className="flex-1"
                            style={{ textDecoration: 'none' }}
                          >
                            <Button size="sm" variant="outline" className="w-full">
                              <Phone className="w-4 h-4 mr-2" />
                              Contact
                            </Button>
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Booking Tips */}
        <section className="mt-16">
          <Card className="shadow-card bg-gradient-warm/10 border-primary/20">
            <CardHeader>
              <CardTitle className="font-display text-2xl text-center">
                Accommodation Booking Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Best Practices</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      Book 2-3 months in advance for better rates
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      Confirm booking 1 week before arrival
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      Check cancellation policy before booking
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      Keep advance payment receipts safe
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-3">What to Consider</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      Distance from main ghats and temples
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      Availability of parking (if traveling by car)
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      Basic amenities like hot water and clean bathrooms
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      Security and safety measures
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Stay;