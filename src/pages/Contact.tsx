import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  AlertTriangle, 
  Heart,
  Shield,
  User,
  MessageSquare,
  Send
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [selectedLocation, setSelectedLocation] = useState<any>(null);

  const emergencyNumbers = [
    {
      service: 'Police Control Room',
      number: '100',
      description: 'For any law and order situation',
      icon: Shield,
      category: 'emergency'
    },
    {
      service: 'Ambulance / Medical Emergency',
      number: '108',
      description: 'Free emergency medical services',
      icon: Heart,
      category: 'emergency'
    },
    {
      service: 'Fire Brigade',
      number: '101',
      description: 'Fire emergencies and rescue operations',
      icon: AlertTriangle,
      category: 'emergency'
    },
    {
      service: 'Kumbh Mela Control Room',
      number: '+91 253 2550100',
      description: 'Official Kumbh Mela helpline',
      icon: Phone,
      category: 'help'
    },
    {
      service: 'Tourist Helpline',
      number: '1363',
      description: 'Maharashtra Tourism helpline',
      icon: Phone,
      category: 'help'
    },
    {
      service: 'Railway Enquiry',
      number: '139',
      description: 'Train information and booking',
      icon: Phone,
      category: 'help'
    }
  ];

  const importantLocations = [
    {
      name: 'District Hospital Nashik',
      address: 'District Hospital Nashik,Jail Road, Nashik - 422001',
      phone: '+91 253 2570445',
      distance: '2.5 km from Ramkund',
      lat: 19.9975,
      lng: 73.7898,
      type: 'hospital'
    },
    {
      name: 'Nashik Police Station',
      address: 'Nashik Police Station,Main Road, Panchavati, Nashik',
      phone: '+91 253 2570244',
      distance: '1.0 km from Ramkund',
      lat: 19.9982,
      lng: 73.7860,
      type: 'police'
    },
    {
      name: 'Post Office Panchavati',
      address: 'Post Office Panchavati,Panchavati Road, Nashik - 422003',
      phone: '+91 253 2572300',
      distance: '0.8 km from Ramkund',
      lat: 19.9978,
      lng: 73.7876,
      type: 'post'
    },
    {
      name: 'State Bank of India - Ramkund',
      address: 'State Bank of India - Ramkund,Ramkund Area, Panchavati',
      phone: '+91 253 2571800',
      distance: '0.3 km from Ramkund',
      lat: 19.9987,
      lng: 73.7855,
      type: 'bank'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend or form service
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Contact & Emergency Information
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get in touch with us for any queries about Kumbh Mela or find important emergency 
            contact numbers and locations for your safety and convenience.
          </p>
        </div>

        {/* Contact Form & Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Contact Form */}
          <Card className="shadow-card bg-card/90 border-border/50">
            <CardHeader>
              <CardTitle className="font-display text-2xl flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-primary" />
                Get in Touch
              </CardTitle>
              <CardDescription>
                Have questions about Kumbh Mela? Need help planning your visit? We're here to assist you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                action="https://formspree.io/f/meozdpjr" 
                method="POST"
                className="space-y-4"
              >
                <div>
                  <Label htmlFor="name" className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4" />
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="flex items-center gap-2 mb-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="subject" className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-4 h-4" />
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="What is your query about?"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-4 h-4" />
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Please describe your query or feedback in detail..."
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="shadow-card bg-card/90 border-border/50">
            <CardHeader>
              <CardTitle className="font-display text-2xl flex items-center gap-2">
                <Phone className="w-6 h-6 text-primary" />
                Contact Information
              </CardTitle>
              <CardDescription>
                Direct contact details and office hours for immediate assistance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-hero rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Email</h3>
                    <p className="text-muted-foreground">abc@gmail.com</p>
                    <p className="text-muted-foreground">support@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-hero rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Phone</h3>
                    <p className="text-muted-foreground">+91 xxxxxxxxx</p>
                    <p className="text-muted-foreground">+91 xxxxxxxxx (WhatsApp)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-hero rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Address</h3>
                    <p className="text-muted-foreground">
                      Kumbh Mela Information Center<br />
                      Ramkund Road, Panchavati<br />
                      Nashik - 422003, Maharashtra
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-hero rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Office Hours</h3>
                    <p className="text-muted-foreground">Monday - Sunday: 6:00 AM - 10:00 PM</p>
                    <p className="text-muted-foreground">During Kumbh: 24/7 Support</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Numbers */}
        <section className="mb-16">
          <h2 className="font-display text-3xl font-bold text-foreground mb-8 text-center">
            Emergency & Important Numbers
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {emergencyNumbers.map((emergency, index) => {
              const Icon = emergency.icon;
              return (
                <a
                  key={emergency.service}
                  href={`tel:${emergency.number.replace(/[^+\d]/g, '')}`}
                  style={{ textDecoration: 'none' }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Card
                    className={`shadow-card hover-lift border-border/50 cursor-pointer ${
                      emergency.category === 'emergency'
                        ? 'bg-gradient-to-br from-red-50/50 to-orange-50/50 border-red-200/50'
                        : 'bg-card/90'
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                          emergency.category === 'emergency'
                            ? 'bg-red-500'
                            : 'bg-gradient-hero'
                        }`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-foreground text-sm">
                              {emergency.service}
                            </h3>
                            {emergency.category === 'emergency' && (
                              <Badge variant="destructive" className="text-xs">
                                Emergency
                              </Badge>
                            )}
                          </div>
                          <div className="text-2xl font-bold text-primary mb-2">
                            {emergency.number}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {emergency.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              );
            })}
          </div>
        </section>

        {/* Important Locations */}
        <section className="mb-16">
          <h2 className="font-display text-3xl font-bold text-foreground mb-8 text-center">
            Important Locations Near Ramkund
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {importantLocations.map((location, index) => (
              <a
                key={location.name}
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <Card
                  className="shadow-card hover-lift bg-card/90 border-border/50 cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gradient-hero rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-2">
                          {location.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {location.address}
                        </p>
                        <div className="flex items-center justify-between">
                          {location.phone ? (
                            <a
                              href={`tel:${location.phone.replace(/[^+\d]/g, '')}`}
                              onClick={e => e.stopPropagation()}
                              className="text-sm text-primary font-medium underline"
                            >
                              {location.phone}
                            </a>
                          ) : (
                            <span />
                          )}
                          <Badge variant="outline" className="text-xs">
                            {location.distance}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </section>

        {/* Map Section */}
        <section>
          <Card className="shadow-card bg-card/90 border-border/50">
            <CardHeader>
              <CardTitle className="font-display text-2xl text-center flex items-center justify-center gap-2">
                <MapPin className="w-6 h-6 text-primary" />
                Location Map
              </CardTitle>
              <CardDescription className="text-center">
                Detailed map showing hospitals, police stations, banks, and other important facilities around Ramkund area
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="rounded-lg mb-6"
                style={{ width: '100%', height: 400, overflow: 'hidden' }}
              >
                <MapContainer
                  center={[19.9975, 73.7898]}
                  zoom={15}
                  style={{ width: '100%', height: '100%' }}
                  scrollWheelZoom={true}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
                  />
                  {importantLocations.map((loc) => (
                    <Marker
                      key={loc.name}
                      position={[loc.lat, loc.lng]}
                      eventHandlers={{
                        click: () => setSelectedLocation(loc),
                      }}
                    >
                      <Popup>
                        <strong>{loc.name}</strong><br />
                        {loc.address}<br />
                        {loc.phone && (
                          <>
                            <a href={`tel:${loc.phone.replace(/[^+\d]/g, '')}`}>{loc.phone}</a><br />
                          </>
                        )}
                        <span style={{ fontSize: '0.9em' }}>{loc.distance}</span>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  className="w-full"
                  asChild
                >
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Ramkund,Nashik"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Open in Google Maps
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  disabled={!selectedLocation}
                  asChild
                >
                  <a
                    href={
                      selectedLocation
                        ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(selectedLocation.address)}`
                        : "#"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Get Directions
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Contact;