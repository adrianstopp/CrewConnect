import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden rounded-2xl">
      {/* Background Image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1508509557-1c4f2ec04c00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwdGVhbSUyMGhpa2luZyUyMGFkdmVudHVyZXxlbnwxfHx8fDE3NTY5MDA5NDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Team outdoor adventure"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl px-6">
        <h1 className="text-4xl md:text-6xl font-medium mb-6">
          Strengthen Your Team
          <br />
          <span className="text-[rgba(0,253,156,1)]">Through Shared Experiences</span>
        </h1>
        
        <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
          Discover curated team activities designed to build stronger relationships, 
          improve communication, and create lasting memories with your colleagues.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-[rgba(0,253,143,1)] hover:bg-yellow-500 text-black font-medium px-8 py-6 text-lg"
            onClick={onGetStarted}
          >
            Explore Activities
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-white text-[rgba(0,0,0,1)] hover:bg-white hover:text-black px-8 py-6 text-lg"
          >
            For Organizations
          </Button>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-2xl font-medium mb-2">500+</div>
            <div className="text-gray-300">Happy Teams</div>
          </div>
          <div>
            <div className="text-2xl font-medium mb-2">50+</div>
            <div className="text-gray-300">Unique Activities</div>
          </div>
          <div>
            <div className="text-2xl font-medium mb-2">4.8★</div>
            <div className="text-gray-300">Average Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
}