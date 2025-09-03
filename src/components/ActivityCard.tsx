import { Activity } from '../types/activity';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Clock, Users, Star, MapPin, Calendar } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ActivityCardProps {
  activity: Activity;
  onViewDetails: (activity: Activity) => void;
  distance?: number;
}

export function ActivityCard({ activity, onViewDetails, distance }: ActivityCardProps) {
  // Format the next available date for display
  const getNextAvailableDate = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const upcomingDates = activity.availableDates
      .map(dateStr => new Date(dateStr))
      .filter(date => {
        date.setHours(0, 0, 0, 0);
        return date >= today;
      })
      .sort((a, b) => a.getTime() - b.getTime());
    
    if (upcomingDates.length === 0) return null;
    
    const nextDate = upcomingDates[0];
    return nextDate.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const nextAvailableDate = getNextAvailableDate();

  return (
    <Card className="group cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-black/5">
      <CardContent className="p-0">
        <div className="aspect-[4/3] relative overflow-hidden rounded-t-lg">
          <ImageWithFallback
            src={activity.imageUrl}
            alt={activity.title}
            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
          />
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
              {activity.category}
            </Badge>
            {activity.organizationId && (
              <Badge 
                variant={activity.isApproved ? "default" : "secondary"} 
                className="bg-white/90 backdrop-blur-sm"
              >
                {activity.isApproved ? "Partner" : "Pending"}
              </Badge>
            )}
          </div>
        </div>
        
        <div className="p-4 space-y-3">
          <div className="space-y-2">
            <h3 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
              {activity.title}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-2">
              {activity.shortDescription}
            </p>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {activity.duration}
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {activity.groupSize}
            </div>
            {nextAvailableDate && (
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Next: {nextAvailableDate}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{activity.rating}</span>
              <span className="text-muted-foreground">({activity.reviewCount})</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <span>{activity.city}, {activity.state}</span>
              {distance !== undefined && (
                <span className="text-xs">• {distance} mi</span>
              )}
            </div>
            {activity.organizationName && (
              <div className="text-xs text-muted-foreground">
                by {activity.organizationName}
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between pt-2 border-t">
            <div>
              <span className="font-medium">${activity.price}</span>
              <span className="text-muted-foreground text-sm"> per person</span>
            </div>
            <Button 
              size="sm" 
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(activity);
              }}
            >
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}