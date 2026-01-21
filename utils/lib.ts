// --- Persistence Logic using localStorage ---
const loadCurrentUser = () => {
  try {
    const result = localStorage.getItem("current-user");
    if (result) {
      const userData = JSON.parse(result);
      return userData;
    }
  } catch (error) {
    return null;
  }
};
export { loadCurrentUser };

