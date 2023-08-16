// Only alphanumeric characters are allowed.
export const isUsernameFormat = (username: string) => {
  const regex = /^[a-zA-Z0-9]+$/;
  return regex.test(username);
};

// Email format
export const isEmailFormat = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Password minimal 8 characters
export const isPasswordFormat = (password: string) => {
  const regex = /^.{8,}$/;
  return regex.test(password);
};

// Only alphabet characters are allowed.
export const isPersonNameFormat = (name: string) => {
  const regex = /^[a-zA-Z]+$/;
  return regex.test(name);
}

// Only numeric characters are allowed.
export const isMobileNumberFormat = (mobileNumber: string) => {
  const regex = /^[0-9]+$/;
  return regex.test(mobileNumber);
}