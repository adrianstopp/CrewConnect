import { useState, useMemo, useRef, useEffect } from 'react';
import { Activity, Category, CATEGORIES, UserLocation, Organization, OrganizationAuth } from './types/activity';
import { MOCK_ACTIVITIES } from './data/activities';
import { HeroSection } from './components/HeroSection';
import { SearchAndFilter } from './components/SearchAndFilter';
import { ActivityCard } from './components/ActivityCard';
import { ActivityDetailModal } from './components/ActivityDetailModal';
import { LocationPicker } from './components/LocationPicker';
import { OrganizationAuth as OrganizationAuthComponent } from './components/OrganizationAuth';
import { OrganizationDashboard } from './components/OrganizationDashboard';
import { Button } from './components/ui/button';
import { toast } from 'sonner@2.0.3';
import { Toaster } from './components/ui/sonner';
import { calculateDistance } from './utils/location';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [priceRange, setPriceRange] = useState('all');
  const [groupSize, setGroupSize] = useState('all');
  const [distance, setDistance] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Organization state
  const [organizationAuth, setOrganizationAuth] = useState<OrganizationAuth>({
    isAuthenticated: false,
    organization: null
  });
  const [showOrganizationAuth, setShowOrganizationAuth] = useState(false);
  const [showOrganizationDashboard, setShowOrganizationDashboard] = useState(false);
  const [organizationActivities, setOrganizationActivities] = useState<Activity[]>([]);
  
  const activitiesRef = useRef<HTMLDivElement>(null);

  // Helper function to check if a date falls within the selected filter
  const isDateInRange = (dateString: string, filter: string): boolean => {
    const activityDate = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    // Reset time to start of day for accurate comparison
    today.setHours(0, 0, 0, 0);
    tomorrow.setHours(0, 0, 0, 0);
    activityDate.setHours(0, 0, 0, 0);

    switch (filter) {
      case 'today':
        return activityDate.getTime() === today.getTime();
      case 'tomorrow':
        return activityDate.getTime() === tomorrow.getTime();
      case 'this-week': {
        const weekStart = new Date(today);
        const weekEnd = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay());
        weekEnd.setDate(weekStart.getDate() + 6);
        return activityDate >= weekStart && activityDate <= weekEnd;
      }
      case 'next-week': {
        const nextWeekStart = new Date(today);
        nextWeekStart.setDate(today.getDate() + (7 - today.getDay()));
        const nextWeekEnd = new Date(nextWeekStart);
        nextWeekEnd.setDate(nextWeekStart.getDate() + 6);
        return activityDate >= nextWeekStart && activityDate <= nextWeekEnd;
      }
      case 'this-weekend': {
        const saturday = new Date(today);
        saturday.setDate(today.getDate() + (6 - today.getDay()));
        const sunday = new Date(saturday);
        sunday.setDate(saturday.getDate() + 1);
        return activityDate.getTime() === saturday.getTime() || activityDate.getTime() === sunday.getTime();
      }
      case 'weekdays':
        return activityDate.getDay() >= 1 && activityDate.getDay() <= 5;
      case 'weekends':
        return activityDate.getDay() === 0 || activityDate.getDay() === 6;
      default:
        return true;
    }
  };

  // Combine mock activities with organization activities
  const allActivities = useMemo(() => {
    return [...MOCK_ACTIVITIES, ...organizationActivities];
  }, [organizationActivities]);

  // Filter activities based on search and filter criteria
  const filteredActivitiesWithDistance = useMemo(() => {
    let activitiesWithDistance = allActivities.map((activity) => ({
      ...activity,
      distance: userLocation 
        ? calculateDistance(
            userLocation.coordinates.lat, 
            userLocation.coordinates.lng,
            activity.coordinates.lat, 
            activity.coordinates.lng
          )
        : undefined
    }));

    // Sort by distance if user location is available
    if (userLocation) {
      activitiesWithDistance.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    }

    return activitiesWithDistance.filter((activity) => {
      // Category filter
      if (selectedCategory !== 'All' && activity.category !== selectedCategory) {
        return false;
      }

      // Price range filter
      if (priceRange !== 'all') {
        const price = activity.price;
        switch (priceRange) {
          case '0-50':
            if (price > 50) return false;
            break;
          case '50-75':
            if (price < 50 || price > 75) return false;
            break;
          case '75-100':
            if (price < 75 || price > 100) return false;
            break;
          case '100+':
            if (price < 100) return false;
            break;
        }
      }

      // Group size filter
      if (groupSize !== 'all') {
        const groupSizeText = activity.groupSize.toLowerCase();
        switch (groupSize) {
          case 'small':
            if (!groupSizeText.includes('4-') && !groupSizeText.includes('5-') && 
                !groupSizeText.includes('6-') && !groupSizeText.includes('8-')) return false;
            break;
          case 'medium':
            if (!groupSizeText.includes('8-') && !groupSizeText.includes('10-') && 
                !groupSizeText.includes('15')) return false;
            break;
          case 'large':
            if (!groupSizeText.includes('15') && !groupSizeText.includes('20') && 
                !groupSizeText.includes('25')) return false;
            break;
        }
      }

      // Distance filter
      if (distance !== 'all' && userLocation) {
        const activityDistance = activity.distance || 0;
        switch (distance) {
          case '10':
            if (activityDistance > 10) return false;
            break;
          case '25':
            if (activityDistance > 25) return false;
            break;
          case '50':
            if (activityDistance > 50) return false;
            break;
          case 'same-city':
            if (activity.city !== userLocation.city) return false;
            break;
        }
      }

      // Date filter
      if (dateFilter !== 'all') {
        const hasMatchingDate = activity.availableDates.some(date => 
          isDateInRange(date, dateFilter)
        );
        if (!hasMatchingDate) return false;
      }

      return true;
    });
  }, [selectedCategory, priceRange, groupSize, distance, dateFilter, userLocation, allActivities]);

  const hasActiveFilters = selectedCategory !== 'All' || 
                          priceRange !== 'all' || groupSize !== 'all' || distance !== 'all' || dateFilter !== 'all';

  const handleClearFilters = () => {
    setSelectedCategory('All');
    setPriceRange('all');
    setGroupSize('all');
    setDistance('all');
    setDateFilter('all');
  };

  const handleViewDetails = (activity: Activity) => {
    setSelectedActivity(activity);
    setIsModalOpen(true);
  };

  const handleBookNow = (activity: Activity) => {
    toast.success(`Booking request sent for "${activity.title}"! Our team will contact you shortly.`);
    setIsModalOpen(false);
  };

  const handleGetStarted = () => {
    activitiesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Organization handlers
  const handleOrganizationAuthenticate = (organization: Organization) => {
    setOrganizationAuth({
      isAuthenticated: true,
      organization
    });
    setShowOrganizationAuth(false);
    setShowOrganizationDashboard(true);
  };

  const handleOrganizationLogout = () => {
    setOrganizationAuth({
      isAuthenticated: false,
      organization: null
    });
    setShowOrganizationDashboard(false);
    toast.success('Successfully signed out.');
  };

  const handleAddActivity = (activityData: Omit<Activity, 'id' | 'organizationId' | 'organizationName' | 'isApproved'>) => {
    if (!organizationAuth.organization) return;

    const newActivity: Activity = {
      ...activityData,
      id: `org-activity-${Date.now()}`,
      organizationId: organizationAuth.organization.id,
      organizationName: organizationAuth.organization.name,
      isApproved: false // New activities need approval
    };

    setOrganizationActivities(prev => [...prev, newActivity]);
  };

  const handleEditActivity = (activityId: string, updates: Partial<Activity>) => {
    setOrganizationActivities(prev =>
      prev.map(activity =>
        activity.id === activityId ? { ...activity, ...updates } : activity
      )
    );
  };

  const handleDeleteActivity = (activityId: string) => {
    setOrganizationActivities(prev =>
      prev.filter(activity => activity.id !== activityId)
    );
    toast.success('Activity deleted successfully.');
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      
      {/* Header */}
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-medium">T</span>
            </div>
            <span className="text-xl font-medium">TeamConnect</span>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <Button variant="ghost">Browse</Button>
            <Button 
              variant="ghost" 
              onClick={() => {
                if (organizationAuth.isAuthenticated) {
                  setShowOrganizationDashboard(true);
                } else {
                  setShowOrganizationAuth(true);
                }
              }}
            >
              For Organizations
            </Button>
            {organizationAuth.isAuthenticated ? (
              <Button variant="outline" onClick={handleOrganizationLogout}>
                Sign Out
              </Button>
            ) : (
              <Button variant="outline" onClick={() => setShowOrganizationAuth(true)}>
                Sign In
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <HeroSection onGetStarted={handleGetStarted} />
      </section>

      {/* Activities Section */}
      <section ref={activitiesRef} className="max-w-7xl mx-auto px-4 py-12 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-6">
          <div>
            <h2 className="text-3xl font-medium mb-4">Discover Team Activities</h2>
            <p className="text-muted-foreground">
              From creative workshops to outdoor adventures, find the perfect activity to bring your team together.
            </p>
          </div>
          
          {/* Location Picker */}
          <LocationPicker 
            userLocation={userLocation}
            onLocationChange={setUserLocation}
          />
        </div>

        {/* Search and Filters */}
        <SearchAndFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
          groupSize={groupSize}
          onGroupSizeChange={setGroupSize}
          distance={distance}
          onDistanceChange={setDistance}
          dateFilter={dateFilter}
          onDateFilterChange={setDateFilter}
          onClearFilters={handleClearFilters}
          hasActiveFilters={hasActiveFilters}
        />

        {/* Results count */}
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">
            {filteredActivitiesWithDistance.length} activities found
            {userLocation && (
              <span className="ml-2 text-xs">
                • Sorted by distance from {userLocation.city}, {userLocation.state}
              </span>
            )}
          </p>
        </div>

        {/* Activities Grid */}
        {filteredActivitiesWithDistance.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredActivitiesWithDistance.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                onViewDetails={handleViewDetails}
                distance={activity.distance}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              No activities match your current filters.
            </p>
            <Button variant="outline" onClick={handleClearFilters}>
              Clear Filters
            </Button>
          </div>
        )}
      </section>

      {/* Activity Detail Modal */}
      <ActivityDetailModal
        activity={selectedActivity}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onBookNow={handleBookNow}
        distance={
          selectedActivity && userLocation
            ? calculateDistance(
                userLocation.coordinates.lat,
                userLocation.coordinates.lng,
                selectedActivity.coordinates.lat,
                selectedActivity.coordinates.lng
              )
            : undefined
        }
      />

      {/* Organization Auth Modal */}
      {showOrganizationAuth && (
        <OrganizationAuthComponent
          onAuthenticate={handleOrganizationAuthenticate}
          onClose={() => setShowOrganizationAuth(false)}
        />
      )}

      {/* Organization Dashboard */}
      {showOrganizationDashboard && organizationAuth.organization && (
        <OrganizationDashboard
          organization={organizationAuth.organization}
          activities={organizationActivities}
          onAddActivity={handleAddActivity}
          onEditActivity={handleEditActivity}
          onDeleteActivity={handleDeleteActivity}
          onLogout={handleOrganizationLogout}
          onClose={() => setShowOrganizationDashboard(false)}
        />
      )}

      {/* Footer */}
      <footer className="border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                  <span className="text-primary-foreground text-sm font-medium">T</span>
                </div>
                <span className="font-medium">TeamConnect</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Connecting teams through meaningful shared experiences.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-3">Activities</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Team Building</li>
                <li>Creative Workshops</li>
                <li>Outdoor Adventures</li>
                <li>Problem Solving</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>About Us</li>
                <li>Contact</li>
                <li>Careers</li>
                <li>Press</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Help Center</li>
                <li>Safety</li>
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2025 TeamConnect. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}