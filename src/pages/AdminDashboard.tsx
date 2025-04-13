import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchEvents, deleteEvent } from '../services/eventsService';
import { Event } from '../types/Event';

export default function AdminDashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents().then(setEvents);
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Delete this event?")) {
      await deleteEvent(id);
      setEvents(events => events.filter(e => e.id !== id));
    }
  };

  return (
    <div>
      <h1>Manage Events</h1>
      <button onClick={() => navigate('/admin/events/new')}>Create New Event</button>
      <ul>
        {events.map(e => (
          <li key={e.id}>
            <strong>{e.title}</strong>
            <button onClick={() => navigate(`/admin/events/${e.id}`)}>Edit</button>
            <button onClick={() => handleDelete(e.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
