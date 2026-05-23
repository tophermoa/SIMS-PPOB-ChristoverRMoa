import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WalletOutlined, LoadingOutlined, CreditCardOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';
import useActions from './hooks/useActions';
import { styles } from './styles';
import Modal from '../../components/Modal';
import { Spin } from 'antd';


const PaymentPage = () => {
  const navigate = useNavigate();
  const { serviceSelected, payService, refetchBalance, loading } = useActions();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalState, setModalState] = useState('confirm'); // confirm | success | error
  const [responseMessage, setResponseMessage] = useState('');

  const handlePay = (e) => {
    e.preventDefault();
    setModalState('confirm');
    setIsModalOpen(true);
  };

  if (!serviceSelected) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 100 }}>
        <Spin indicator={<LoadingOutlined spin style={{ fontSize: 40 }} />} />
      </div>
    );
  }

  const handleConfirmPayment = async () => {
    const response = await payService(serviceSelected.service_code);

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
          title={`Beli ${serviceSelected.service_name} senilai`}
          amount={`Rp ${new Intl.NumberFormat('id-ID').format(serviceSelected.service_tariff || 0)} ?`}
          primaryButtonText={
            loading ?
              <Spin style={{ color: "#FFFFFF" }} indicator={<LoadingOutlined spin />} /> :
              "Ya, lanjutkan Bayar"
          }
          onPrimaryClick={handleConfirmPayment}
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
          title={`Pembayaran ${serviceSelected.service_name} sebesar`}
          amount={`Rp ${new Intl.NumberFormat('id-ID').format(serviceSelected.service_tariff || 0)}`}
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
          title={`Pembayaran ${serviceSelected.service_name} sebesar`}
          amount={`Rp ${new Intl.NumberFormat('id-ID').format(serviceSelected.service_tariff || 0)}`}
          description={responseMessage || "gagal"}
          primaryButtonText="Kembali ke Beranda"
          onPrimaryClick={handleNavigateHome}
        />
      );
    }
    return null;
  };

  return (
    <>

      {/* Payment Form Section */}
      <div className={styles.paymentSection}>
        <p className={styles.subtitle}>PemBayaran</p>

        <div className={styles.serviceHeader}>
          {serviceSelected.service_icon ? (
            <img src={serviceSelected.service_icon} alt={serviceSelected.service_name} className={styles.serviceIcon} />
          ) : (
            <div className={styles.serviceIconPlaceholder} />
          )}
          <h2 className={styles.serviceName}>{serviceSelected.service_name}</h2>
        </div>

        <form onSubmit={handlePay} className={styles.form}>
          <div className={styles.inputWrapper}>
            <div className={styles.iconWrapper}>
              <WalletOutlined className="text-lg" />
            </div>
            <input
              type="text"
              value={Number(serviceSelected.service_tariff).toLocaleString('id-ID')}
              readOnly
              className={styles.input}
            // placeholder="10.000"
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Bayar
          </button>
        </form>
      </div>

      {/* Modals */}
      {renderModal()}
    </>
  );
};

export default PaymentPage;
