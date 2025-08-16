/**
 * Multi-step booking wizard for Kumbh Mela trip planning
 * Handles transportation, accommodation, and booking confirmation
 */

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Train, 
  Plane, 
  Bus, 
  Car, 
  Bed, 
  CheckCircle, 
  ArrowLeft, 
  ArrowRight,
  MapPin,
  Clock,
  IndianRupee,
  Users
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { addBooking } from '@/utils/localStorage';
import transportData from '@/data/transportData.json';
import accommodationData from '@/data/accommodationData.json';

interface BookingWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Selection {
  departure?: any;
  accommodation?: any;
  return?: any;
}

export const BookingWizard: React.FC<BookingWizardProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selections, setSelections] = useState<Selection>({});
  const [selectedTransportMode, setSelectedTransportMode] = useState<string>('train');
  const [selectedAccommodationType, setSelectedAccommodationType] = useState<string>('hotels');
  const { toast } = useToast();

  const steps = [
    { id: 1, title: 'Departure Transport', description: 'Choose how to reach Nashik' },
    { id: 2, title: 'Accommodation', description: 'Select your stay option' },
    { id: 3, title: 'Return Transport', description: 'Choose return journey' },
    { id: 4, title: 'Review & Confirm', description: 'Review your selections' }
  ];

  const transportModes = [
    { id: 'train', label: 'Train', icon: Train, data: transportData.trains },
    { id: 'flight', label: 'Flight', icon: Plane, data: transportData.flights },
    { id: 'bus', label: 'Bus', icon: Bus, data: transportData.buses },
    { id: 'car', label: 'Car', icon: Car, data: [] } // Car will have different handling
  ];

  const accommodationTypes = [
    { id: 'camps', label: 'Camps', data: accommodationData.camps },
    { id: 'hotels', label: 'Hotels', data: accommodationData.hotels },
    { id: 'lodges', label: 'Lodges', data: accommodationData.lodges },
    { id: 'premiumStays', label: 'Premium Stays', data: accommodationData.premiumStays }
  ];

  const handleTransportSelection = (item: any) => {
    if (currentStep === 1) {
      setSelections(prev => ({ ...prev, departure: { ...item, mode: selectedTransportMode } }));
    } else if (currentStep === 3) {
      setSelections(prev => ({ ...prev, return: { ...item, mode: selectedTransportMode } }));
    }
    nextStep();
  };

  const handleAccommodationSelection = (item: any) => {
    setSelections(prev => ({ ...prev, accommodation: { ...item, type: selectedAccommodationType } }));
    nextStep();
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleConfirmBooking = () => {
    // Add all selections to cart
    if (selections.departure) {
      addBooking({
        id: selections.departure.id,
        type: 'transport',
        category: `departure_${selections.departure.mode}`,
        name: selections.departure.name || `${selections.departure.from} to ${selections.departure.to}`,
        price: selections.departure.price,
        details: selections.departure,
        quantity: 1
      });
    }

    if (selections.accommodation) {
      addBooking({
        id: selections.accommodation.id,
        type: 'accommodation',
        category: selections.accommodation.type,
        name: selections.accommodation.name,
        price: selections.accommodation.price,
        details: selections.accommodation,
        quantity: 1
      });
    }

    if (selections.return) {
      addBooking({
        id: selections.return.id,
        type: 'transport',
        category: `return_${selections.return.mode}`,
        name: selections.return.name || `${selections.return.from} to ${selections.return.to}`,
        price: selections.return.price,
        details: selections.return,
        quantity: 1
      });
    }

    toast({
      title: "Bookings Added to Cart!",
      description: "Your trip selections have been added to My Bookings.",
    });

    // Reset wizard
    setCurrentStep(1);
    setSelections({});
    onClose();
  };

  const getTotalPrice = () => {
    return (selections.departure?.price || 0) + 
           (selections.accommodation?.price || 0) + 
           (selections.return?.price || 0);
  };

  const renderTransportStep = (stepNumber: number) => {
    const currentTransportData = transportModes.find(mode => mode.id === selectedTransportMode)?.data || [];
    
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">
            {stepNumber === 1 ? 'Choose Departure Transport' : 'Choose Return Transport'}
          </h3>
          <p className="text-muted-foreground">
            Select your preferred mode of transportation
          </p>
        </div>

        <Tabs value={selectedTransportMode} onValueChange={setSelectedTransportMode}>
          <TabsList className="grid w-full grid-cols-4">
            {transportModes.map(mode => {
              const Icon = mode.icon;
              return (
                <TabsTrigger key={mode.id} value={mode.id} className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  {mode.label}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {transportModes.map(mode => (
            <TabsContent key={mode.id} value={mode.id}>
              {mode.id === 'car' ? (
                <Card>
                  <CardContent className="p-6 text-center">
                    <Car className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h4 className="font-semibold mb-2">Self Drive / Cab</h4>
                    <p className="text-muted-foreground mb-4">
                      Calculate route and estimated fare
                    </p>
                    <Button 
                      onClick={() => handleTransportSelection({
                        id: 'car_' + Date.now(),
                        name: 'Car Journey',
                        price: 2500,
                        from: 'Your Location',
                        to: 'Nashik'
                      })}
                    >
                      Select Car Option
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {currentTransportData.map((item: any) => (
                    <Card key={item.id} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-4 mb-2">
                              <h4 className="font-semibold">{item.name || item.airline}</h4>
                              <Badge variant={item.availability === 'Available' ? 'default' : 'secondary'}>
                                {item.availability}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {item.from} → {item.to}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {item.departure} - {item.arrival}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-semibold text-primary mb-2">
                              ₹{item.price}
                            </div>
                            <Button size="sm" onClick={() => handleTransportSelection(item)}>
                              Select
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    );
  };

  const renderAccommodationStep = () => {
    const currentAccommodationData = accommodationTypes.find(type => type.id === selectedAccommodationType)?.data || [];
    
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">Choose Accommodation</h3>
          <p className="text-muted-foreground">Select your preferred stay option near Ramkund</p>
        </div>

        <Tabs value={selectedAccommodationType} onValueChange={setSelectedAccommodationType}>
          <TabsList className="grid w-full grid-cols-4">
            {accommodationTypes.map(type => (
              <TabsTrigger key={type.id} value={type.id}>
                {type.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {accommodationTypes.map(type => (
            <TabsContent key={type.id} value={type.id}>
              <div className="grid gap-4">
                {currentAccommodationData.map((item: any) => (
                  <Card key={item.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <h4 className="font-semibold">{item.name}</h4>
                            <Badge variant="outline">{item.type}</Badge>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <div
                                  key={i}
                                  className={`w-3 h-3 rounded-full ${
                                    i < Math.floor(item.rating) ? 'bg-primary' : 'bg-muted'
                                  }`}
                                />
                              ))}
                              <span className="text-sm text-muted-foreground ml-1">
                                ({item.rating})
                              </span>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-2">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {item.location} • {item.distance} from Ramkund
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              Capacity: {item.capacity} persons
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {item.amenities.slice(0, 3).map((amenity: string, idx: number) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {amenity}
                              </Badge>
                            ))}
                            {item.amenities.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{item.amenities.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-primary mb-2">
                            ₹{item.price}/night
                          </div>
                          <Button size="sm" onClick={() => handleAccommodationSelection(item)}>
                            Select
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    );
  };

  const renderReviewStep = () => {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">Review Your Selections</h3>
          <p className="text-muted-foreground">Confirm your booking details before proceeding</p>
        </div>

        <div className="space-y-4">
          {selections.departure && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Train className="w-5 h-5" />
                  Departure Transport
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{selections.departure.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {selections.departure.from} → {selections.departure.to}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">₹{selections.departure.price}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {selections.accommodation && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bed className="w-5 h-5" />
                  Accommodation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{selections.accommodation.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {selections.accommodation.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">₹{selections.accommodation.price}/night</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {selections.return && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Train className="w-5 h-5" />
                  Return Transport
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{selections.return.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {selections.return.from} → {selections.return.to}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">₹{selections.return.price}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="bg-primary/5">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-lg">Total Amount</h4>
                <div className="text-2xl font-bold text-primary">₹{getTotalPrice()}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-4">
          <Button variant="outline" onClick={prevStep} className="flex-1">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button onClick={handleConfirmBooking} className="flex-1">
            <CheckCircle className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display">Plan Your Kumbh Journey</DialogTitle>
          <div className="space-y-2">
            <Progress value={(currentStep / 4) * 100} className="w-full" />
            <div className="flex justify-between text-sm text-muted-foreground">
              {steps.map(step => (
                <div key={step.id} className={`text-center ${currentStep === step.id ? 'text-primary font-medium' : ''}`}>
                  {step.title}
                </div>
              ))}
            </div>
          </div>
        </DialogHeader>

        <div className="mt-6">
          {currentStep === 1 && renderTransportStep(1)}
          {currentStep === 2 && renderAccommodationStep()}
          {currentStep === 3 && renderTransportStep(3)}
          {currentStep === 4 && renderReviewStep()}
        </div>

        {currentStep < 4 && (
          <div className="flex justify-between mt-6">
            <Button 
              variant="outline" 
              onClick={prevStep} 
              disabled={currentStep === 1}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button onClick={onClose} variant="ghost">
              Cancel
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingWizard;