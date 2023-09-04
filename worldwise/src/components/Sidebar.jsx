import Logo from './Logo';
import AppNav from './AppNav';
import Footer from './Footer';

function Sidebar() {
  return (
    <div>
      <Logo />
      <AppNav />

      <p>List of cities</p>

      <Footer />
    </div>
  );
}

export default Sidebar;
