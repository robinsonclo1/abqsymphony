import {
    collection,
    getDocs,
    addDoc,
    Timestamp,
    DocumentData,
  } from 'firebase/firestore/lite';
  import { db } from '../firebase';
  import { Event } from '../types/Event';
  
  const eventsRef = collection(db, 'events');
  
  export async function fetchEvents(): Promise<Event[]> {
    const snapshot = await getDocs(eventsRef);
    return snapshot.docs.map(doc => {
      const data = doc.data() as DocumentData;
  
      return {
        id: doc.id,
        title: data.title,
        description: data.description,
        performances: data.performances || [],
        featuredGuests: data.featuredGuests || [],
      };
    });
  }
  
  export async function createEvent(event: Omit<Event, 'id'>): Promise<void> {
    await addDoc(eventsRef, {
      ...event,
      performances: event.performances.map(p => ({
        ...p,
        date: p.date,
      })),
      featuredGuests: event.featuredGuests || [],
    });
  }
  