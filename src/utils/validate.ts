export const validateEmail = (email?: string) => {
  if (!email) return false;

  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

export const isValidLength = (str: string, length = 1) => String(str).length > length