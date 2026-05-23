export const styles = {
  container: "transaction-item",
  leftSide: "flex flex-col",
  amountText: (isTopUp) => `text-lg font-semibold ${isTopUp ? 'text-emerald-500' : 'text-red-500'}`,
  dateText: "text-xs text-gray-400 mt-1",
  descriptionText: "text-sm text-gray-500 font-medium"
};
