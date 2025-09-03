import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from './ui/select';
import { Filter, X } from 'lucide-react';
import { CATEGORIES, Category } from '../types/activity';

interface SearchAndFilterProps {
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
  priceRange: string;
  onPriceRangeChange: (range: string) => void;
  groupSize: string;
  onGroupSizeChange: (size: string) => void;
  distance: string;
  onDistanceChange: (distance: string) => void;
  dateFilter: string;
  onDateFilterChange: (dateFilter: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export function SearchAndFilter({
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  groupSize,
  onGroupSizeChange,
  distance,
  onDistanceChange,
  dateFilter,
  onDateFilterChange,
  onClearFilters,
  hasActiveFilters
}: SearchAndFilterProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="space-y-4">
      {/* Filter Controls */}
      <div className="flex flex-wrap gap-3 items-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="gap-2"
        >
          <Filter className="w-4 h-4" />
          Filters
        </Button>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "secondary"}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="gap-1 text-muted-foreground"
          >
            <X className="w-3 h-3" />
            Clear filters
          </Button>
        )}
      </div>

      {/* Expanded Filters */}
      {isFilterOpen && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
          <div>
            <label className="text-sm font-medium mb-2 block">Price Range</label>
            <Select value={priceRange} onValueChange={onPriceRangeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Any price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any price</SelectItem>
                <SelectItem value="0-50">$0 - $50</SelectItem>
                <SelectItem value="50-75">$50 - $75</SelectItem>
                <SelectItem value="75-100">$75 - $100</SelectItem>
                <SelectItem value="100+">$100+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Group Size</label>
            <Select value={groupSize} onValueChange={onGroupSizeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Any size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any size</SelectItem>
                <SelectItem value="small">Small (4-8 people)</SelectItem>
                <SelectItem value="medium">Medium (8-15 people)</SelectItem>
                <SelectItem value="large">Large (15+ people)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Distance</label>
            <Select value={distance} onValueChange={onDistanceChange}>
              <SelectTrigger>
                <SelectValue placeholder="Any distance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any distance</SelectItem>
                <SelectItem value="10">Within 10 miles</SelectItem>
                <SelectItem value="25">Within 25 miles</SelectItem>
                <SelectItem value="50">Within 50 miles</SelectItem>
                <SelectItem value="same-city">Same city only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Date & Time</label>
            <Select value={dateFilter} onValueChange={onDateFilterChange}>
              <SelectTrigger>
                <SelectValue placeholder="Any time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="tomorrow">Tomorrow</SelectItem>
                <SelectItem value="this-week">This week</SelectItem>
                <SelectItem value="next-week">Next week</SelectItem>
                <SelectItem value="this-weekend">This weekend</SelectItem>
                <SelectItem value="weekdays">Weekdays only</SelectItem>
                <SelectItem value="weekends">Weekends only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  );
}