import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createEvent, fetchEventById, updateEvent } from '../services/eventsService';
import { Event, EventDateEntry, FeaturedGuest, EventPieceEntry } from '../types/Event';

export default function CreateEventPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [performances, setPerformances] = useState<EventDateEntry[]>([]);
  const [featuredGuests, setFeaturedGuests] = useState<FeaturedGuest[]>([]);
  const [pieces, setPieces] = useState<EventPieceEntry[]>([]);

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

  const addPiece = () => {
    setPieces([...pieces, { composer: '', title: '' }]);
  };
  
  const updatePiece = (index: number, field: keyof EventPieceEntry, value: string) => {
    const updated = [...pieces];
    updated[index][field] = value;
    setPieces(updated);
  };

  const removePerformance = (index: number) => {
    setPerformances(prev => prev.filter((_, i) => i !== index));
  };
  
  const removeGuest = (index: number) => {
    setFeaturedGuests(prev => prev.filter((_, i) => i !== index));
  };
  
  const removePiece = (index: number) => {
    setPieces(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleSubmit = async () => {
    const newEvent: Omit<Event, 'id'> = {
      title,
      description,
      performances,
      pieces,
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
            setPieces(event.pieces || []);
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
        <input style={{ width: '-webkit-fill-available'}} value={title} onChange={e => setTitle(e.target.value)} />

        <label>Description</label>
        <textarea style={{height: '150px'}} value={description} onChange={e => setDescription(e.target.value)} />
      </div>

      <div className="wrapper">
        <h2>Pieces</h2>
        {pieces.map((p, i) => (
          <div className="guests-grid" key={i}>
            <input
              placeholder="Composer"
              value={p.composer}
              onChange={e => updatePiece(i, 'composer', e.target.value)}
            />
            <input
              placeholder="Title"
              value={p.title}
              onChange={e => updatePiece(i, 'title', e.target.value)}
            />
            <button className="removeButton" onClick={() => removePiece(i)}>✖</button>
          </div>
        ))}
        <button className="buttonPrimary" onClick={addPiece}>Add Piece</button>
      </div>

      <div className="wrapper">
        <h2>Performances</h2>
        {performances.map((p, i) => (
          <div className="performance-grid" key={i}>
            <input type="date" value={p.date} onChange={e => updatePerformance(i, 'date', e.target.value)} />
            <input type="time" value={p.time} onChange={e => updatePerformance(i, 'time', e.target.value)} />
            <input placeholder="Location" value={p.location} onChange={e => updatePerformance(i, 'location', e.target.value)} />
            <button className="removeButton" onClick={() => removePerformance(i)}>✖</button>
          </div>
        ))}
        <button className="buttonPrimary" onClick={addPerformance}>Add Performance</button>
      </div>

      <div className="wrapper">
        <h2>Featured Guests</h2>
        {featuredGuests.map((g, i) => (
          <div className="guests-grid" key={i}>
            <input className="name" placeholder="Name" value={g.name} onChange={e => updateGuest(i, 'name', e.target.value)} />
            <input className="title" placeholder="Title" value={g.title} onChange={e => updateGuest(i, 'title', e.target.value)} />
            <textarea className="description" placeholder="Description" value={g.description} onChange={e => updateGuest(i, 'description', e.target.value)} />
            <button className="removeButton" onClick={() => removeGuest(i)}>✖</button>
          </div>
        ))}
        <button className="buttonPrimary" onClick={addGuest}>Add Guest</button>
      </div>

      <button className="right buttonPrimary" onClick={handleSubmit}>Submit Event</button>
    </div>
  );
}
