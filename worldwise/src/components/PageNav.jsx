import { NavLink } from 'react-router-dom';

function PageNav() {
  return (
    <nav>
      <ul>
        <li>
            {/* Can use this link tag too, but NavLink is better because it highlights currently active tab with "active" class */}
          {/* <Link to={'/'}>Home</Link> */}

          <NavLink to={'/'}>Home</NavLink>
        </li>
        <li>
          <NavLink to={'/pricing'}>Pricing</NavLink>
        </li>{' '}
        <li>
          <NavLink to={'/product'}>Product</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
