export const SET_ACTIVE = 'SET_ACTIVE';
export const SET_TOAST = 'SET_TOAST';
export const RESET_TOAST = 'RESET_TOAST';

export const setActive = (page) => ({
  type: SET_ACTIVE,
  payload: page,
});

export const resetToast = () => ({
  type: RESET_TOAST,
});

export const setToast = (message) => ({
  type: SET_TOAST,
  payload: message,
});
