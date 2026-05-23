import { useState } from 'react';
import TransactionItem from '../../components/TransactionItem';
import useActions from './hooks/useActions';
import { styles } from './styles';
import { Spin, Skeleton } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const TransactionPage = () => {
  const { history, hasMore, showMore, loading } = useActions();

  return (
    <>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Semua Transaksi</h2>
      </div>

      {/* transaction List */}
      <div className={styles.listContainer}>
        {loading && history.length === 0 ? (
          [...Array(5)].map((_, i) => (
            <div key={`skeleton-${i}`} className="border border-gray-200 rounded-lg p-4 mb-4 bg-white">
              <Skeleton active title={false} paragraph={{ rows: 2, width: ['30%', '15%'] }} />
            </div>
          ))
        ) : (
          <>
            {history.map((transaction, index) => (
              <TransactionItem
                key={`${transaction.invoice_number}-${index}`}
                type={transaction.transaction_type}
                amount={transaction.total_amount}
                date={transaction.created_on}
                description={transaction.description}
              />
            ))}

            {/* skeleton for append loading */}
            {loading && history.length > 0 && (
              <div className="border border-gray-200 rounded-lg p-4 mb-4 bg-white">
                <Skeleton active title={false} paragraph={{ rows: 2, width: ['30%', '15%'] }} />
              </div>
            )}
          </>
        )}
      </div>

      {/* empty State */}
      {history.length === 0 && !loading && (
        <div className={styles.emptyState}>
          <p className={styles.emptyText}>Maaf belum ada transaksi</p>
        </div>
      )}

      {/* show more */}
      {hasMore && history.length > 0 && (
        <div className={styles.showMoreContainer}>
          <button
            onClick={showMore}
            className={styles.showMoreButton}
            id="transaction-show-more"
          >
            {loading ?
              <Spin style={{ color: "#FFFFFF" }} indicator={<LoadingOutlined spin />} />
              : 'Show more'
            }
          </button>
        </div>
      )}
    </>
  );
};

export default TransactionPage;
