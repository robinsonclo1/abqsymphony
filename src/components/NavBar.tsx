import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './NavBar.module.css';

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className={styles.navbar}>
      
<div className={styles.navInner}>
    <Link
    to="/"
    className={styles.brand}
    aria-label="Homepage"
    aria-current={location.pathname === '/' ? 'page' : undefined}
    >
        🎻 Orchestra
    </Link>

    <button
        className={styles.hamburger}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
        aria-controls="main-menu"
        onClick={() => setMenuOpen(prev => !prev)}
    >
        ☰
    </button>
    </div>

      <ul
        id="main-menu"
        className={`${styles.navLinks} ${menuOpen ? styles.show : ''}`}
      >
        <li>
          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
            aria-current={location.pathname === '/about' ? 'page' : undefined}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            to="/previous"
            onClick={() => setMenuOpen(false)}
            aria-current={location.pathname === '/previous' ? 'page' : undefined}
          >
            Previous Events
          </Link>
        </li>
        <li>
          <Link
            to="/admin"
            onClick={() => setMenuOpen(false)}
            aria-current={location.pathname === '/admin' ? 'page' : undefined}
          >
            Manage Events
          </Link>
        </li>
      </ul>
    </nav>
  );
}
