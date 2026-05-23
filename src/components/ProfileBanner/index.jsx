import { Skeleton } from 'antd';
import { ProfilePhoto } from '../../assets';
import useActions from './hooks/useActions';
import { styles } from './styles';

const ProfileBanner = () => {
  const { firstName, lastName, profileImage, loading } = useActions();

  return (
    <div className={styles.container}>
      {/* Profile Avatar */}
      <div className={styles.avatarContainer}>
        {loading ? (
          <Skeleton.Avatar active size={64} shape="circle" />
        ) : (
          <img
            src={profileImage || ProfilePhoto}
            alt="Profile"
            className={styles.avatarImage}
            onError={(e) => {
              e.target.src = ProfilePhoto;
            }}
          />
        )}
      </div>

      {/* Greeting */}
      {loading ? (
        <div className="mb-1">
          <Skeleton.Input active size="small" style={{ width: 120 }} />
        </div>
      ) : (
        <p className={styles.greetingText}>Selamat datang,</p>
      )}
      {loading ? (
        <div className="mt-2">
          <Skeleton.Input active size="large" style={{ width: 200 }} />
        </div>
      ) : (
        <h1 className={styles.nameText}>
          {firstName} {lastName}
        </h1>
      )}
    </div>
  );
};

export default ProfileBanner;
