import { Link, NavLink } from 'react-router-dom';
import { Logo } from '../../assets';
import useActions from './hooks/useActions';
import { styles } from './styles';


const Navbar = () => {
  useActions();

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        {/* Logo */}
        <Link to="/home" className={styles.logoLink}>
          <img src={Logo} alt="SIMS PPOB" className={styles.logoImage} />
          <span className={styles.logoText}>
            SIMS PPOB
          </span>
        </Link>

        {/* Navigation Links */}
        <div className={styles.navLinksContainer}>
          <NavLink
            to="/top-up"
            className={({ isActive }) =>
              `nav-link text-xs sm:text-sm whitespace-nowrap ${isActive ? 'active' : ''}`
            }
          >
            Top Up
          </NavLink>
          <NavLink
            to="/transaction"
            className={({ isActive }) =>
              `nav-link text-xs sm:text-sm whitespace-nowrap ${isActive ? 'active' : ''}`
            }
          >
            Transaction
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `nav-link text-xs sm:text-sm whitespace-nowrap ${isActive ? 'active' : ''}`
            }
          >
            Akun
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
