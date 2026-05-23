import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import useActions from './hooks/useActions';
import { styles } from './styles';
import Modal from '../../components/Modal';
import { Spin } from 'antd';
import { LoadingOutlined, CreditCardOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';

const PRESET_AMOUNTS = [10000, 20000, 50000, 100000, 250000, 500000];

const TopupPage = () => {
  const navigate = useNavigate();
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalState, setModalState] = useState('confirm');
  const [responseMessage, setResponseMessage] = useState('');

  const { topUpBalance, refetchBalance, loading } = useActions();

  const { values, errors, touched, handleChange, handleBlur, setFieldValue, validateAll } =
    useForm(
      { amount: '' },
      {
        amount: (value) => {
          if (!value) return "Nominal Top Up harus diisi";
          const amount = Number(value);
          if (amount < 10000) return "Minimum Top Up adalah Rp10.000";
          if (amount > 1000000) return "Maksimum Top Up adalah Rp1.000.000";
          return null;
        }
      }
    );

  // Handle preset click — sets the input value.
  const handlePresetClick = (amount) => {
    setSelectedPreset(amount);
    setFieldValue('amount', amount.toString());
  };

  // Handle custom input change — clears preset selection.
  const handleAmountChange = (e) => {
    setSelectedPreset(null);
    handleChange(e);
  };

  // convert number to Rp 
  const formatPresetLabel = (amount) => {
    return `Rp${new Intl.NumberFormat('id-ID').format(amount)}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateAll();
    if (!isValid) return;

    setModalState('confirm');
    setIsModalOpen(true);
  };

  const handleConfirmTopUp = async () => {
    const response = await topUpBalance(values.amount);

    if (response.success) {
      setModalState('success');

    } else {
      setModalState('error');
      setResponseMessage(response.message);
    }
  };

  const handleNavigateHome = async () => {
    await refetchBalance();
    setIsModalOpen(false);
    navigate('/home');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);

    // setTimeout(() => {
    setModalState('confirm');
    // }, 300);
  };

  const renderModal = () => {
    if (modalState === 'confirm') {
      return (
        <Modal
          isOpen={isModalOpen}
          icon={
            <div
              style={{
                width: 70,
                height: 70,
                borderRadius: "50%",
                backgroundColor: "red",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <CreditCardOutlined style={{ color: "white" }} />
            </div>}
          iconBgColor="gray"
          title="Anda yakin untuk Top Up sebesar"
          amount={`Rp ${new Intl.NumberFormat('id-ID').format(values.amount || 0)} ?`}
          primaryButtonText={
            loading ?
              <Spin style={{ color: "#FFFFFF" }} indicator={<LoadingOutlined spin />} /> : "Ya, lanjutkan Top Up"
          }
          onPrimaryClick={handleConfirmTopUp}
          secondaryButtonText="Batalkan"
          onSecondaryClick={handleCloseModal}
        />
      );
    }

    if (modalState === 'success') {
      return (
        <Modal
          isOpen={isModalOpen}
          icon={
            <div
              style={{
                width: 70,
                height: 70,
                borderRadius: "50%",
                backgroundColor: "green",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <CheckOutlined style={{ color: "white" }} />
            </div>}
          iconBgColor="green"
          title="Top Up sebesar"
          amount={`Rp ${new Intl.NumberFormat('id-ID').format(values.amount || 0)}`}
          description="berhasil!"
          primaryButtonText="Kembali ke Beranda"
          onPrimaryClick={handleNavigateHome}
        />
      );
    }

    if (modalState === 'error') {
      return (
        <Modal
          isOpen={isModalOpen}
          icon={
            <div
              style={{
                width: 70,
                height: 70,
                borderRadius: "50%",
                backgroundColor: "red",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <CloseOutlined style={{ color: "white" }} />
            </div>}
          iconBgColor="red"
          title="Top Up sebesar"
          amount={`Rp ${new Intl.NumberFormat('id-ID').format(values.amount || 0)}`}
          description={responseMessage || "gagal"}
          primaryButtonText="Kembali ke Beranda"
          onPrimaryClick={handleNavigateHome}
        />
      );
    }
    return null;
  };

  const isAmountValid = values.amount && Number(values.amount) >= 10000 && Number(values.amount) <= 1000000;

  return (
    <>
      <div className={styles.titleContainer}>
        <p className={styles.subtitle}>Silahkan masukan</p>
        <h2 className={styles.title}>
          Nominal Top Up
        </h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={styles.formContainer}>
          {/* Left */}
          <div className={styles.leftColumn}>

            {/* Amount Input */}
            <div className={styles.fieldWrapper}>
              <div className={styles.inputWrapper}>
                <div className={styles.iconWrapper}>
                  <CreditCardOutlined />
                </div>
                <input
                  type="number"
                  name="amount"
                  value={values.amount}
                  onChange={handleAmountChange}
                  onBlur={handleBlur}
                  placeholder="masukan nominal Top Up"
                  className={`input-field ${touched.amount && errors.amount ? 'error' : ''}`}
                  id="topup-amount"
                  min="10000"
                  max="1000000"
                />
              </div>
              {touched.amount && errors.amount && (
                <p className="error-text mt-1">{errors.amount}</p>
              )}
            </div>

            {/* button */}
            <button
              type="submit"
              className={styles.submitButton}
              disabled={!isAmountValid}
              id="topup-submit"
            >
              Top Up
            </button>
          </div>

          {/* Right */}
          <div className={styles.rightColumn}>
            {PRESET_AMOUNTS.map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => handlePresetClick(amount)}
                className={`btn-preset ${selectedPreset === amount ? 'active' : ''}`}
              >
                {formatPresetLabel(amount)}
              </button>
            ))}
          </div>
        </div>
      </form>

      {/* Modal */}
      {renderModal()}
    </>
  );
};

export default TopupPage;
