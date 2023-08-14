export const useLocalStorage = () => {
  const handleSave = (key: string, value: string) => {
    localStorage.setItem(key, value); // Save data to local storage
  };
  const handleLoad = (key: string) => {
    const savedValue = localStorage.getItem(key); // Load data from local storage
    return savedValue;
  };
  const handleDelete = (key: string) => {
    localStorage.removeItem(key); // Delete data from local storage
  };
  return { handleSave, handleLoad, handleDelete };
};
