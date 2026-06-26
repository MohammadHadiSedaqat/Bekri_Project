export const TEMP_OTP_CODE = "123456";
export const LOGIN_OTP_STORAGE_KEY = "bekri_login_otp_verified";

const TEMP_AUTH_USER_KEY = "bekri_temp_auth_user";
const TEMP_AUTH_ACCOUNTS_KEY = "bekri_temp_auth_accounts";

const isBrowser = typeof window !== "undefined";

const normalizeEmail = (email) => email.trim().toLowerCase();

const getAccounts = () => {
  if (!isBrowser) return [];
  try {
    return JSON.parse(window.localStorage.getItem(TEMP_AUTH_ACCOUNTS_KEY) || "[]");
  } catch {
    return [];
  }
};

const saveAccounts = (accounts) => {
  if (!isBrowser) return;
  window.localStorage.setItem(TEMP_AUTH_ACCOUNTS_KEY, JSON.stringify(accounts));
};

export const isLoginOtpVerified = () => {
  if (!isBrowser) return false;
  return window.sessionStorage.getItem(LOGIN_OTP_STORAGE_KEY) === "true";
};

export const markLoginOtpVerified = () => {
  if (!isBrowser) return;
  window.sessionStorage.setItem(LOGIN_OTP_STORAGE_KEY, "true");
};

export const clearLoginOtp = () => {
  if (!isBrowser) return;
  window.sessionStorage.removeItem(LOGIN_OTP_STORAGE_KEY);
};

export const createTempAccount = (email, password) => {
  const normalizedEmail = normalizeEmail(email);
  const accounts = getAccounts();
  const existingIndex = accounts.findIndex((account) => account.email === normalizedEmail);
  const account = {
    id: `temp_${normalizedEmail}`,
    email: normalizedEmail,
    full_name: normalizedEmail.split("@")[0],
    password,
    is_admin: true,
    role: "admin",
    temporary: true,
  };

  if (existingIndex >= 0) accounts[existingIndex] = { ...accounts[existingIndex], ...account };
  else accounts.push(account);

  saveAccounts(accounts);
  return account;
};

export const validateTempLogin = (email, password) => {
  const normalizedEmail = normalizeEmail(email);
  return getAccounts().find((account) => account.email === normalizedEmail && account.password === password) || null;
};

export const updateTempPassword = (email, password) => {
  const normalizedEmail = normalizeEmail(email);
  const accounts = getAccounts();
  const existingIndex = accounts.findIndex((account) => account.email === normalizedEmail);

  if (existingIndex >= 0) {
    accounts[existingIndex] = { ...accounts[existingIndex], password };
    saveAccounts(accounts);
    return accounts[existingIndex];
  }

  return createTempAccount(normalizedEmail, password);
};

export const setTempSession = (account) => {
  if (!isBrowser || !account) return;
  const { password, ...safeAccount } = account;
  window.localStorage.setItem(TEMP_AUTH_USER_KEY, JSON.stringify(safeAccount));
  markLoginOtpVerified();
};

export const getTempSessionUser = () => {
  if (!isBrowser || !isLoginOtpVerified()) return null;
  try {
    return JSON.parse(window.localStorage.getItem(TEMP_AUTH_USER_KEY) || "null");
  } catch {
    return null;
  }
};

export const clearTempSession = () => {
  if (!isBrowser) return;
  clearLoginOtp();
  window.localStorage.removeItem(TEMP_AUTH_USER_KEY);
};
