import { useState } from 'react';
import { createEvent } from '../services/eventsService';
import { Event, EventDateEntry, FeaturedGuest } from '../types/Event';

export default function CreateEventPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [performances, setPerformances] = useState<EventDateEntry[]>([]);
  const [featuredGuests, setFeaturedGuests] = useState<FeaturedGuest[]>([]);

  const addPerformance = () => {
    setPerformances([...performances, { date: '', time: '', location: '' }]);
  };

  const updatePerformance = (index: number, field: keyof EventDateEntry, value: string) => {
    const updated = [...performances];
    updated[index][field] = value;
    setPerformances(updated);
  };

  const addGuest = () => {
    setFeaturedGuests([...featuredGuests, { name: '', title: '', description: '', imageUrl: '' }]);
  };

  const updateGuest = (index: number, field: keyof FeaturedGuest, value: string) => {
    const updated = [...featuredGuests];
    updated[index][field] = value;
    setFeaturedGuests(updated);
  };

  const handleSubmit = async () => {
    const newEvent: Omit<Event, 'id'> = {
      title,
      description,
      performances,
      featuredGuests: featuredGuests.filter(g => g.name.trim() !== ''),
    };

    try {
      await createEvent(newEvent);
      alert('Event created successfully!');
      setTitle('');
      setDescription('');
      setPerformances([]);
      setFeaturedGuests([]);
    } catch (err) {
      console.error('Failed to create event:', err);
      alert('There was a problem creating the event.');
    }
  };

  return (
    <div>
      <h1>Create New Event</h1>
      <div>
        <label>Title</label><br />
        <input value={title} onChange={e => setTitle(e.target.value)} />
      </div>

      <div>
        <label>Description</label><br />
        <textarea value={description} onChange={e => setDescription(e.target.value)} />
      </div>

      <h3>Performances</h3>
      {performances.map((p, i) => (
        <div key={i}>
          <input placeholder="Date (YYYY-MM-DD)" value={p.date} onChange={e => updatePerformance(i, 'date', e.target.value)} />
          <input placeholder="Time (e.g. 7:30 PM)" value={p.time} onChange={e => updatePerformance(i, 'time', e.target.value)} />
          <input placeholder="Location" value={p.location} onChange={e => updatePerformance(i, 'location', e.target.value)} />
        </div>
      ))}
      <button onClick={addPerformance}>Add Performance</button>

      <h3>Featured Guests</h3>
      {featuredGuests.map((g, i) => (
        <div key={i}>
          <input placeholder="Name" value={g.name} onChange={e => updateGuest(i, 'name', e.target.value)} />
          <input placeholder="Title" value={g.title} onChange={e => updateGuest(i, 'title', e.target.value)} />
          <textarea placeholder="Description" value={g.description} onChange={e => updateGuest(i, 'description', e.target.value)} />
          <input placeholder="Image URL" value={g.imageUrl ?? ''} onChange={e => updateGuest(i, 'imageUrl', e.target.value)} />
        </div>
      ))}
      <button onClick={addGuest}>Add Guest</button>

      <br /><br />
      <button onClick={handleSubmit}>Submit Event</button>
    </div>
  );
}
