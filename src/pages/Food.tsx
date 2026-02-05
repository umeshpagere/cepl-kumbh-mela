import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Clock, Utensils, Leaf, ExternalLink } from 'lucide-react';

import misalpav from '@/assets/misalpav.jpeg';
import pithalabhakari from '@/assets/pithalabhakari.jpeg';
import sabudana from '@/assets/sabudana.jpeg';
import bharli from '@/assets/bharli.jpeg';
import puranpoli from '@/assets/puranpoli.jpeg'; 
import mutton from '@/assets/mutton.jpeg';

const Food = () => {
  const localDishes = [
    {
      name: 'Misal Pav',
      description: 'Spicy curry made with sprouts, topped with onions, tomatoes and served with pav bread',
      image: misalpav,
      category: 'veg',
      spiceLevel: 'Hot'
    },
    {
      name: 'Pithla Bhakri',
      description: 'Traditional gram flour curry served with thick millet bread, a rural Maharashtra specialty',
      image: pithalabhakari,
      category: 'veg',
      spiceLevel: 'Medium'
    },
    {
      name: 'Sabudana Khichdi',
      description: 'Fasting-friendly dish made with tapioca pearls, peanuts, and potatoes',
      image: sabudana,
      category: 'veg',
      spiceLevel: 'Mild'
    },
    {
      name: 'Bharli Vangi',
      description: 'Stuffed baby eggplants cooked in spiced masala, a regional delicacy',
      image: bharli,
      category: 'veg',
      spiceLevel: 'Medium'
    },
    {
      name: 'Puran Poli',
      description: 'Sweet flatbread stuffed with jaggery and lentil filling, perfect festival dessert',
      image: puranpoli,
      category: 'veg',
      spiceLevel: 'Sweet'
    },
    {
      name: 'Mutton Curry',
      description: 'Traditional Maharashtrian goat curry with authentic spices and herbs',
      image: mutton,
      category: 'non-veg',
      spiceLevel: 'Hot'
    }
  ];

  const restaurants = [
    {
      name: 'Sadhana Restaurant',
      address: 'Near Ramkund, Panchavati',
      hours: '6:00 AM - 11:00 PM',
      specialty: 'Traditional Maharashtrian Thali',
      type: 'Pure Vegetarian',
      distance: '0.3 km',
      contact: '+91 253 2570123'
    },
    {
      name: 'Hotel Panchvati',
      address: 'MG Road, City Center',
      hours: '7:00 AM - 10:30 PM',
      specialty: 'North & South Indian',
      type: 'Vegetarian',
      distance: '1.2 km',
      contact: '+91 253 2571456'
    },
    {
      name: 'Annapurna Bhojanalaya',
      address: 'Tapovan Road',
      hours: '5:30 AM - 9:00 PM',
      specialty: 'Simple Vegetarian Meals',
      type: 'Pure Vegetarian',
      distance: '0.8 km',
      contact: '+91 253 2572789'
    },
    {
      name: 'Kailash Parbat',
      address: 'Mumbai Agra Road',
      hours: '11:00 AM - 11:00 PM',
      specialty: 'Chaat & Street Food',
      type: 'Vegetarian',
      distance: '2.1 km',
      contact: '+91 253 2573012'
    }
  ];

  const foodZones = [
    {
      name: 'Ramkund Food Street',
      description: 'Traditional street food and prasad stalls near the main ghat',
      specialties: ['Fresh Prasad', 'Sattu Drink', 'Seasonal Fruits', 'Holy Water'],
      timing: '4:00 AM - 10:00 PM'
    },
    {
      name: 'Panchavati Market',
      description: 'Local market with authentic Nashik food vendors and sweet shops',
      specialties: ['Misal Pav', 'Bhel Puri', 'Traditional Sweets', 'Fresh Juice'],
      timing: '6:00 AM - 9:00 PM'
    },
    {
      name: 'Tapovan Food Court',
      description: 'Organized food court with variety of regional cuisines',
      specialties: ['Multi-cuisine', 'Kumbh Special Thali', 'South Indian', 'Gujarati Thali'],
      timing: '7:00 AM - 11:00 PM'
    }
  ];

  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredDishes = categoryFilter === 'all' 
    ? localDishes 
    : localDishes.filter(dish => dish.category === categoryFilter);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Local Cuisine & Food Guide
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover authentic Maharashtrian flavors and find the best places to eat during your spiritual journey. 
            From traditional thalis to street food delights.
          </p>
        </div>

        {/* Local Dishes Section */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-display text-3xl font-bold text-foreground">
              Must-Try Local Dishes
            </h2>
            
            {/* Category Filter */}
            <Tabs value={categoryFilter} onValueChange={setCategoryFilter} className="w-auto">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="veg" className="flex items-center gap-2">
                  <Leaf className="w-4 h-4" />
                  Veg
                </TabsTrigger>
                <TabsTrigger value="non-veg">Non-Veg</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDishes.map((dish, index) => (
              <Card 
                key={dish.name}
                className="overflow-hidden shadow-card hover-lift bg-card/90 border-border/50"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-video bg-muted/30 flex items-center justify-center">
                  <div className="text-center">
                    <img
                    src={dish.image}
                     className="w-full h-full " />
                    <p className="text-sm text-muted-foreground">{dish.name}</p>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-display text-xl font-semibold text-foreground">
                      {dish.name}
                    </h3>
                    <div className="flex gap-2">
                      <Badge variant={dish.category === 'veg' ? 'secondary' : 'outline'}>
                        {dish.category === 'veg' ? (
                          <><Leaf className="w-3 h-3 mr-1" /> Veg</>
                        ) : 'Non-Veg'}
                      </Badge>
                      <Badge variant="outline">{dish.spiceLevel}</Badge>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-sm">
                    {dish.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Restaurants Section */}
        <section className="mb-16">
          <h2 className="font-display text-3xl font-bold text-foreground mb-8">
            Recommended Restaurants
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {restaurants.map((restaurant, index) => (
              <Card 
                key={restaurant.name}
                className="shadow-card hover-lift bg-card/90 border-border/50"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="font-display text-xl mb-1">
                        {restaurant.name}
                      </CardTitle>
                      <Badge variant="secondary" className="mb-2">
                        {restaurant.type}
                      </Badge>
                    </div>
                    <Badge variant="outline">
                      {restaurant.distance}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mt-0.5 mr-2 text-primary flex-shrink-0" />
                      <span>{restaurant.address}</span>
                    </div>

                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-2 text-primary" />
                      <span>{restaurant.hours}</span>
                    </div>

                    <div className="flex items-center text-sm text-muted-foreground">
                      <Utensils className="w-4 h-4 mr-2 text-primary" />
                      <span>Specialty: <strong>{restaurant.specialty}</strong></span>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="flex-1">
                        Call Now
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Directions
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Food Zones Section */}
        <section className="mb-16">
          <h2 className="font-display text-3xl font-bold text-foreground mb-8">
            Festival Food Zones
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {foodZones.map((zone, index) => (
              <Card 
                key={zone.name}
                className="shadow-card hover-lift bg-card/90 border-border/50"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <CardTitle className="font-display text-xl">
                    {zone.name}
                  </CardTitle>
                  <CardDescription>
                    {zone.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-sm text-foreground mb-2">Specialties:</h4>
                      <div className="flex flex-wrap gap-1">
                        {zone.specialties.map((specialty, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-2 text-primary" />
                      <span>{zone.timing}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Food Safety Tips */}
        <section>
          <Card className="shadow-card bg-gradient-warm/10 border-primary/20">
            <CardHeader>
              <CardTitle className="font-display text-2xl text-center">
                Food Safety & Dining Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Food Safety</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      Eat at busy, well-established places
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      Avoid ice and unfiltered water
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      Choose hot, freshly cooked food
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      Carry hand sanitizer and use it before eating
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Cultural Dining</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      Many places serve only vegetarian food during Kumbh
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      Try the local thali for complete meal experience
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      Accept prasad offerings with respect
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      Learn basic Marathi food terms for better communication
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

export default Food;