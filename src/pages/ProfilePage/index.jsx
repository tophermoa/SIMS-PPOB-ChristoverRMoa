import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../components/Navbar';
import { ProfilePhoto } from '../../assets';
import { MailOutlined, UserOutlined, EditOutlined, CheckOutlined, CloseOutlined, LoadingOutlined } from '@ant-design/icons';
import useActions from './hooks/useActions';
import { styles } from './styles';
import Modal from '../../components/Modal';
import { Spin } from 'antd';


const ProfilePage = () => {
  const user = useSelector((state) => state.profile);
  const { updateProfile, logoutFunc, updateProfileImage, loading, fetchProfile } = useActions();

  const [isEditing, setIsEditing] = useState(false); // edit mode boolean
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
  });

  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalState, setModalState] = useState('success');
  const [modalMessage, setModalMessage] = useState('');

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user.firstName || user.lastName) {
      // setformdata for in input field
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
      });
    } else if (!user.email) {
      fetchProfile();
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (value.trim() === '') {
      setErrors((prev) => ({ ...prev, [name]: `${name === 'firstName' ? 'Nama Depan' : 'Nama Belakang'} tidak boleh kosong` }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();
    if (isEditing) {
      // stop the function if firstname / lastname empty
      // handle this because call twice
      if (!formData.firstName.trim() || !formData.lastName.trim()) return;

      const response = await updateProfile(formData);
      if (response.success) {
        setModalState('success');
        setModalMessage(response.message);
        setIsModalOpen(true);
      } else {
        setModalState('error');
        setModalMessage(response.message);
        setIsModalOpen(true);
      }
    } else {
      setIsEditing(true);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setErrors({});

    // reset formData same as data response API before
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (modalState === 'success') {
      setIsEditing(false);
    }
  };

  const handleLogout = () => {
    logoutFunc();
  };

  const renderModal = () => {
    if (modalState === 'success') {
      return (
        <Modal
          isOpen={isModalOpen}
          icon={
            <div style={{ width: 70, height: 70, borderRadius: "50%", backgroundColor: "green", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <CheckOutlined style={{ color: "white", fontSize: 32 }} />
            </div>
          }
          iconBgColor="green"
          title="Update Profile Berhasil!"
          description={modalMessage}
          primaryButtonText="Tutup"
          onPrimaryClick={handleCloseModal}
        />
      );
    }

    if (modalState === 'error') {
      return (
        <Modal
          isOpen={isModalOpen}
          icon={
            <div style={{ width: 70, height: 70, borderRadius: "50%", backgroundColor: "red", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <CloseOutlined style={{ color: "white", fontSize: 32 }} />
            </div>
          }
          iconBgColor="red"
          title="Update Profile Gagal"
          description={modalMessage}
          primaryButtonText="Tutup"
          onPrimaryClick={handleCloseModal}
        />
      );
    }
    return null;
  };

  const handlePhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const validFormats = ['image/jpeg', 'image/png'];

      // validate the type first with modal message
      if (!validFormats.includes(file.type)) {
        setModalState('error');
        setModalMessage('Format Image tidak sesuai');
        setIsModalOpen(true);
        return;
      }

      // then validate the size cannot > 100kb
      const maxSizeInBytes = 100 * 1024;
      if (file.size > maxSizeInBytes) {
        setModalState('error');
        setModalMessage('Ukuran gambar maksimal 100 KB');
        setIsModalOpen(true);
        return;
      }

      const response = await updateProfileImage(file);
      if (response.success) {
        setModalState('success');
        setModalMessage(response.message);
        setIsModalOpen(true);
      } else {
        setModalState('error');
        setModalMessage(response.message);
        setIsModalOpen(true);
      }
    }
  };

  return (
    <div className={styles.container}>
      <Navbar />

      <main className={styles.main}>
        {/* Photo Section */}
        <div className={styles.photoSection}>
          <div className={styles.photoContainer}>
            <div className={styles.photoWrapper}>
              <img
                src={user.profileImage || ProfilePhoto}
                alt="Profile"
                className={styles.photoImage}
                onError={(e) => {
                  e.target.src = ProfilePhoto;
                }}
              />
            </div>
            <button
              onClick={handlePhotoClick}
              className={styles.photoEditButton}
              aria-label="Edit photo"
            >
              <EditOutlined className="text-sm" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handlePhotoChange}
              accept="image/jpeg, image/png"
              className={styles.fileInput}
            />
          </div>
          <h1 className={styles.userName}>
            {user.firstName} {user.lastName}
          </h1>
        </div>

        {/* Form Section */}
        <form onSubmit={handleEditProfile} className={styles.form}>
          {/* email */}
          <div className="relative">
            <label className={styles.label}>
              Email
            </label>
            <div className={styles.inputWrapper}>
              <div className={styles.iconWrapper}>
                <MailOutlined className="text-lg" />
              </div>
              <input
                type="email"
                value={user.email}
                readOnly
                className={styles.inputReadonly}
              />
            </div>
          </div>

          {/* firstname */}
          <div className="relative">
            <label className={styles.label}>
              Nama Depan
            </label>
            <div className={`${styles.inputWrapper} ${errors.firstName ? 'border-red-500' : ''}`} style={errors.firstName ? { borderColor: '#ef4444' } : {}}>
              <div className={styles.iconWrapper}>
                <UserOutlined className={`text-lg ${errors.firstName ? 'text-red-500' : ''}`} />
              </div>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className={!isEditing ? styles.inputReadonly : styles.inputEditable}
              />
            </div>
            {errors.firstName && (
              <p className="error-text absolute right-0 text-red-500 text-xs">{errors.firstName}</p>
            )}
          </div>

          {/* lastname */}
          <div className="relative">
            <label className={styles.label}>
              Nama Belakang
            </label>
            <div className={`${styles.inputWrapper} ${errors.lastName ? 'border-red-500' : ''}`} style={errors.lastName ? { borderColor: '#ef4444' } : {}}>
              <div className={styles.iconWrapper}>
                <UserOutlined className={`text-lg ${errors.lastName ? 'text-red-500' : ''}`} />
              </div>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className={!isEditing ? styles.inputReadonly : styles.inputEditable}
              />
            </div>
            {errors.lastName && (
              <p className="error-text absolute right-0 text-red-500 text-xs">{errors.lastName}</p>
            )}
          </div>

          {/* all buttons */}
          <div className={styles.actionButtonsContainer}>
            {!isEditing ? (
              <>
                <button type="button" onClick={() => setIsEditing(true)} className={styles.submitButton}>
                  Edit Profil
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className={styles.logoutButton}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  type="submit"
                  disabled={
                    !formData.firstName.trim() ||
                    !formData.lastName.trim() ||
                    (formData.firstName === user.firstName && formData.lastName === user.lastName) ||
                    loading
                  }
                  className={(
                    !formData.firstName.trim() ||
                    !formData.lastName.trim() ||
                    (formData.firstName === user.firstName && formData.lastName === user.lastName) ||
                    loading
                  ) ? styles.inputReadonlyButton : styles.submitButton}
                >
                  {loading ? <Spin indicator={<LoadingOutlined style={{ color: 'white' }} spin />} /> : 'Simpan'}
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className={styles.batalkanButton}
                  style={{ border: '1px solid #f56a6a' }}
                >
                  Batalkan
                </button>
              </>
            )}
          </div>
        </form>
      </main>

      {/* modal notif */}
      {renderModal()}
    </div>
  );
};

export default ProfilePage;
