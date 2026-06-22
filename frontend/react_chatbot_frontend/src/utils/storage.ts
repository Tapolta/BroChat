const STORAGE_KEYS = {
  USER_EMAIL: "user_login_email",
  USER_SESSION_KEY: "user_session_key",
} as const;

export const storageManager = {
  set: (key: string, value: any): void => {
    try {
      const serializedValue = typeof value === "string" ? value : JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(` Error setting localStorage [${key}]:`, error);
    }
  },

  get: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error(` Error getting localStorage [${key}]:`, error);
      return null;
    }
  },

  getJson: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    } catch (error) {
      console.error(` Error parsing JSON dari localStorage [${key}]:`, error);
      return null;
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(` Error removing localStorage [${key}]:`, error);
    }
  },

  setSessionKey: (sessionKey: string) => storageManager.set(STORAGE_KEYS.USER_SESSION_KEY, sessionKey),
  getSessionKey: () => storageManager.get(STORAGE_KEYS.USER_SESSION_KEY),
  clearSessionKey: () => storageManager.remove(STORAGE_KEYS.USER_SESSION_KEY),
  setEmail: (email: string) => storageManager.set(STORAGE_KEYS.USER_EMAIL, email),
  getEmail: () => storageManager.get(STORAGE_KEYS.USER_EMAIL),
  clearEmail: () => storageManager.remove(STORAGE_KEYS.USER_EMAIL),
};

export { STORAGE_KEYS };