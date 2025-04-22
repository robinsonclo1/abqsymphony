
  export interface Event {
    id: string;
    title: string;
    description: string;
    pieces: EventPieceEntry[];
    performances: EventDateEntry[];
    featuredGuests: FeaturedGuest[];
  }
  
  export interface EventPieceEntry {
    composer: string;
    title: string;
  }  

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
  