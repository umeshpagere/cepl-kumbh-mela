
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import CountdownTimer from '@/components/CountdownTimer';
import BookingWizard from '@/components/BookingWizard';
import { 
  MapPin, 
  Bed, 
  Utensils, 
  Clock, 
  Users, 
  Camera, 
  ArrowRight,
  Calendar,
  Heart,
  Star,
  Luggage
} from 'lucide-react';
import heroImage from '@/assets/hero-ramkund.jpg';
import ramkund from '@/assets/ramkund.jpeg';
import trimbakeshwar from '@/assets/trimbakeshwar.jpeg';
import panchavati from '@/assets/panchavti.jpeg';


const Home = () => {
  const [isBookingWizardOpen, setIsBookingWizardOpen] = useState(false);

  // Highlight features for the main section
  const highlights = [
    {
      icon: MapPin,
      title: 'Travel Guidance',
      description: 'Complete transport info and routes',
      link: '/travel'
    },
    {
      icon: Bed,
      title: 'Stay Options',
      description: 'Hotels, dharamshalas & accommodations',
      link: '/stay'
    },
    {
      icon: Utensils,
      title: 'Local Cuisine',
      description: 'Traditional Maharashtrian delicacies',
      link: '/food'
    },
    {
      icon: Clock,
      title: 'Aarti Timings',
      description: 'Sacred ceremonies & schedules',
      link: '/aarti-saints'
    },
    {
      icon: Users,
      title: 'Saints & Akhadas',
      description: 'Spiritual leaders & their camps',
      link: '/aarti-saints'
    },
    {
      icon: Camera,
      title: 'Event Gallery',
      description: 'Capture the divine moments',
      link: '/gallery'
    }
  ];

  // Sample aarti timings preview
  const aartiPreview = [
    {
      name: 'Ramkund Morning Aarti',
      time: '5:30 AM',
      location: 'Ramkund Ghat'
    },
    {
      name: 'Trimbakeshwar Evening Aarti',
      time: '7:00 PM',
      location: 'Trimbakeshwar Temple'
    },
    {
      name: 'Kalaram Mandir Aarti',
      time: '8:00 PM',
      location: 'Kalaram Temple'
    }
  ];

  // Popular spiritual sites preview
  const spiritualSites = [
    {
      name: 'Ramkund',
      description: 'Most sacred bathing ghat where devotees take holy dip',
      image: ramkund, // Using the same hero image as placeholder
      link: '/locations'
    },
    {
      name: 'Trimbakeshwar',
      description: 'Ancient Shiva temple, one of 12 Jyotirlingas',
      image: trimbakeshwar,
      link: '/locations'
    },
    {
      name: 'Panchvati',
      description: 'Where Lord Rama spent 14 years in exile',
      image: panchavati,
      link: '/locations'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Hero Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/60"></div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
            Welcome to Nashik
            <span className="block text-secondary bg-gradient-warm bg-clip-text text-transparent">
              Kumbh Mela 2027
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-200 animate-slide-up font-light">
            Your complete guide to the world's largest spiritual gathering
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary-glow shadow-glow transition-smooth w-full sm:w-auto"
              onClick={() => setIsBookingWizardOpen(true)}
            >
              <Luggage className="w-5 h-5 mr-2" />
              Plan Your Journey
            </Button>
            <Link to="/aarti-saints">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-primary hover:bg-white hover:text-primary transition-smooth w-full sm:w-auto"
              >
                <Calendar className="w-5 h-5 mr-2" />
                See Schedule
              </Button>
            </Link>
          </div>
          
          {/* Countdown Timer */}
          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <CountdownTimer />
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 bg-background cultural-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need for the Sacred Journey
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover comprehensive information about travel, accommodation, food, and spiritual experiences
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <Link key={highlight.title} to={highlight.link}>
                  <Card 
                    className="hover-lift shadow-card border-border/50 bg-card/80 backdrop-blur-sm group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-glow transition-smooth">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="font-display text-xl">{highlight.title}</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        {highlight.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Aarti Timings Preview */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-display text-3xl font-bold text-foreground">
              Upcoming Aarti Timings
            </h2>
            <Link to="/aarti-saints">
              <Button variant="outline" className="group">
                View All
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-smooth" />
              </Button>
            </Link>
          </div>
          
          <div className="flex gap-6 overflow-x-auto pb-4">
            {aartiPreview.map((aarti, index) => (
              <Card 
                key={index}
                className="min-w-80 shadow-card bg-card/90 border-border/50 hover-lift"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg text-foreground">{aarti.name}</h3>
                    <div className="bg-primary/10 px-3 py-1 rounded-full">
                      <span className="text-primary font-semibold text-sm">{aarti.time}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {aarti.location}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Spiritual Sites */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-display text-3xl font-bold text-foreground">
              Sacred Locations
            </h2>
            <Link to="/locations">
              <Button variant="outline" className="group">
                Explore All
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-smooth" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {spiritualSites.map((site, index) => (
              <Link key={index} to={site.link}>
                <Card className="overflow-hidden hover-lift shadow-card group">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={site.image} 
                      alt={site.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <h3 className="font-display text-white text-xl font-semibold mb-1">
                        {site.name}
                      </h3>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground">{site.description}</p>
                    <div className="mt-4 flex items-center text-primary text-sm font-medium">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-smooth" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo & Description */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-hero rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">ॐ</span>
                </div>
                <div className="font-display font-semibold text-xl text-foreground">
                  Nashik Kumbh <span className="text-primary">2027</span>
                </div>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                Your comprehensive guide to the world's largest spiritual gathering. 
                Plan your sacred journey with complete travel, accommodation, and cultural information.
              </p>
              <div className="flex space-x-4">
                <Button variant="outline" size="sm" className="hover:bg-primary hover:text-primary-foreground">
                  <Heart className="w-4 h-4 mr-2" />
                  Follow
                </Button>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-lg mb-4 text-foreground">Quick Links</h3>
              <ul className="space-y-2">
                {['Travel', 'Stay', 'Food', 'Locations'].map((item) => (
                  <li key={item}>
                    <Link 
                      to={`/${item.toLowerCase()}`}
                      className="text-muted-foreground hover:text-primary transition-smooth"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Information */}
            <div>
              <h3 className="font-semibold text-lg mb-4 text-foreground">Information</h3>
              <ul className="space-y-2">
                {['Aarti & Saints', 'Gallery', 'About', 'Contact'].map((item) => (
                  <li key={item}>
                    <Link 
                      to={`/${item.toLowerCase().replace(' & ', '-')}`}
                      className="text-muted-foreground hover:text-primary transition-smooth"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border/50 mt-8 pt-8 text-center">
            <p className="text-muted-foreground">
              © 2024 Nashik Kumbh Guide. Made with devotion for spiritual seekers worldwide.
            </p>
          </div>
        </div>
      </footer>

      {/* Booking Wizard Modal */}
      <BookingWizard 
        isOpen={isBookingWizardOpen} 
        onClose={() => setIsBookingWizardOpen(false)} 
      />
    </div>
  );
};

export default Home;