
import ServiceGrid from '../../components/ServiceGrid';
import PromoBanner from '../../components/PromoBanner';
import useActions from './hooks/useActions';
import { styles } from './styles';

// homepage only shows servicegrid and promobanner carousel
const HomePage = () => {
  useActions();

  return (
    <>

      {/* Services Grid */}
      <ServiceGrid />

      {/* Promo Banners */}
      <PromoBanner />
    </>
  );
};

export default HomePage;
