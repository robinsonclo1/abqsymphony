import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createEvent, fetchEventById, updateEvent } from '../services/eventsService';
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
      if (isEditing && id) {
        await updateEvent(id, newEvent);
        alert('Event updated successfully!');
      } else {
        await createEvent(newEvent);
        alert('Event created successfully!');
        setTitle('');
        setDescription('');
        setPerformances([]);
        setFeaturedGuests([]);
      }
    } catch (err) {
      console.error('Failed to save event:', err);
      alert('There was a problem saving the event.');
    }
  };

  const { id } = useParams();
  const isEditing = id !== 'new';

  useEffect(() => {
    if (isEditing && id) {
        fetchEventById(id).then(event => {
        if (event) {
            setTitle(event.title);
            setDescription(event.description);
            setPerformances(event.performances);
            setFeaturedGuests(event.featuredGuests);
        }
        });
    }
  }, [id, isEditing]);

  return (
    <div className="card">
      <h1 className="eventTitle">{isEditing ? 'Edit Event' : 'Create New Event'}</h1>
      <div className="wrapper">
        <label>Title</label>
        <input value={title} onChange={e => setTitle(e.target.value)} />

        <label>Description</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} />
      </div>

      <div className="wrapper">
        <h3>Performances</h3>
        {performances.map((p, i) => (
            <div className="performance-grid" key={i}>
            <input
                type="date"
                value={p.date}
                onChange={e => updatePerformance(i, 'date', e.target.value)}
                className="formInput"
            />
            <input
                type="time"
                value={p.time}
                onChange={e => updatePerformance(i, 'time', e.target.value)}
                className="formInput"
            />
            <input placeholder="Location" value={p.location} onChange={e => updatePerformance(i, 'location', e.target.value)} />
            </div>
        ))}
        <button className="buttonPrimary" onClick={addPerformance}>Add Performance</button>
      </div>

      <div className="wrapper">
        <h3>Featured Guests</h3>
        {featuredGuests.map((g, i) => (
            <div className="guests-grid" key={i}>
            <input className="name" placeholder="Name" value={g.name} onChange={e => updateGuest(i, 'name', e.target.value)} />
            <input className="title" placeholder="Title" value={g.title} onChange={e => updateGuest(i, 'title', e.target.value)} />
            <textarea className="description" placeholder="Description" value={g.description} onChange={e => updateGuest(i, 'description', e.target.value)} />
            </div>
        ))}
        <button className="buttonPrimary" onClick={addGuest}>Add Guest</button>
      </div>

      <button className="right buttonPrimary" onClick={handleSubmit}>Submit Event</button>
    </div>
  );
}
