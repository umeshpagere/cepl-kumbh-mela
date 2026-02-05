import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plane, Train, Car, Bus, MapPin, Clock, IndianRupee, ExternalLink, ShoppingCart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { addBooking } from '@/utils/localStorage';
import transportData from '@/data/transportData.json';

const Travel = () => {
  const { toast } = useToast();
  const availableTransportRef = React.useRef<HTMLDivElement>(null);

  const sampleTrains = [
    { id: 1, name: 'Shatabdi Express', from: 'Mumbai', to: 'Nashik', price: 1500, availability: 'Available' },
    { id: 2, name: 'Garib Rath', from: 'Delhi', to: 'Nashik', price: 2000, availability: 'Available' },
    { id: 3, name: 'Duronto Express', from: 'Pune', to: 'Nashik', price: 1200, availability: 'Available' }
  ];

  const handleBookTransport = (item: any, mode: string) => {
    addBooking({
      id: item.id,
      type: 'transport',
      category: mode,
      name: item.name || `${item.from} to ${item.to}`,
      price: item.price,
      details: item,
      quantity: 1
    });

    toast({
      title: "Added to Cart!",
      description: `${item.name || `${item.from} to ${item.to}`} has been added to your bookings.`,
    });
  };

  const transportModes = [
    {
      icon: Train,
      title: 'By Train',
      description: 'Most convenient and popular option',
      details: [
        'Nashik Road Railway Station - Main station (8 km from city center)',
        'Direct trains from Mumbai (3-4 hours), Pune (4-5 hours), Delhi (15-16 hours)',
        'Local trains every 30 minutes to city center',
        'Pre-book tickets during Kumbh period'
      ],
      tips: 'Book tickets 120 days in advance. Use Tatkal booking for last-minute travel.'
    },
    {
      icon: Car,
      title: 'By Road',
      description: 'Flexible timing and route options',
      details: [
        'Mumbai to Nashik: 165 km via NH-160 (3-4 hours)',
        'Pune to Nashik: 210 km via NH-50 (4-5 hours)',
        'Well-maintained highways with rest stops',
        'Multiple state transport buses available'
      ],
      tips: 'Avoid peak hours. Keep sufficient fuel and carry emergency kit.'
    },
    {
      icon: Plane,
      title: 'By Air',
      description: 'Fastest option for long distances',
      details: [
        'Ozar Airport - 25 km from Nashik city',
        'Regular flights from Mumbai, Delhi, Bangalore',
        'Taxi/bus services to city center available',
        'Limited flights during Kumbh - book early'
      ],
      tips: 'Airport gets crowded during Kumbh. Pre-arrange ground transport.'
    }
  ];

  const intraCityTransport = [
    {
      mode: 'Auto Rickshaw',
      fare: '₹10-15/km',
      description: 'Most common for short distances',
      availability: 'High'
    },
    {
      mode: 'City Bus',
      fare: '₹8-20',
      description: 'MSRTC buses cover major areas',
      availability: 'Good'
    },
    {
      mode: 'Taxi/Cab',
      fare: '₹12-18/km',
      description: 'Ola/Uber available, pre-paid taxis',
      availability: 'Medium'
    },
    {
      mode: 'Walking',
      fare: 'Free',
      description: 'Many ghats within walking distance',
      availability: 'Always'
    }
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Travel to Nashik
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Complete guide to reach Nashik for Kumbh Mela with detailed transport options, 
            routes, and helpful travel tips for your spiritual journey.
          </p>
        </div>

        {/* How to Reach Section */}
        <section className="mb-16">
          <h2 className="font-display text-3xl font-bold text-foreground mb-8 text-center">
            How to Reach Nashik
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {transportModes.map((transport, index) => {
              const Icon = transport.icon;
              return (
                <Card 
                  key={transport.title}
                  className="shadow-card hover-lift border-border/50 bg-card/90 cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => {
                    if (transport.title === 'By Road') {
                      window.open('https://www.google.com/maps/dir/?api=1&destination=Nashik,Maharashtra', '_blank');
                    } else {
                      availableTransportRef.current?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="font-display text-xl">{transport.title}</CardTitle>
                    <CardDescription>{transport.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      {transport.details.map((detail, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                    
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <p className="text-sm text-foreground">
                        <strong>Pro Tip:</strong> {transport.tips}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Intra-City Transport */}
        <section className="mb-16">
          <h2 className="font-display text-3xl font-bold text-foreground mb-8 text-center">
            Getting Around Nashik
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {intraCityTransport.map((transport, index) => (
              <Card 
                key={transport.mode}
                className="shadow-card hover-lift bg-card/90 border-border/50"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold text-lg text-foreground mb-2">
                    {transport.mode}
                  </h3>
                  
                  <div className="mb-3">
                    <Badge variant="secondary" className="text-lg font-semibold">
                      {transport.fare}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {transport.description}
                  </p>
                  
                  <div className="flex items-center justify-center space-x-1">
                    <span className="text-xs text-muted-foreground">Availability:</span>
                    <Badge 
                      variant={transport.availability === 'High' ? 'default' : 
                              transport.availability === 'Good' ? 'secondary' : 'outline'}
                      className="text-xs"
                    >
                      {transport.availability}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Available Transport Options */}
        <section className="mb-16">
          <div ref={availableTransportRef}>
            <h2 className="font-display text-3xl font-bold text-foreground mb-8 text-center">
              Book Your Transport
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Trains */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Train className="w-5 h-5 text-primary" />
                  Available Trains
                </h3>

                {sampleTrains.map((train) => (
                  <Card key={train.id} className="shadow-card hover-lift bg-card/90">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{train.name}</h4>
                        <Badge variant={train.availability === 'Available' ? 'default' : 'secondary'}>
                          {train.availability}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {train.from} → {train.to}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-primary">₹{train.price}</span>
                        <Button 
                          size="sm" 
                          onClick={() => handleBookTransport(train, 'train')}
                          disabled={train.availability === 'Waiting List'}
                        >
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          Book
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Flights */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Plane className="w-5 h-5 text-primary" />
                  Available Flights
                </h3>
                {transportData.flights.map((flight) => (
                  <Card key={flight.id} className="shadow-card hover-lift bg-card/90">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{flight.airline}</h4>
                        <Badge variant={flight.availability === 'Available' ? 'default' : 'secondary'}>
                          {flight.availability}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {flight.from} → {flight.to}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-primary">₹{flight.price}</span>
                        <Button 
                          size="sm" 
                          onClick={() => handleBookTransport(flight, 'flight')}
                        >
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          Book
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Buses */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Bus className="w-5 h-5 text-primary" />
                  Available Buses
                </h3>
                {transportData.buses.map((bus) => (
                  <Card key={bus.id} className="shadow-card hover-lift bg-card/90">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{bus.operator}</h4>
                        <Badge variant={bus.availability === 'Available' ? 'default' : 'secondary'}>
                          {bus.availability}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {bus.from} → {bus.to}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-primary">₹{bus.price}</span>
                        <Button 
                          size="sm" 
                          onClick={() => handleBookTransport(bus, 'bus')}
                        >
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          Book
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Maps Section */}
        <section className="mb-16">
          <h2 className="font-display text-3xl font-bold text-foreground mb-8 text-center">
            Location & Routes
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Main Location Map */}
            <Card className="shadow-card bg-card/90 border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-primary" />
                  Nashik Location
                </CardTitle>
                <CardDescription>
                  Strategic location in Maharashtra with excellent connectivity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className="aspect-video bg-muted/30 rounded-lg flex items-center justify-center mb-4"
                  style={{ height: 300, overflow: 'hidden' }}
                >
                  <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://maps.google.com/maps?q=Nashik,Maharashtra&z=12&output=embed"
                    title="Nashik Location Map"
                  ></iframe>
                </div>
                <Button className="w-full" variant="outline" asChild>
                  <a
                    href="https://www.google.com/maps/place/Nashik,+Maharashtra"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open in Google Maps
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Route Information */}
            <Card className="shadow-card bg-card/90 border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-primary" />
                  Travel Times
                </CardTitle>
                <CardDescription>
                  Estimated journey times from major cities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { city: 'Mumbai', time: '3-4 hours', distance: '165 km', mode: 'Car/Train' },
                    { city: 'Pune', time: '4-5 hours', distance: '210 km', mode: 'Car/Train' },
                    { city: 'Delhi', time: '15-16 hours', distance: '1,200 km', mode: 'Train' },
                    { city: 'Bangalore', time: '2.5 hours', distance: '850 km', mode: 'Flight' }
                  ].map((route, index) => (
                    <div key={route.city} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <h4 className="font-semibold text-foreground">{route.city}</h4>
                        <p className="text-sm text-muted-foreground">{route.mode}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary">{route.time}</p>
                        <p className="text-sm text-muted-foreground">{route.distance}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Important Tips */}
        <section>
          <Card className="shadow-card bg-gradient-warm/10 border-primary/20">
            <CardHeader>
              <CardTitle className="font-display text-2xl text-center">
                Important Travel Tips for Kumbh Mela
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Before You Travel</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      Book accommodation and transport well in advance
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      Carry sufficient cash as ATMs may run out
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      Keep copies of important documents
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      Pack light but carry essentials
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-3">During Your Stay</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      Follow crowd management guidelines
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      Stay hydrated and carry water bottles
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      Keep emergency contact numbers handy
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      Respect local customs and traditions
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

export default Travel;