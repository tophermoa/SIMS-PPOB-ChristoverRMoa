import ProfileBanner from '../ProfileBanner';
import BalanceCard from '../BalanceCard';
import { styles } from './styles';

// merging Profilebanner and BalanceCard
const HeaderInformation = () => {
  return (
    <div className={styles.sectionWrapper}>
      <ProfileBanner />
      <div className={styles.balanceWrapper}>
        <BalanceCard />
      </div>
    </div>
  );
};

export default HeaderInformation;
