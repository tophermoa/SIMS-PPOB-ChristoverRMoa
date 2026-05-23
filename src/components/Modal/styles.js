export const styles = {
  overlay: "fixed inset-0 z-50 flex items-center justify-center bg-black/30 transition-opacity",
  modalContainer: "bg-white rounded-xl p-8 w-11/12 max-w-sm flex flex-col items-center text-center shadow-xl transform transition-all",
  iconCircle: (colorClass) => `w-16 h-16 rounded-full flex items-center justify-center mb-6 ${colorClass || 'bg-gray-200'}`,
  icon: "text-white text-2xl",
  title: "text-base text-gray-700 mb-1",
  amount: "text-2xl font-bold text-gray-900 mb-1",
  description: "text-base text-gray-700 mb-8",
  buttonContainer: "flex flex-col w-full gap-3",
  primaryButton: "w-full text-red-500 font-bold text-base py-2 hover:bg-red-50 rounded-md transition-colors",
  secondaryButton: "w-full text-gray-400 font-bold text-base py-2 hover:bg-gray-50 rounded-md transition-colors"
};
