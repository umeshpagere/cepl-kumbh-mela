import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Camera, ExternalLink, Star, Users } from 'lucide-react';
import heroImage from '@/assets/hero-ramkund.jpg';
import trimbakeshwar from '@/assets/trimbakeshwar.jpeg';
import kalaram from '@/assets/kalaram.jpeg';
import panchavti from '@/assets/panchavti.jpeg';
import sita from '@/assets/sita.jpeg';
import tapovan from '@/assets/tapovan.jpeg';

// Add these imports for react-leaflet
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Locations = () => {
  const importantLocations = [
    {
      name: 'Ramkund',
      description: 'The most sacred bathing ghat where Lord Rama is believed to have bathed. Millions of devotees take holy dip here during Kumbh Mela.',
      image: heroImage,
      category: 'Sacred Ghat',
      visitingHours: '24 Hours',
      significance: 'Main bathing ghat for Kumbh Mela',
      crowdLevel: 'Very High',
      facilities: ['Changing Rooms', 'Security', 'Medical Aid', 'Prasad Shops'],
      lat: 19.9975,
      lng: 73.7898,
    },
    {
      name: 'Trimbakeshwar Temple',
      description: 'One of the twelve Jyotirlingas, this ancient Shiva temple is the source of river Godavari and holds immense religious significance.',
      image: trimbakeshwar,
      category: 'Temple',
      visitingHours: '5:30 AM - 9:00 PM',
      significance: 'One of 12 Jyotirlingas',
      crowdLevel: 'High',
      facilities: ['Darshan Queue', 'Prasad Counter', 'Shoe Stand', 'Wheelchair Access'],
      lat: 19.9406,
      lng: 73.5336,
    },
    {
      name: 'Kalaram Mandir',
      description: 'Historic black stone temple dedicated to Lord Rama, known for its beautiful architecture and spiritual atmosphere.',
      image: kalaram,
      category: 'Temple',
      visitingHours: '6:00 AM - 12:00 PM, 4:00 PM - 9:00 PM',
      significance: 'Historic Rama temple with black stone idol',
      crowdLevel: 'Medium',
      facilities: ['Aarti Hall', 'Library', 'Garden', 'Parking'],
      lat: 19.9978,
      lng: 73.7876,
    },
    {
      name: 'Panchvati',
      description: 'Sacred grove where Lord Rama, Sita, and Lakshmana spent their exile. The area has five ancient banyan trees.',
      image: panchavti,
      category: 'Sacred Grove',
      visitingHours: '6:00 AM - 7:00 PM',
      significance: "Rama's exile location with 5 sacred trees",
      crowdLevel: 'Medium',
      facilities: ['Garden', 'Seating Area', 'Refreshments', 'Guide Service'],
      lat: 19.9982,
      lng: 73.7860,
    },
    {
      name: 'Sita Gumpha',
      description: 'Cave where Sita is believed to have taken shelter. Located on Panchavati hills with beautiful views of the city.',
      image: sita,
      category: 'Cave Temple',
      visitingHours: '7:00 AM - 6:00 PM',
      significance: "Sita's shelter during exile",
      crowdLevel: 'Low',
      facilities: ['Trekking Path', 'Viewpoint', 'Small Temple', 'Water Facility'],
      lat: 19.9987,
      lng: 73.7855,
    },
    {
      name: 'Tapovan',
      description: 'Sacred meditation ground where saints and sages perform penance. Center for spiritual activities during Kumbh.',
      image: tapovan,
      category: 'Spiritual Center',
      visitingHours: '24 Hours',
      significance: 'Meditation and spiritual center',
      crowdLevel: 'High',
      facilities: ['Meditation Halls', 'Ashrams', 'Satsang Areas', 'Accommodation'],
      lat: 19.9910,
      lng: 73.8077,
    }
  ];

  const getCrowdLevelColor = (level: string) => {
    switch (level) {
      case 'Very High': return 'destructive';
      case 'High': return 'secondary';
      case 'Medium': return 'outline';
      case 'Low': return 'default';
      default: return 'outline';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Sacred Ghat': return <MapPin className="w-5 h-5" />;
      case 'Temple': return <Star className="w-5 h-5" />;
      case 'Sacred Grove': return <Users className="w-5 h-5" />;
      case 'Cave Temple': return <Camera className="w-5 h-5" />;
      case 'Spiritual Center': return <Users className="w-5 h-5" />;
      default: return <MapPin className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Sacred Locations & Temples
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore the most significant spiritual locations in Nashik. From ancient temples to sacred ghats, 
            discover the divine essence of each holy site.
          </p>
        </div>

        {/* Important Locations Grid */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {importantLocations.map((location, index) => (
              <Card 
                key={location.name}
                className="overflow-hidden shadow-card hover-lift bg-card/90 border-border/50"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Location Image */}
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={location.image} 
                    alt={location.name}
                    className="w-full h-full object-cover hover:scale-105 transition-smooth"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary/90 text-primary-foreground flex items-center gap-1">
                      {getCategoryIcon(location.category)}
                      {location.category}
                    </Badge>
                  </div>
                  
                  {/* Crowd Level Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge variant={getCrowdLevelColor(location.crowdLevel)}>
                      {location.crowdLevel} Crowd
                    </Badge>
                  </div>

                  {/* Location Name Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-display text-white text-2xl font-bold mb-1">
                      {location.name}
                    </h3>
                    <p className="text-white/90 text-sm">
                      {location.significance}
                    </p>
                  </div>
                </div>

                {/* Location Details */}
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {location.description}
                  </p>

                  {/* Visiting Hours */}
                  <div className="flex items-center mb-4 text-sm">
                    <Clock className="w-4 h-4 mr-2 text-primary" />
                    <span className="text-foreground font-medium">Visiting Hours: </span>
                    <span className="text-muted-foreground ml-1">{location.visitingHours}</span>
                  </div>

                  {/* Facilities */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-foreground mb-2 text-sm">Available Facilities:</h4>
                    <div className="flex flex-wrap gap-2">
                      {location.facilities.map((facility, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {facility}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button size="sm" className="w-full flex items-center justify-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        Get Directions
                      </Button>
                    </a>
                    <a
                      href="/gallery"
                      className="flex-1"
                    >
                      <Button size="sm" variant="outline" className="w-full flex items-center justify-center">
                        <Camera className="w-4 h-4 mr-2" />
                        View Gallery
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Map Section */}
        <section className="mb-16">
          <Card className="shadow-card bg-card/90 border-border/50">
            <CardHeader>
              <CardTitle className="font-display text-2xl text-center flex items-center justify-center gap-2">
                <MapPin className="w-6 h-6 text-primary" />
                Interactive Location Map
              </CardTitle>
              <CardDescription className="text-center">
                Explore all sacred locations on an interactive map with real-time directions and crowd updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted/30 rounded-lg flex items-center justify-center mb-6" style={{ height: 500 }}>
                <MapContainer
                  center={[19.9975, 73.7898]}
                  zoom={13}
                  style={{ width: '80vw', height: '500px', borderRadius: 12 }} // Change height here
                  scrollWheelZoom={true}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
                  />
                  {importantLocations.map((loc) => (
                    <Marker key={loc.name} position={[loc.lat, loc.lng]}>
                      <Popup>
                        <strong>{loc.name}</strong>
                        <br />
                        {loc.significance}
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
              
              
            </CardContent>
          </Card>
        </section>

        {/* Visiting Tips */}
        <section>
          <Card className="shadow-card bg-gradient-warm/10 border-primary/20">
            <CardHeader>
              <CardTitle className="font-display text-2xl text-center">
                Location Visiting Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Planning Your Visit</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      Start early morning to avoid crowds
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      Allow extra time during festival days
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      Check temple timings before visiting
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      Carry water bottle and comfortable shoes
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Cultural Etiquette</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      Dress modestly and remove shoes at temples
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      Follow photography restrictions at sacred sites
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      Maintain silence in meditation areas
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

export default Locations;