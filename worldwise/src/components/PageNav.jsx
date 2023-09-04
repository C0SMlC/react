import { NavLink } from 'react-router-dom';
import styles from './PageNav.module.css';
import Logo from './Logo';

function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          {/* Can use this link tag too, but NavLink is better because it highlights currently active tab with "active" class */}
          {/* <Link to={'/'}>Home</Link> */}

          <NavLink to={'/pricing'}>Pricing</NavLink>
        </li>
        <li>
          <NavLink to={'/product'}>Product</NavLink>
        </li>{' '}
        <li>
          <NavLink to={'/login'} className={styles.ctaLink}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
