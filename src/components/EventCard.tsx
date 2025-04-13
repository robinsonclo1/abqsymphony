import styles from './EventCard.module.css';
import { Event } from '../types/Event';
import ZiaSymbol from './ZiaSymbol';

interface Props {
  event: Event;
}

export default function EventCard({ event }: Props) {
  return (
    <section className={styles.card}>
      <h2 className={styles.eventTitle}>{event.title}</h2>
      <p className={styles.eventDescription}>{event.description}</p>

      {event.performances.map((p, i) => (
        <div className={styles.performance} key={i}>
          <div className={styles.performanceDate}>
            {new Date(p.date).toLocaleDateString(undefined, {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
            })}
          </div>
          <div>{p.time}</div>
          <div>{p.location}</div>
        </div>
      ))}

      {event.featuredGuests?.length > 0 && (
        <>
          <h3 className={styles.featuredHeader}>Featuring</h3>
          {event.featuredGuests.map((guest, i) => (
            <div className={styles.featuredGuest} key={i}>
              {guest.imageUrl && (
                <img src={guest.imageUrl} alt={`Portrait of ${guest.name}`} />
              )}
              <div className={styles.featuredGuestInfo}>
                <strong>{guest.name}</strong> – {guest.title}
                <p>{guest.description}</p>
              </div>
            </div>
          ))}
        </>
      )}
      
      <ZiaSymbol showNotes={true} useLongRight={true} />
    </section>
  );
}
