import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactionHistory } from '../../../api/endpoints/transactionApi';
import {
  appendHistory,
  setOffset,
  setHasMore,
  setLoading,
  resetHistory
} from '../../../store/slices/transactionSlice';

const useActions = () => {
  const dispatch = useDispatch();
  const fetched = useRef(false);
  const { history, offset, limit, hasMore, loading } = useSelector((state) => state.transaction);

  const fetchTransactions = async (currentOffset, currentLimit, isInitial = false) => {
    try {
      if (isInitial && fetched.current) return;
      if (isInitial) fetched.current = true;

      dispatch(setLoading(true));
      const response = await getTransactionHistory(currentOffset, currentLimit);

      // console.log(response)
      console.log('DEBUG API RESPONSE:', response);
      if (response.status === 0) {
        // sorting new to old
        const sortedRecords = response.data.records.sort((a, b) => new Date(b.created_on) - new Date(a.created_on));

        // console.log(sortedRecords)
        dispatch(appendHistory(sortedRecords)); // append new array to render
        dispatch(setOffset(currentOffset + currentLimit)); // new offset for getdata from API
        dispatch(setHasMore(sortedRecords.length === currentLimit)); // check if get data history still give 5 item
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    // this is for first render page
    if (history.length === 0 && !fetched.current) {
      dispatch(resetHistory());
      fetchTransactions(0, limit, true);
    }
  }, [dispatch, history.length, limit]);

  const showMore = () => {

    // if there is more data and not on loading state
    if (!loading && hasMore) {
      fetchTransactions(offset, limit);
    }
  };

  return {
    history,
    hasMore,
    loading,
    showMore
  };
};

export default useActions;
