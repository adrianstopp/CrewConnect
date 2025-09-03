import { useState } from 'react';
import { Organization, Activity } from '../types/activity';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Building2, 
  Plus, 
  Activity as ActivityIcon, 
  Users, 
  Star, 
  Edit, 
  Trash2, 
  Eye,
  Calendar,
  DollarSign,
  MapPin
} from 'lucide-react';
import { AddActivityForm } from './AddActivityForm';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface OrganizationDashboardProps {
  organization: Organization;
  activities: Activity[];
  onAddActivity: (activity: Omit<Activity, 'id' | 'organizationId' | 'organizationName' | 'isApproved'>) => void;
  onEditActivity: (activityId: string, activity: Partial<Activity>) => void;
  onDeleteActivity: (activityId: string) => void;
  onLogout: () => void;
  onClose: () => void;
}

export function OrganizationDashboard({ 
  organization, 
  activities, 
  onAddActivity, 
  onEditActivity, 
  onDeleteActivity, 
  onLogout, 
  onClose 
}: OrganizationDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddActivity, setShowAddActivity] = useState(false);

  const organizationActivities = activities.filter(
    activity => activity.organizationId === organization.id
  );

  const stats = {
    totalActivities: organizationActivities.length,
    totalBookings: organizationActivities.reduce((sum, activity) => sum + (activity.reviewCount || 0), 0),
    averageRating: organizationActivities.length > 0 
      ? organizationActivities.reduce((sum, activity) => sum + activity.rating, 0) / organizationActivities.length 
      : 0,
    totalRevenue: organizationActivities.reduce((sum, activity) => 
      sum + (activity.price * (activity.reviewCount || 0)), 0
    )
  };

  const handleAddActivity = (activityData: Omit<Activity, 'id' | 'organizationId' | 'organizationName' | 'isApproved'>) => {
    onAddActivity(activityData);
    setShowAddActivity(false);
  };

  if (showAddActivity) {
    return (
      <AddActivityForm
        onSubmit={handleAddActivity}
        onCancel={() => setShowAddActivity(false)}
        organizationCity={organization.city}
        organizationState={organization.state}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-medium">{organization.name}</h1>
              <p className="text-sm text-muted-foreground">Organization Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={onClose}>
              Return to Site
            </Button>
            <Button variant="outline" onClick={onLogout}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Activities</CardTitle>
                  <ActivityIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-medium">{stats.totalActivities}</div>
                  <p className="text-xs text-muted-foreground">Active listings</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-medium">{stats.totalBookings}</div>
                  <p className="text-xs text-muted-foreground">All time bookings</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-medium">{stats.averageRating.toFixed(1)}</div>
                  <p className="text-xs text-muted-foreground">Customer satisfaction</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-medium">${stats.totalRevenue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Estimated earnings</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Your latest activity listings</CardDescription>
              </CardHeader>
              <CardContent>
                {organizationActivities.length === 0 ? (
                  <div className="text-center py-8">
                    <ActivityIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No activities yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Start by creating your first team activity listing.
                    </p>
                    <Button onClick={() => setShowAddActivity(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Your First Activity
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {organizationActivities.slice(0, 3).map((activity) => (
                      <div key={activity.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <div className="aspect-square w-16 h-16 relative overflow-hidden rounded-md">
                          <ImageWithFallback
                            src={activity.imageUrl}
                            alt={activity.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{activity.title}</h4>
                          <p className="text-sm text-muted-foreground">{activity.shortDescription}</p>
                          <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                            <span>${activity.price}/person</span>
                            <span>{activity.rating} ⭐ ({activity.reviewCount} reviews)</span>
                            <Badge variant={activity.isApproved ? "default" : "secondary"}>
                              {activity.isApproved ? "Live" : "Pending Review"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activities" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-medium">Your Activities</h2>
                <p className="text-muted-foreground">Manage your team activity listings</p>
              </div>
              <Button onClick={() => setShowAddActivity(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Activity
              </Button>
            </div>

            {organizationActivities.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <ActivityIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No activities yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Create your first team activity to start accepting bookings.
                  </p>
                  <Button onClick={() => setShowAddActivity(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Activity
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {organizationActivities.map((activity) => (
                  <Card key={activity.id}>
                    <CardContent className="p-0">
                      <div className="aspect-[4/3] relative overflow-hidden rounded-t-lg">
                        <ImageWithFallback
                          src={activity.imageUrl}
                          alt={activity.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 right-3">
                          <Badge variant={activity.isApproved ? "default" : "secondary"}>
                            {activity.isApproved ? "Live" : "Pending Review"}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <div className="space-y-2 mb-4">
                          <h3 className="font-medium line-clamp-1">{activity.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {activity.shortDescription}
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span>{activity.city}, {activity.state}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{activity.availableDates.length} dates</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <span className="font-medium">${activity.price}/person</span>
                            <div className="flex items-center gap-1 text-sm">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span>{activity.rating}</span>
                              <span className="text-muted-foreground">({activity.reviewCount})</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <Button size="sm" variant="ghost">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => onDeleteActivity(activity.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Organization Profile</CardTitle>
                <CardDescription>Manage your organization information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Organization Name</label>
                    <p className="text-sm text-muted-foreground">{organization.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Contact Person</label>
                    <p className="text-sm text-muted-foreground">{organization.contactPerson}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Email</label>
                    <p className="text-sm text-muted-foreground">{organization.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Phone</label>
                    <p className="text-sm text-muted-foreground">{organization.phone}</p>
                  </div>
                  {organization.website && (
                    <div>
                      <label className="text-sm font-medium mb-1 block">Website</label>
                      <a 
                        href={organization.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        {organization.website}
                      </a>
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-medium mb-1 block">Status</label>
                    <Badge variant={organization.isVerified ? "default" : "secondary"}>
                      {organization.isVerified ? "Verified" : "Pending Verification"}
                    </Badge>
                  </div>
                </div>
                
                {organization.description && (
                  <div>
                    <label className="text-sm font-medium mb-1 block">Description</label>
                    <p className="text-sm text-muted-foreground">{organization.description}</p>
                  </div>
                )}
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Address</label>
                  <p className="text-sm text-muted-foreground">
                    {organization.address}<br />
                    {organization.city}, {organization.state} {organization.zipCode}
                  </p>
                </div>
                
                <div className="pt-4">
                  <Button variant="outline">Edit Profile</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}