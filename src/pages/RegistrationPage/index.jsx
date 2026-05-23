import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MailOutlined, UserOutlined, LockOutlined, EyeOutlined, EyeInvisibleOutlined, LoadingOutlined, CheckOutlined } from '@ant-design/icons';
import { Spin } from "antd";
import useForm from '../../hooks/useForm';
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateName,
} from '../../utils/validators';
import { Logo, IllustrasiLogin } from '../../assets';
import useActions from './hooks/useActions';
import { styles } from './styles';
import Modal from '../../components/Modal';

const RegistrationPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { registerUser, loading } = useActions();
  const navigate = useNavigate();

  const { values, errors, touched, handleChange, handleBlur, validateAll } =
    useForm(
      {
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        confirmPassword: '',
      },
      {
        email: (value) => validateEmail(value),
        first_name: (value) => validateName(value, 'Nama depan'),
        last_name: (value) => validateName(value, 'Nama belakang'),
        password: (value) => validatePassword(value),
        confirmPassword: (value, allValues) =>
          validateConfirmPassword(allValues.password, value),
      }
    );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateAll();
    if (!isValid) return;

    // remove confirmPassword as a payload
    const { confirmPassword, ...payload } = values;
    const resp = await registerUser(payload);
    if (resp.status === 0) {
      setIsModalOpen(true);
    } else {
      setErrorMessage(resp.message);
    }
  };

  const customHandleChange = (e) => {
    if (errorMessage) setErrorMessage('');
    handleChange(e);
  };

  const renderInputField = ({
    name,
    type = 'text',
    placeholder,
    icon,
    showToggle = false,
    isVisible = false,
    onToggle = null,
  }) => {
    const isEmail = name === 'email';
    const displayError = isEmail && errorMessage ? errorMessage : errors[name];
    const hasError = isEmail && errorMessage ? true : touched[name] && errors[name];

    return (
      <div className={styles.fieldWrapper}>
        <div className={styles.inputWrapper}>
          <div className={styles.iconWrapper}>
            {icon}
          </div>
          <input
            type={showToggle ? (isVisible ? 'text' : 'password') : type}
            name={name}
            value={values[name]}
            onChange={customHandleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            className={`input-field ${showToggle ? 'pr-12' : ''} ${hasError ? 'error' : ''}`}
            id={`register-${name}`}
          />
          {showToggle && (
            <button
              type="button"
              onClick={onToggle}
              className={styles.passwordToggle}
              aria-label={isVisible ? 'Hide password' : 'Show password'}
            >
              {isVisible ? (
                <EyeInvisibleOutlined className="text-lg" />
              ) : (
                <EyeOutlined className="text-lg" />
              )}
            </button>
          )}
        </div>
        {hasError && (
          <p className="error-text absolute right-0">{displayError}</p>
        )}
      </div>
    );
  };

  const EmailIcon = <MailOutlined className="text-lg" />;
  const UserIcon = <UserOutlined className="text-lg" />;
  const LockIcon = <LockOutlined className="text-lg" />;

  return (
    <div className={styles.container}>
      {/* ===== Left Side — Form ===== */}
      <div className={styles.leftSide}>
        <div className={styles.formContainer}>
          {/* Logo */}
          <div className={styles.logoContainer}>
            <img src={Logo} alt="SIMS PPOB" className={styles.logoImage} />
            <span className={styles.logoText}>SIMS PPOB</span>
          </div>

          {/* Heading */}
          <h1 className={styles.heading}>
            Lengkapi data untuk
            <br />
            membuat akun
          </h1>

          {/* Form */}
          <form onSubmit={handleSubmit} className={styles.form}>
            {renderInputField({
              name: 'email',
              type: 'email',
              placeholder: 'Masukan email anda',
              icon: EmailIcon,
            })}

            {renderInputField({
              name: 'first_name',
              placeholder: 'Nama depan',
              icon: UserIcon,
            })}

            {renderInputField({
              name: 'last_name',
              placeholder: 'Nama belakang',
              icon: UserIcon,
            })}

            {renderInputField({
              name: 'password',
              placeholder: 'Buat password',
              icon: LockIcon,
              showToggle: true,
              isVisible: showPassword,
              onToggle: () => setShowPassword((prev) => !prev),
            })}

            {renderInputField({
              name: 'confirmPassword',
              placeholder: 'Konfirmasi password',
              icon: LockIcon,
              showToggle: true,
              isVisible: showPassword,
              onToggle: () => setShowPassword((prev) => !prev),
            })}

            {/* Submit Button */}
            <button
              type="submit"
              className={styles.submitButton}
              id="register-submit"
            >
              {loading ? <Spin style={{ color: "#FFFFFF" }} indicator={<LoadingOutlined spin />} /> : "Registrasi"}
            </button>
          </form>

          {/* Login Link */}
          <p className={styles.loginText}>
            Sudah punya akun? Login{' '}
            <Link
              to="/login"
              className={styles.loginLink}
            >
              di sini
            </Link>
          </p>
        </div>
      </div>

      {/* ===== Right Image ===== */}
      <div className={styles.rightSide}>
        <img
          src={IllustrasiLogin}
          alt="Ilustrasi Registrasi"
          className={styles.illustration}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        icon={<CheckOutlined className="text-3xl font-bold" />}
        iconBgColor="bg-green-500"
        title="Pendaftaran Berhasil"
        description="Silahkan login dengan akun Anda"
        primaryButtonText="Login"
        onPrimaryClick={() => navigate('/login')}
      />
    </div>
  );
};

export default RegistrationPage;
