import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Building2, Mail, Phone, MapPin, User, Lock, Globe } from 'lucide-react';
import { Organization } from '../types/activity';
import { toast } from 'sonner@2.0.3';

interface OrganizationAuthProps {
  onAuthenticate: (organization: Organization) => void;
  onClose: () => void;
}

export function OrganizationAuth({ onAuthenticate, onClose }: OrganizationAuthProps) {
  const [activeTab, setActiveTab] = useState('login');
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('demo@organization.com');
  const [loginPassword, setLoginPassword] = useState('password123');
  
  // Signup form state
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    website: '',
    description: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    contactPerson: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock authentication - in real app, this would call an API
    if (loginEmail && loginPassword) {
      const mockOrganization: Organization = {
        id: 'org-demo-123',
        name: 'Adventure Co.',
        email: loginEmail,
        phone: '(555) 123-4567',
        website: 'https://adventureco.com',
        description: 'Premier team building and adventure experiences for corporate groups.',
        address: '123 Adventure Ave',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94105',
        contactPerson: 'Sarah Johnson',
        createdAt: new Date().toISOString(),
        isVerified: true
      };
      
      toast.success('Welcome back! Successfully logged in.');
      onAuthenticate(mockOrganization);
    } else {
      toast.error('Please enter both email and password.');
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupData.password !== signupData.confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    
    if (!signupData.name || !signupData.email || !signupData.password) {
      toast.error('Please fill in all required fields.');
      return;
    }
    
    // Mock organization creation
    const newOrganization: Organization = {
      id: `org-${Date.now()}`,
      name: signupData.name,
      email: signupData.email,
      phone: signupData.phone,
      website: signupData.website,
      description: signupData.description,
      address: signupData.address,
      city: signupData.city,
      state: signupData.state,
      zipCode: signupData.zipCode,
      contactPerson: signupData.contactPerson,
      createdAt: new Date().toISOString(),
      isVerified: false
    };
    
    toast.success('Account created successfully! Welcome to TeamConnect.');
    onAuthenticate(newOrganization);
  };

  const handleSignupChange = (field: string, value: string) => {
    setSignupData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-medium">Organization Portal</h1>
              <p className="text-muted-foreground">Join TeamConnect to showcase your team activities</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>✕</Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Create Account</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Welcome Back</CardTitle>
                  <CardDescription>Sign in to your organization account</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="organization@example.com"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="Enter your password"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-md">
                      <strong>Demo Credentials:</strong><br />
                      Email: demo@organization.com<br />
                      Password: password123
                    </div>
                    
                    <Button type="submit" className="w-full">
                      Sign In
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="signup">
              <Card>
                <CardHeader>
                  <CardTitle>Create Organization Account</CardTitle>
                  <CardDescription>Join TeamConnect to offer your team activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="org-name">Organization Name *</Label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="org-name"
                            placeholder="Adventure Co."
                            value={signupData.name}
                            onChange={(e) => handleSignupChange('name', e.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="contact-person">Contact Person *</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="contact-person"
                            placeholder="John Smith"
                            value={signupData.contactPerson}
                            onChange={(e) => handleSignupChange('contactPerson', e.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email Address *</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="signup-email"
                            type="email"
                            placeholder="contact@organization.com"
                            value={signupData.email}
                            onChange={(e) => handleSignupChange('email', e.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            placeholder="(555) 123-4567"
                            value={signupData.phone}
                            onChange={(e) => handleSignupChange('phone', e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="website"
                          placeholder="https://yourorganization.com"
                          value={signupData.website}
                          onChange={(e) => handleSignupChange('website', e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Organization Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your organization and the types of team activities you offer..."
                        value={signupData.description}
                        onChange={(e) => handleSignupChange('description', e.target.value)}
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="address"
                          placeholder="123 Main St"
                          value={signupData.address}
                          onChange={(e) => handleSignupChange('address', e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          placeholder="San Francisco"
                          value={signupData.city}
                          onChange={(e) => handleSignupChange('city', e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          placeholder="CA"
                          value={signupData.state}
                          onChange={(e) => handleSignupChange('state', e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input
                          id="zipCode"
                          placeholder="94105"
                          value={signupData.zipCode}
                          onChange={(e) => handleSignupChange('zipCode', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Password *</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="signup-password"
                            type="password"
                            placeholder="Create a secure password"
                            value={signupData.password}
                            onChange={(e) => handleSignupChange('password', e.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm Password *</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="confirm-password"
                            type="password"
                            placeholder="Confirm your password"
                            value={signupData.confirmPassword}
                            onChange={(e) => handleSignupChange('confirmPassword', e.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full">
                      Create Account
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}