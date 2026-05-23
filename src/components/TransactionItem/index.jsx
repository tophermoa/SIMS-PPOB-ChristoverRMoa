import useActions from './hooks/useActions';
import { styles } from './styles';

const TransactionItem = ({ type = 'TOPUP', amount = 0, date = '', description = '' }) => {
  // differentiate by transaction_type
  const isTopUp = type === 'TOPUP';
  const { formatCurrency, formatDate } = useActions();

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <span className={styles.amountText(isTopUp)}>
          {isTopUp ? '+' : '-'} Rp.{formatCurrency(amount)}
        </span>
        <span className={styles.dateText}>
          {formatDate(date)}
        </span>
      </div>

      <span className={styles.descriptionText}>
        {description}
      </span>
    </div>
  );
};

export default TransactionItem;
