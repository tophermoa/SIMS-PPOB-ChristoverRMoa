import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import HeaderInformation from '../HeaderInformation';
import { styles } from './styles';


// DashboardLayout — Layout wrapper for the main protected routes.

const DashboardLayout = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.main}>
        <HeaderInformation />

        {/* Renders page child like homepage, transaction page, topup page, etc */}
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
