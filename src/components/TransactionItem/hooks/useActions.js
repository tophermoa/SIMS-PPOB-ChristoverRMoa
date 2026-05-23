const useActions = () => {
  const formatCurrency = (num) => {
    return new Intl.NumberFormat('id-ID').format(num);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      const options = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Jakarta',
      };
      return d.toLocaleDateString('id-ID', options) + ' WIB';
    } catch {
      return dateStr;
    }
  };

  return {
    formatCurrency,
    formatDate,
  };
};

export default useActions;
