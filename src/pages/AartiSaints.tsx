import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, MapPin, Users, Star, Calendar, Bell, ShoppingCart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { addBooking } from '@/utils/localStorage';
import heroImage from '@/assets/hero-ramkund.jpg';
import Jagadguru from '@/assets/jagadguru shankaracharya.jpeg';
import Chidanand from '@/assets/Swami-Chidanand.jpeg';
import babanirmal from '@/assets/nirmal-das.jpeg';
import morari from '@/assets/morari.jpeg';
import sadhavi from '@/assets/sadhavi.jpeg.webp';
import acharya from '@/assets/acharya.jpeg';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';


export
const AartiSaints = () => {
  const [timeFilter, setTimeFilter] = useState('all');
  const { toast } = useToast();

  const handleBookAarti = (aarti: any) => {
    addBooking({
      id: `aarti_${aarti.name.replace(/\s+/g, '_').toLowerCase()}`,
      type: 'aarti',
      category: 'aarti_booking',
      name: aarti.name,
      price: 100, // Fixed price for aarti booking
      details: aarti,
      quantity: 1
    });

    toast({
      title: "Aarti Booked!",
      description: `${aarti.name} has been added to your bookings.`,
    });
  };

  const handleSetReminder = (aarti: any) => {
    const title = encodeURIComponent(aarti.name);
    const location = encodeURIComponent(aarti.location || 'Nashik');
    const details = encodeURIComponent(aarti.significance || 'Aarti at Nashik Kumbh');

    // Parse time (assumes today's date, adjust as needed)
    const now = new Date();
    const [hours, minutes] = aarti.time.split(':');
    now.setHours(Number(hours), Number(minutes), 0, 0);

    // Format start and end time in YYYYMMDDTHHmmssZ (UTC) for Google Calendar
    const pad = (n: number) => n.toString().padStart(2, '0');
    const start = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}T${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}00Z`;

    // Duration in minutes (default 30 if not provided)
    const duration = parseInt(aarti.duration) || 30;
    const endDate = new Date(now.getTime() + duration * 60000);
    const end = `${endDate.getUTCFullYear()}${pad(endDate.getUTCMonth() + 1)}${pad(endDate.getUTCDate())}T${pad(endDate.getUTCHours())}${pad(endDate.getUTCMinutes())}00Z`;

    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
    window.open(url, '_blank');
  };

  const aartiTimings = [
    {
      name: 'Ramkund Mangal Aarti',
      location: 'Ramkund Ghat',
      time: '5:30 AM',
      duration: '30 minutes',
      significance: 'Morning prayers to welcome the day with divine blessings',
      category: 'morning',
      crowdLevel: 'High'
    },
    {
      name: 'Trimbakeshwar Morning Aarti',
      location: 'Trimbakeshwar Temple',
      time: '6:00 AM',
      duration: '45 minutes',
      significance: 'Sacred aarti at one of the 12 Jyotirlingas',
      category: 'morning',
      crowdLevel: 'Very High'
    },
    {
      name: 'Kalaram Mandir Madhyan Aarti',
      location: 'Kalaram Temple',
      time: '12:00 PM',
      duration: '20 minutes',
      significance: 'Midday offering to Lord Rama',
      category: 'afternoon',
      crowdLevel: 'Medium'
    },
    {
      name: 'Panchvati Sandhya Aarti',
      location: 'Panchvati Grove',
      time: '6:30 PM',
      duration: '25 minutes',
      significance: 'Evening prayers in the sacred grove',
      category: 'evening',
      crowdLevel: 'Medium'
    },
    {
      name: 'Ramkund Sandhya Aarti',
      location: 'Ramkund Ghat',
      time: '7:00 PM',
      duration: '40 minutes',
      significance: 'Main evening aarti with thousands of devotees',
      category: 'evening',
      crowdLevel: 'Very High'
    },
    {
      name: 'Trimbakeshwar Evening Aarti',
      location: 'Trimbakeshwar Temple',
      time: '7:30 PM',
      duration: '35 minutes',
      significance: 'Evening worship at the sacred Jyotirlinga',
      category: 'evening',
      crowdLevel: 'High'
    },
    {
      name: 'Kalaram Shayan Aarti',
      location: 'Kalaram Temple',
      time: '9:00 PM',
      duration: '15 minutes',
      significance: 'Night rest ceremony for Lord Rama',
      category: 'night',
      crowdLevel: 'Low'
    }
  ];

  const saints = [
    {
      name: 'Jagadguru Shankaracharya',
      akhada: 'Juna Akhada',
      campLocation: 'Tapovan Sector 1',
      origin: 'Dwarka, Gujarat',
      teachings: 'Advaita Vedanta and spiritual enlightenment',
      image: Jagadguru,
      followers: '500,000+',
      speciality: 'Vedic philosophy and meditation',
      lat: 19.9971,
      lng: 73.7865,
    },
    {
      name: 'Swami Chidanand Saraswati',
      akhada: 'Niranjani Akhada',
      campLocation: 'Ramkund Area',
      origin: 'Rishikesh, Uttarakhand',
      teachings: 'Environmental consciousness and Yoga',
      image: Chidanand,
      followers: '300,000+',
      speciality: 'Ganga conservation and spiritual healing',
      lat: 19.9965,
      lng: 73.7872,
    },
    {
      name: 'Baba Nirmal Das',
      akhada: 'Mahanirvani Akhada',
      campLocation: 'Panchvati Zone',
      origin: 'Ujjain, Madhya Pradesh',
      teachings: 'Bhakti and devotional practices',
      image: babanirmal,
      followers: '200,000+',
      speciality: 'Devotional singing and community service',
      lat: 19.9978,
      lng: 73.7859,
    },
    {
      name: 'Sant Morari Bapu',
      akhada: 'Independent Sant',
      campLocation: 'Tapovan Sector 2',
      origin: 'Gujarat',
      teachings: 'Ram Katha and moral values',
      image: morari,
      followers: '1,000,000+',
      speciality: 'Storytelling and social reform',
      lat: 19.9982,
      lng: 73.7868,
    },
    {
      name: 'Sadhvi Ritambhara',
      akhada: 'Niranjani Akhada',
      campLocation: 'Godavari Banks',
      origin: 'Himachal Pradesh',
      teachings: 'Women empowerment and dharma',
      image: sadhavi,
      followers: '400,000+',
      speciality: 'Social service and cultural preservation',
      lat: 19.9987,
      lng: 73.7855,
    },
    {
      name: 'Acharya Balkrishna',
      akhada: 'Independent',
      campLocation: 'Medical Camp Zone',
      origin: 'Haryana',
      teachings: 'Ayurveda and natural healing',
      image: acharya,
      followers: '250,000+',
      speciality: 'Herbal medicine and wellness',
      lat: 19.9910,
      lng: 73.8077,
    }
  ];

  const filteredAartis = timeFilter === 'all' 
    ? aartiTimings 
    : aartiTimings.filter(aarti => aarti.category === timeFilter);

  const getCrowdLevelColor = (level: string) => {
    switch (level) {
      case 'Very High': return 'destructive';
      case 'High': return 'secondary';
      case 'Medium': return 'outline';
      case 'Low': return 'default';
      default: return 'outline';
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Aarti Timings & Spiritual Saints
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join the divine celebrations with complete aarti schedules and meet the revered saints 
            who guide millions on their spiritual journey during Kumbh Mela.
          </p>
        </div>

        {/* Aarti Timings Section */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-display text-3xl font-bold text-foreground">
              Daily Aarti Schedule
            </h2>
            
            {/* Time Filter */}
            <Tabs value={timeFilter} onValueChange={setTimeFilter} className="w-auto">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="morning">Morning</TabsTrigger>
                <TabsTrigger value="evening">Evening</TabsTrigger>
                <TabsTrigger value="night">Night</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAartis.map((aarti, index) => (
              <Card 
                key={aarti.name}
                className="shadow-card hover-lift bg-card/90 border-border/50"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Bell className="w-5 h-5 text-primary" />
                        <Badge className="bg-primary text-primary-foreground font-semibold">
                          {aarti.time}
                        </Badge>
                      </div>
                      <CardTitle className="font-display text-lg mb-1">
                        {aarti.name}
                      </CardTitle>
                    </div>
                    <Badge variant={getCrowdLevelColor(aarti.crowdLevel)} className="text-xs">
                      {aarti.crowdLevel}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-2 text-primary" />
                      <span>{aarti.location}</span>
                    </div>

                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-2 text-primary" />
                      <span>Duration: {aarti.duration}</span>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {aarti.significance}
                    </p>

                    <div className="flex gap-2 mt-4">
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleBookAarti(aarti)}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Book Aarti
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => handleSetReminder(aarti)}
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Reminder
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Saints & Akhadas Section */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="font-display text-3xl font-bold text-foreground mb-2">
              Revered Saints & Spiritual Leaders
            </h2>
            <p className="text-muted-foreground">
              Meet the enlightened souls who will share their wisdom and blessings during the Kumbh Mela
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {saints.map((saint, index) => (
              <Card 
                key={saint.name}
                className="overflow-hidden shadow-card hover-lift bg-card/90 border-border/50"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="md:flex">
                  {/* Saint Image */}
                  <div className="md:w-1/3">
                    <div className="aspect-square relative overflow-hidden">
                      <img 
                        src={saint.image} 
                        alt={saint.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                  </div>

                  {/* Saint Details */}
                  <div className="md:w-2/3 p-6">
                    <div className="mb-4">
                      <h3 className="font-display text-xl font-bold text-foreground mb-2">
                        {saint.name}
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="secondary">{saint.akhada}</Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {saint.followers}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-start text-sm">
                        <MapPin className="w-4 h-4 mr-2 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-foreground font-medium">Camp: </span>
                          <span className="text-muted-foreground">{saint.campLocation}</span>
                        </div>
                      </div>

                      <div className="flex items-start text-sm">
                        <Star className="w-4 h-4 mr-2 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-foreground font-medium">Origin: </span>
                          <span className="text-muted-foreground">{saint.origin}</span>
                        </div>
                      </div>

                      <div className="text-sm">
                        <span className="text-foreground font-medium">Speciality: </span>
                        <span className="text-muted-foreground">{saint.speciality}</span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      <strong>Teachings:</strong> {saint.teachings}
                    </p>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <MapPin className="w-4 h-4 mr-2" />
                        Visit Camp
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Camp Locations Map */}
        <section className="mb-16">
          <Card className="shadow-card bg-card/90 border-border/50">
            <CardHeader>
              <CardTitle className="font-display text-2xl text-center flex items-center justify-center gap-2">
                <MapPin className="w-6 h-6 text-primary" />
                Saints Camp Locations
              </CardTitle>
              <CardDescription className="text-center">
                Interactive map showing locations of various Akhadas and saint camps
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="aspect-video bg-muted/30 rounded-lg flex items-center justify-center mb-6"
                style={{ height: 400, width: '100%', overflow: 'hidden' }}
              >
                <MapContainer
                  center={[19.9971, 73.7865] as LatLngExpression}
                  zoom={15}
                  style={{ width: '100%', height: '100%' }}
                  scrollWheelZoom={true}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution={'&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'}
                  />
                  {saints.map((saint) => (
                    <Marker key={saint.name} position={[saint.lat, saint.lng]}>
                      <Popup>
                        <strong>{saint.name}</strong><br />
                        Akhada: {saint.akhada}<br />
                        Camp: {saint.campLocation}<br />
                        <span style={{ fontSize: '0.9em' }}>{saint.speciality}</span>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
              
              
            </CardContent>
          </Card>
        </section>

        {/* Spiritual Guidelines */}
        <section>
          <Card className="shadow-card bg-gradient-warm/10 border-primary/20">
            <CardHeader>
              <CardTitle className="font-display text-2xl text-center">
                Spiritual Etiquette & Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">During Aarti</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      Arrive 15-20 minutes early for better position
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      Maintain silence and focus during prayers
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      Follow crowd management instructions
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      Carry minimal belongings for easy movement
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Meeting Saints</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      Approach with humility and respect
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      Wait patiently for darshan opportunities
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      Accept blessings with gratitude
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      Make donations if you wish, without pressure
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

export default AartiSaints;