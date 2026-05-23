import { useState } from 'react';
import { Skeleton } from 'antd';
import useActions from './hooks/useActions';
import { styles } from './styles';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

const BalanceCard = () => {
  const [showBalance, setShowBalance] = useState(false);
  const { balanceState, loading } = useActions();

  const toggleBalance = () => {
    setShowBalance((prev) => !prev);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID').format(amount);
  };

  return (
    <div className={styles.container}>
      {loading ? (
        <div className="mb-2">
          <Skeleton.Input active size="small" style={{ width: 100 }} />
        </div>
      ) : (
        <p className={styles.label}>Saldo anda</p>
      )}

      <div className={styles.balanceWrapper}>
        {loading ? (
          <Skeleton.Input active size="large" style={{ width: 180 }} />
        ) : (
          <>
            <span className={styles.currency}>Rp</span>
            {showBalance ? (
              <span className={styles.amount}>
                {formatCurrency(balanceState)}
              </span>
            ) : (
              <span className={styles.maskedAmount}>●●●●●●●</span>
            )}
          </>
        )}
      </div>

      {loading ? (
        <div className="mt-4">
          <Skeleton.Input active size="small" style={{ width: 110 }} />
        </div>
      ) : (
        <button
          onClick={toggleBalance}
          className={styles.toggleButton}
        >
          {showBalance ? 'Tutup Saldo' : 'Lihat Saldo'}
          {showBalance ? (
            <EyeInvisibleOutlined style={{ fontSize: '12px' }} />
          ) : (
            <EyeOutlined style={{ fontSize: '12px' }} />
          )}
        </button>
      )}
    </div>
  );
};

export default BalanceCard;
