import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MailOutlined, LockOutlined, EyeOutlined, EyeInvisibleOutlined, LoadingOutlined } from '@ant-design/icons';
import useForm from '../../hooks/useForm';
import { validateEmail, validatePassword } from '../../utils/validators';
import { Logo, IllustrasiLogin } from '../../assets';
import useActions from './hooks/useActions';
import { styles } from './styles';
import { Alert, Spin } from "antd";


const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessageAlert, setErrorMessageAlert] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const { loading, loginUser } = useActions();
  const navigate = useNavigate();

  const { values, errors, touched, handleChange, handleBlur, validateAll } =
    useForm(
      { email: '', password: '' },
      {
        email: (value) => validateEmail(value),
        password: (value) => validatePassword(value),
      }
    );

  const customHandleChange = (e) => {
    if (emailErrorMessage) setEmailErrorMessage('');
    handleChange(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateAll();
    if (!isValid) return;

    const respLogin = await loginUser(values.email, values.password);
    if (respLogin.status === 0) {
      navigate("/home");
    } else if (respLogin.status === 102) {
      setEmailErrorMessage(respLogin.message);
    } else if (respLogin.status === 103) {
      setErrorMessageAlert(respLogin.message);
    }
  };

  useEffect(() => {
    if (!errorMessageAlert) return;

    const timer = setTimeout(() => {
      setErrorMessageAlert("");
    }, 3000); // 3 sec

    return () => clearTimeout(timer);
  }, [errorMessageAlert]);

  return (
    <div className={styles.container}>
      {/* ===== Left Side ===== */}
      <div className={styles.leftSide}>
        <div className={styles.formContainer}>
          {/* Logo */}
          <div className={styles.logoContainer}>
            <img src={Logo} alt="SIMS PPOB" className={styles.logoImage} />
            <span className={styles.logoText}>SIMS PPOB</span>
          </div>

          {/* Heading */}
          <h1 className={styles.heading}>
            Masuk atau buat akun
            <br />
            untuk memulai
          </h1>

          {/* Form */}
          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Email Field */}
            <div className={styles.fieldWrapper}>
              <div className={styles.inputWrapper}>
                <div className={styles.iconWrapper}>
                  <MailOutlined className={styles.icon} />
                </div>
                <input
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={customHandleChange}
                  onBlur={handleBlur}
                  placeholder="Masukan email anda"
                  className={`input-field ${emailErrorMessage || (touched.email && errors.email) ? 'error' : ''}`}
                  id="login-email"
                />
              </div>
              {(emailErrorMessage || (touched.email && errors.email)) && (
                <p className="error-text text-right absolute right-0">
                  {emailErrorMessage ? emailErrorMessage : errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className={styles.fieldWrapper}>
              <div className={styles.inputWrapper}>
                <div className={styles.iconWrapper}>
                  <LockOutlined className={styles.icon} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Masukan password anda"
                  className={`input-field pr-12 ${touched.password && errors.password ? 'error' : ''
                    }`}
                  id="login-password"
                />
                {/* Toggle Password Visibility */}
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className={styles.passwordToggle}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeInvisibleOutlined className="text-lg" />
                  ) : (
                    <EyeOutlined className="text-lg" />
                  )}
                </button>
              </div>
              {touched.password && errors.password && (
                <p className="error-text absolute right-0">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button type="submit" className={styles.submitButton} id="login-submit">
              {loading ? <Spin style={{ color: "#FFFFFF" }} indicator={<LoadingOutlined spin />} /> : "Masuk"}
            </button>
          </form>

          {/* Register Link */}
          <p className={styles.registerText}>
            Belum punya akun? Registrasi{' '}
            <Link
              to="/registration"
              className={styles.registerLink}
            >
              di sini
            </Link>
          </p>
        </div>
        {errorMessageAlert && (
          <Alert
            message={errorMessageAlert}
            type="error"
            closable
            onClose={() => setErrorMessageAlert('')}
            className="mt-4 w-full max-w-md"
            style={{ position: "absolute", bottom: 50 }}
          />
        )}
      </div>

      {/* ===== Right Image ===== */}
      <div className={styles.rightSide}>
        <img
          src={IllustrasiLogin}
          alt="Ilustrasi Login"
          className={styles.illustration}
        />
      </div>
    </div>
  );
};

export default LoginPage;
