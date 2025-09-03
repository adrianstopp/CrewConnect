import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { CATEGORIES, Activity } from '../types/activity';
import { ArrowLeft, MapPin, DollarSign, Users, Clock, Calendar, Plus, X } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface AddActivityFormProps {
  onSubmit: (activity: Omit<Activity, 'id' | 'organizationId' | 'organizationName' | 'isApproved'>) => void;
  onCancel: () => void;
  organizationCity: string;
  organizationState: string;
}

export function AddActivityForm({ onSubmit, onCancel, organizationCity, organizationState }: AddActivityFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    shortDescription: '',
    category: '',
    duration: '',
    groupSize: '',
    price: '',
    location: '',
    city: organizationCity,
    state: organizationState,
    imageUrl: '',
    highlights: [''],
    included: [''],
    availableDates: [''],
    availableTimes: ['']
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: 'highlights' | 'included' | 'availableDates' | 'availableTimes', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field: 'highlights' | 'included' | 'availableDates' | 'availableTimes') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field: 'highlights' | 'included' | 'availableDates' | 'availableTimes', index: number) => {
    if (formData[field].length > 1) {
      setFormData(prev => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.title || !formData.description || !formData.category || !formData.price) {
      toast.error('Please fill in all required fields.');
      return;
    }

    // Clean up array fields
    const cleanedData = {
      ...formData,
      highlights: formData.highlights.filter(item => item.trim() !== ''),
      included: formData.included.filter(item => item.trim() !== ''),
      availableDates: formData.availableDates.filter(item => item.trim() !== ''),
      availableTimes: formData.availableTimes.filter(item => item.trim() !== '')
    };

    if (cleanedData.highlights.length === 0 || cleanedData.included.length === 0) {
      toast.error('Please add at least one highlight and one included item.');
      return;
    }

    if (cleanedData.availableDates.length === 0 || cleanedData.availableTimes.length === 0) {
      toast.error('Please add at least one available date and time.');
      return;
    }

    // Mock coordinates for the city/state
    const mockCoordinates = {
      lat: 37.7749 + (Math.random() - 0.5) * 0.1,
      lng: -122.4194 + (Math.random() - 0.5) * 0.1
    };

    const activity: Omit<Activity, 'id' | 'organizationId' | 'organizationName' | 'isApproved'> = {
      title: cleanedData.title,
      description: cleanedData.description,
      shortDescription: cleanedData.shortDescription,
      category: cleanedData.category,
      duration: cleanedData.duration,
      groupSize: cleanedData.groupSize,
      price: parseFloat(cleanedData.price),
      rating: 4.5, // Default rating for new activities
      reviewCount: 0,
      imageUrl: cleanedData.imageUrl || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwYWN0aXZpdHklMjBncm91cHxlbnwxfHx8fDE3NTY5MDAzMTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      location: cleanedData.location,
      city: cleanedData.city,
      state: cleanedData.state,
      coordinates: mockCoordinates,
      highlights: cleanedData.highlights,
      included: cleanedData.included,
      availableDates: cleanedData.availableDates,
      availableTimes: cleanedData.availableTimes
    };

    onSubmit(activity);
    toast.success('Activity created successfully! It will be reviewed before going live.');
  };

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" onClick={onCancel} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-medium mb-2">Create New Activity</h1>
          <p className="text-muted-foreground">
            Add a new team activity to showcase on TeamConnect
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Tell us about your team activity</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Activity Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Interactive Team Building Challenge"
                      value={formData.title}
                      onChange={(e) => handleChange('title', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shortDescription">Short Description *</Label>
                    <Input
                      id="shortDescription"
                      placeholder="Brief one-line description for the activity card"
                      value={formData.shortDescription}
                      onChange={(e) => handleChange('shortDescription', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Full Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Provide a detailed description of your team activity..."
                      value={formData.description}
                      onChange={(e) => handleChange('description', e.target.value)}
                      rows={4}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {CATEGORIES.filter(cat => cat !== 'All').map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="imageUrl">Image URL</Label>
                      <Input
                        id="imageUrl"
                        placeholder="https://example.com/image.jpg (optional)"
                        value={formData.imageUrl}
                        onChange={(e) => handleChange('imageUrl', e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Activity Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Activity Details</CardTitle>
                  <CardDescription>Specify the logistics of your activity</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration *</Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="duration"
                          placeholder="e.g., 3 hours"
                          value={formData.duration}
                          onChange={(e) => handleChange('duration', e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="groupSize">Group Size *</Label>
                      <div className="relative">
                        <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="groupSize"
                          placeholder="e.g., 8-20 people"
                          value={formData.groupSize}
                          onChange={(e) => handleChange('groupSize', e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="price">Price per Person *</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="price"
                          type="number"
                          placeholder="75"
                          value={formData.price}
                          onChange={(e) => handleChange('price', e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Venue/Location *</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="location"
                          placeholder="e.g., Downtown Conference Center"
                          value={formData.location}
                          onChange={(e) => handleChange('location', e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleChange('city', e.target.value)}
                        disabled
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => handleChange('state', e.target.value)}
                        disabled
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Highlights */}
              <Card>
                <CardHeader>
                  <CardTitle>Activity Highlights</CardTitle>
                  <CardDescription>What makes your activity special?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formData.highlights.map((highlight, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder="e.g., Professional facilitation"
                        value={highlight}
                        onChange={(e) => handleArrayChange('highlights', index, e.target.value)}
                      />
                      {formData.highlights.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayItem('highlights', index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addArrayItem('highlights')}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Highlight
                  </Button>
                </CardContent>
              </Card>

              {/* What's Included */}
              <Card>
                <CardHeader>
                  <CardTitle>What's Included</CardTitle>
                  <CardDescription>List everything that's included in the activity</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formData.included.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder="e.g., Professional facilitator"
                        value={item}
                        onChange={(e) => handleArrayChange('included', index, e.target.value)}
                      />
                      {formData.included.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayItem('included', index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addArrayItem('included')}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Item
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Availability */}
              <Card>
                <CardHeader>
                  <CardTitle>Availability</CardTitle>
                  <CardDescription>When is this activity available?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Available Dates</Label>
                    {formData.availableDates.map((date, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          type="date"
                          value={date}
                          onChange={(e) => handleArrayChange('availableDates', index, e.target.value)}
                        />
                        {formData.availableDates.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeArrayItem('availableDates', index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addArrayItem('availableDates')}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Date
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label>Available Times</Label>
                    {formData.availableTimes.map((time, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          placeholder="e.g., 9:00 AM"
                          value={time}
                          onChange={(e) => handleArrayChange('availableTimes', index, e.target.value)}
                        />
                        {formData.availableTimes.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeArrayItem('availableTimes', index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addArrayItem('availableTimes')}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Time
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Submit */}
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <h4 className="font-medium mb-2">Review Process</h4>
                      <p className="text-sm text-muted-foreground">
                        Your activity will be reviewed by our team before being published. 
                        This typically takes 1-2 business days.
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
                        Cancel
                      </Button>
                      <Button type="submit" className="flex-1">
                        Create Activity
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}