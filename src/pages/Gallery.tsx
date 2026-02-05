import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Camera, Users, Calendar, Heart, Download, Share, ZoomIn } from 'lucide-react';
import image1 from '@/assets/image1.jpeg';
import image2 from '@/assets/image2.jpeg';
import image3 from '@/assets/image3.jpeg';
import image4 from '@/assets/image4.jpeg';
import image5 from '@/assets/image5.jpeg';
import image6 from '@/assets/image6.jpeg';
import image7 from '@/assets/image7.jpeg';
import image8 from '@/assets/image8.jpeg';
import image9 from '@/assets/image9.jpeg';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  // Sample gallery images - using the hero image as placeholder
  const galleryImages = [
    {
      id: 1,
      src: image1,
      title: 'Morning Aarti at Ramkund',
      category: 'aarti',
      description: 'Thousands gather for the sacred morning prayers at Ramkund ghat'
    },
    {
      id: 2,
      src: image2,
      title: 'Jagadguru Shankaracharya',
      category: 'saints',
      description: 'Spiritual leader blessing devotees at his camp'
    },
    {
      id: 3,
      src: image3,
      title: 'Shahi Snan Procession',
      category: 'processions',
      description: 'Magnificent procession of saints heading to the holy river'
    },
    {
      id: 4,
      src: image4,
      title: 'Devotees in Prayer',
      category: 'devotees',
      description: 'Pilgrims from across India participating in the spiritual gathering'
    },
    {
      id: 5,
      src: image5,
      title: 'Evening Aarti Ceremony',
      category: 'aarti',
      description: 'Beautiful evening prayers with oil lamps lighting the ghats'
    },
    {
      id: 6,
      src: image6,
      title: 'Naga Sadhus March',
      category: 'saints',
      description: 'Sacred procession of Naga sadhus during Kumbh festivities'
    },
    {
      id: 7,
      src: image7,
      title: 'Cultural Performance',
      category: 'processions',
      description: 'Traditional cultural programs showcasing Indian heritage'
    },
    {
      id: 8,
      src: image8,
      title: 'Families Taking Holy Dip',
      category: 'devotees',
      description: 'Multi-generational families experiencing the sacred bath together'
    },
    {
      id: 9,
      src: image9,
      title: 'Sunrise at Godavari',
      category: 'aarti',
      description: 'Breathtaking sunrise over the sacred Godavari river'
    }
  ];

  const [activeCategory, setActiveCategory] = useState('all');

  const filteredImages = activeCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  const categories = [
    { id: 'all', label: 'All Photos', icon: Camera },
    { id: 'aarti', label: 'Aarti Ceremonies', icon: Calendar },
    { id: 'saints', label: 'Saints & Gurus', icon: Users },
    { id: 'processions', label: 'Processions', icon: Calendar },
    { id: 'devotees', label: 'Devotees', icon: Heart }
  ];

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Kumbh Mela Gallery
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Witness the divine moments and spiritual experiences captured during the sacred gathering. 
            Browse through thousands of photos showcasing the essence of Kumbh Mela.
          </p>
        </div>

        {/* Category Tabs */}
        <section className="mb-8">
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto p-1">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="flex items-center gap-2 px-3 py-2 text-sm"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{category.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>
        </section>

        {/* Gallery Grid */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image, index) => (
              <Card 
                key={image.id}
                className="overflow-hidden shadow-card hover-lift bg-card/90 border-border/50 group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedImage(image.src)}
              >
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src={image.src} 
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="capitalize">
                      {image.category}
                    </Badge>
                  </div>

                  {/* Zoom Icon */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-smooth">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                      <ZoomIn className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Image Info */}
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-smooth">
                    <h3 className="font-display text-white text-lg font-semibold mb-1">
                      {image.title}
                    </h3>
                    <p className="text-white/90 text-sm">
                      {image.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Live Photo Feed Placeholder */}
        <section className="mb-16">
          <Card className="shadow-card bg-gradient-warm/10 border-primary/20">
            <CardContent className="p-8 text-center">
              <Camera className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                Live Photo Feed
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                During Kumbh Mela, this section will showcase real-time photos from devotees and 
                official photographers, updated every few minutes to capture the ongoing festivities.
              </p>
              <div className="flex justify-center gap-4">
                <Button onClick={() => fileInputRef.current?.click()}>
                  <Camera className="w-4 h-4 mr-2" />
                  Upload Photo
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = ev => {
                        setUploadedImages(prev => [ev.target?.result as string, ...prev]);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <Button variant="outline">
                  <Heart className="w-4 h-4 mr-2" />
                  Follow Updates
                </Button>
              </div>
              {/* Uploaded Image Previews */}
        {uploadedImages.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {uploadedImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Uploaded ${idx + 1}`}
                className="rounded shadow object-cover w-full h-40"
              />
            ))}
          </div>
        )}
            </CardContent>
          </Card>
        </section>

        {/* Photography Guidelines */}
        <section>
          <Card className="shadow-card bg-gradient-warm/10 border-primary/20">
            <CardContent className="p-8">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6 text-center">
                Photography Guidelines
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Respectful Photography</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      Always ask permission before photographing people
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      Avoid flash photography during ceremonies
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      Respect restricted areas and follow guidelines
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      Be mindful of cultural sensitivities
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Best Practices</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      Early morning and evening offer best lighting
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      Capture both grand scenes and intimate moments
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      Keep equipment secure in crowded areas
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      Share photos with proper attribution
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl max-h-full">
              <img 
                src={selectedImage} 
                alt="Selected image"
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              <Button
                variant="outline"
                size="sm"
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white/30"
                onClick={() => setSelectedImage(null)}
              >
                ✕
              </Button>
            </div>
          </div>
        )}

        
      </div>
    </div>
  );
};

export default Gallery;