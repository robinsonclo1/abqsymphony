import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
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
        pieces: data.pieces || [],
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
  
export async function deleteEvent(eventId: string): Promise<void> {
  const eventDoc = doc(db, 'events', eventId);
  await deleteDoc(eventDoc);
}

export async function fetchEventById(id: string): Promise<Event | null> {
  const docRef = doc(db, 'events', id);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) return null;

  const data = snapshot.data() as DocumentData;

  return {
    id: snapshot.id,
    title: data.title,
    description: data.description,
    pieces: data.pieces || [],
    performances: data.performances || [],
    featuredGuests: data.featuredGuests || [],
  };
}

export async function updateEvent(id: string, event: Omit<Event, 'id'>): Promise<void> {
  const eventDoc = doc(db, 'events', id);
  await updateDoc(eventDoc, {
    ...event,
    performances: event.performances.map(p => ({
      ...p,
      date: p.date,
    })),
    pieces: event.pieces || [],
    featuredGuests: event.featuredGuests || [],
  });
}
