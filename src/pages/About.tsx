import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Star, Clock } from 'lucide-react';
import heroImage from '@/assets/hero-ramkund.jpg';

const About = () => {
  const timelineEvents = [
    {
      year: '3102 BCE',
      title: 'Vedic Origins',
      description: 'First references to Kumbh Mela found in ancient Vedic texts and Puranas',
      significance: 'Mythological foundation'
    },
    {
      year: '629-645 CE',
      title: 'Historical Documentation',
      description: 'Chinese traveler Xuanzang documents the great religious gathering at Prayag',
      significance: 'First historical account'
    },
    {
      year: '1556',
      title: 'Akbar\'s Visit',
      description: 'Mughal Emperor Akbar witnesses and supports the Kumbh Mela traditions',
      significance: 'Royal recognition'
    },
    {
      year: '1760s',
      title: 'British Documentation',
      description: 'British colonial records begin systematic documentation of Kumbh Mela',
      significance: 'Modern documentation begins'
    },
    {
      year: '1954',
      title: 'Largest Gathering Record',
      description: 'Over 5 million people gather at Kumbh Mela, setting new records',
      significance: 'Milestone achievement'
    },
    {
      year: '2017',
      title: 'UNESCO Recognition',
      description: 'Kumbh Mela inscribed on UNESCO\'s Representative List of Intangible Cultural Heritage',
      significance: 'Global recognition'
    },
    {
      year: '2027',
      title: 'Upcoming Nashik Kumbh',
      description: 'Next Nashik Kumbh Mela expected to host over 100 million devotees',
      significance: 'Future celebration'
    }
  ];

  const culturalSignificance = [
    {
      title: 'Spiritual Purification',
      description: 'The holy bath in sacred rivers is believed to wash away sins and provide moksha (liberation)',
      icon: Star
    },
    {
      title: 'Cultural Unity',
      description: 'Brings together people from all walks of life, transcending social and economic boundaries',
      icon: Users
    },
    {
      title: 'Ancient Wisdom',
      description: 'Platform for sharing ancient knowledge, scriptures, and spiritual teachings',
      icon: Calendar
    },
    {
      title: 'Social Harmony',
      description: 'Promotes tolerance, understanding, and peaceful coexistence among diverse communities',
      icon: MapPin
    }
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            About Kumbh Mela
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the rich history, cultural significance, and spiritual essence of the world's largest 
            peaceful gathering. Learn about Nashik's special role in this ancient tradition.
          </p>
        </div>

        {/* Hero Section with Image */}
        <section className="mb-16">
          <Card className="overflow-hidden shadow-card bg-card/90 border-border/50">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img 
                  src={heroImage} 
                  alt="Kumbh Mela Heritage"
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                  The World's Largest Spiritual Gathering
                </h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Kumbh Mela is a major pilgrimage and festival in Hinduism, held every 12 years at four different 
                  locations in India: Prayagraj, Haridwar, Ujjain, and Nashik. The festival is marked by a ritual 
                  dip in holy rivers, believed to cleanse sins and provide spiritual liberation.
                </p>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  The Nashik Kumbh Mela, held on the banks of the sacred Godavari River, is particularly significant 
                  as it takes place in the holy city associated with Lord Rama's exile and numerous spiritual legends.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Badge className="bg-primary text-primary-foreground">UNESCO Heritage</Badge>
                  <Badge variant="secondary">100+ Million Visitors</Badge>
                  <Badge variant="outline">5000+ Years Old</Badge>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Cultural Significance */}
        <section className="mb-16">
          <h2 className="font-display text-3xl font-bold text-foreground mb-8 text-center">
            Cultural & Spiritual Significance
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {culturalSignificance.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card 
                  key={item.title}
                  className="shadow-card hover-lift bg-card/90 border-border/50"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="font-display text-xl">
                        {item.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Historical Timeline */}
        <section className="mb-16">
          <h2 className="font-display text-3xl font-bold text-foreground mb-8 text-center">
            Historical Timeline
          </h2>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-hero transform md:-translate-x-0.5"></div>
            
            <div className="space-y-8">
              {timelineEvents.map((event, index) => (
                <div 
                  key={event.year}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-primary rounded-full transform -translate-x-1/2 z-10">
                    <div className="w-full h-full bg-primary-glow rounded-full animate-pulse"></div>
                  </div>
                  
                  {/* Content Card */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${
                    index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                  }`}>
                    <Card className="shadow-card hover-lift bg-card/90 border-border/50">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <Badge className="bg-primary text-primary-foreground font-bold">
                            {event.year}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {event.significance}
                          </Badge>
                        </div>
                        <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                          {event.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {event.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Nashik's Special Role */}
        <section className="mb-16">
          <Card className="shadow-card bg-gradient-warm/10 border-primary/20">
            <CardContent className="p-8">
              <h2 className="font-display text-3xl font-bold text-foreground mb-6 text-center">
                Nashik's Sacred Legacy
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                    Mythological Significance
                  </h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      Associated with Lord Rama's 14-year exile period
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      Home to Trimbakeshwar, one of the 12 sacred Jyotirlingas
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      Source of the sacred Godavari River
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      Location where Surpanakha encountered Rama and Lakshmana
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                    Modern Importance
                  </h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      Major pilgrimage destination throughout the year
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      Well-developed infrastructure for large gatherings
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      Rich tradition of hospitability and service
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      Strategic location with excellent connectivity
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* About This Website */}
        <section>
          <Card className="shadow-card bg-card/90 border-border/50">
            <CardContent className="p-8">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6 text-center">
                About This Guide
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Community Driven</h3>
                  <p className="text-sm text-muted-foreground">
                    Built with input from devotees, local authorities, and spiritual organizations
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Real-time Updates</h3>
                  <p className="text-sm text-muted-foreground">
                    Continuously updated information to help pilgrims plan their spiritual journey
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Comprehensive Resource</h3>
                  <p className="text-sm text-muted-foreground">
                    Complete guide covering travel, accommodation, food, and spiritual experiences
                  </p>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-muted-foreground">
                  This website is dedicated to serving pilgrims and preserving the sacred traditions of Kumbh Mela. 
                  May your spiritual journey be blessed with divine grace and inner peace.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default About;