import { Activity } from '../types/activity';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Clock, Users, Star, MapPin, Check } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ActivityDetailModalProps {
  activity: Activity | null;
  isOpen: boolean;
  onClose: () => void;
  onBookNow: (activity: Activity) => void;
  distance?: number;
}

export function ActivityDetailModal({ 
  activity, 
  isOpen, 
  onClose,
  onBookNow,
  distance
}: ActivityDetailModalProps) {
  if (!activity) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="aspect-[16/9] relative overflow-hidden rounded-lg">
            <ImageWithFallback
              src={activity.imageUrl}
              alt={activity.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <Badge>{activity.category}</Badge>
            </div>
          </div>
          
          <div className="text-left">
            <DialogTitle className="text-2xl mb-2">{activity.title}</DialogTitle>
            <DialogDescription className="text-base">
              {activity.description}
            </DialogDescription>
          </div>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
                <Clock className="w-4 h-4" />
                <span>{activity.duration}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
                <Users className="w-4 h-4" />
                <span>{activity.groupSize}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
                <MapPin className="w-4 h-4" />
                <span>
                  {activity.city}, {activity.state}
                  {distance !== undefined && ` • ${distance} miles away`}
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{activity.rating} ({activity.reviewCount} reviews)</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">What makes this special</h4>
              <ul className="space-y-2">
                {activity.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">What's included</h4>
              <ul className="space-y-2">
                {activity.included.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="sticky top-6 border rounded-lg p-4 space-y-4">
              <div className="text-center border-b pb-4">
                <div className="text-2xl font-medium">${activity.price}</div>
                <div className="text-muted-foreground text-sm">per person</div>
              </div>
              
              <div className="space-y-3">
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={() => onBookNow(activity)}
                >
                  Book Now
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Free cancellation up to 24 hours before the experience
                </p>
              </div>
              
              <div className="pt-4 border-t text-sm text-muted-foreground">
                <p className="mb-2">Perfect for teams looking to:</p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Build stronger relationships</li>
                  <li>Improve communication</li>
                  <li>Have fun together</li>
                  <li>Create lasting memories</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}