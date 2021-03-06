export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');

    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Error while loading state from localStorage');
  }
};

export const deleteState = () => {
  try {
    localStorage.removeItem('state');
  } catch (err) {
    console.error('Error while deleting state from localStorage');
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.error('Error while setting item in localStorage');
  }
};
