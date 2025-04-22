import { useEffect, useState } from 'react';
import { fetchEvents } from '../services/eventsService';
import { Event } from '../types/Event';
import EventCard from '../components/EventCard';

export default function HomePage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchEvents()
      .then(fetched => {
        setEvents(fetched);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching events:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading events...</p>;

  const now = new Date();
  const upcomingEvents = events.filter(event =>
    event.performances.some(p => new Date(p.date) >= now)
  );

  return (
    <div className='container'>
      <div className='jumbotron'>
        <h1>The Symphony of Albquerque</h1>
        <p>A community orchestra offering free classical concerts for the whole family</p>
      </div>

      <h2>Upcoming Events</h2>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {upcomingEvents.map(event => (
          <li key={event.id}>
            <EventCard event={event} />
          </li>
        ))}
      </ul>
    </div>
  );
}
