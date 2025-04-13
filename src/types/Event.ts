export interface EventDateEntry {
    date: string;
    time: string;
    location: string;
  }
  
  export interface FeaturedGuest {
    name: string;
    title: string;
    description: string;
    imageUrl?: string;
  }
  
  export interface Event {
    id: string;
    title: string;
    description: string;
    performances: EventDateEntry[];
    featuredGuests: FeaturedGuest[];
  }
  