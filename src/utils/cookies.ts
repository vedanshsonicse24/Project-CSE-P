import Cookies from 'js-cookie';

// Cookie configuration
export const COOKIE_CONFIG = {
  // Session cookies (expire when browser closes)
  session: {
    expires: undefined,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
  },
  // Persistent cookies (7 days)
  persistent: {
    expires: 7,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
  },
  // Long-term cookies (30 days)
  longTerm: {
    expires: 30,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
  },
};

// Cookie keys
export const COOKIE_KEYS = {
  USER_ROLE: 'sankhya_user_role',
  USER_NAME: 'sankhya_user_name',
  USER_EMAIL: 'sankhya_user_email',
  USER_ID: 'sankhya_user_id',
  REMEMBER_LOGIN: 'sankhya_remember_login',
  THEME_PREFERENCE: 'sankhya_theme',
  DASHBOARD_SECTION: 'sankhya_dashboard_section',
  LANGUAGE_PREFERENCE: 'sankhya_language',
  SIDEBAR_COLLAPSED: 'sankhya_sidebar_collapsed',
} as const;

// User session management
export const UserCookies = {
  // Set user session
  setUserSession: (userRole: string, userName: string, userEmail?: string, remember = false) => {
    const config = remember ? COOKIE_CONFIG.longTerm : COOKIE_CONFIG.session;
    
    Cookies.set(COOKIE_KEYS.USER_ROLE, userRole, config);
    Cookies.set(COOKIE_KEYS.USER_NAME, userName, config);
    if (userEmail) {
      Cookies.set(COOKIE_KEYS.USER_EMAIL, userEmail, config);
    }
    Cookies.set(COOKIE_KEYS.REMEMBER_LOGIN, remember.toString(), config);
  },

  // Get user session
  getUserSession: () => {
    return {
      userRole: Cookies.get(COOKIE_KEYS.USER_ROLE) as "faculty" | "student" | "hod" | "admin" | undefined,
      userName: Cookies.get(COOKIE_KEYS.USER_NAME),
      userEmail: Cookies.get(COOKIE_KEYS.USER_EMAIL),
      rememberLogin: Cookies.get(COOKIE_KEYS.REMEMBER_LOGIN) === 'true',
    };
  },

  // Clear user session
  clearUserSession: () => {
    Cookies.remove(COOKIE_KEYS.USER_ROLE);
    Cookies.remove(COOKIE_KEYS.USER_NAME);
    Cookies.remove(COOKIE_KEYS.USER_EMAIL);
    Cookies.remove(COOKIE_KEYS.REMEMBER_LOGIN);
  },

  // Check if user is logged in
  isLoggedIn: () => {
    return !!Cookies.get(COOKIE_KEYS.USER_ROLE);
  },
};

// Preferences management
export const PreferenceCookies = {
  // Theme preference
  setTheme: (theme: 'light' | 'dark' | 'system') => {
    Cookies.set(COOKIE_KEYS.THEME_PREFERENCE, theme, COOKIE_CONFIG.longTerm);
  },

  getTheme: (): 'light' | 'dark' | 'system' => {
    return (Cookies.get(COOKIE_KEYS.THEME_PREFERENCE) as 'light' | 'dark' | 'system') || 'system';
  },

  // Dashboard section preference
  setDashboardSection: (section: string) => {
    Cookies.set(COOKIE_KEYS.DASHBOARD_SECTION, section, COOKIE_CONFIG.persistent);
  },

  getDashboardSection: (): string => {
    return Cookies.get(COOKIE_KEYS.DASHBOARD_SECTION) || 'dashboard';
  },

  // Language preference
  setLanguage: (language: string) => {
    Cookies.set(COOKIE_KEYS.LANGUAGE_PREFERENCE, language, COOKIE_CONFIG.longTerm);
  },

  getLanguage: (): string => {
    return Cookies.get(COOKIE_KEYS.LANGUAGE_PREFERENCE) || 'en';
  },

  // Sidebar state
  setSidebarCollapsed: (collapsed: boolean) => {
    Cookies.set(COOKIE_KEYS.SIDEBAR_COLLAPSED, collapsed.toString(), COOKIE_CONFIG.longTerm);
  },

  getSidebarCollapsed: (): boolean => {
    return Cookies.get(COOKIE_KEYS.SIDEBAR_COLLAPSED) === 'true';
  },
};

// General cookie utilities
export const CookieUtils = {
  // Set any cookie with custom configuration
  set: (key: string, value: string, config = COOKIE_CONFIG.persistent) => {
    Cookies.set(key, value, config);
  },

  // Get any cookie
  get: (key: string): string | undefined => {
    return Cookies.get(key);
  },

  // Remove any cookie
  remove: (key: string) => {
    Cookies.remove(key);
  },

  // Clear all Sankhya cookies
  clearAll: () => {
    Object.values(COOKIE_KEYS).forEach(key => {
      Cookies.remove(key);
    });
  },

  // Check if cookies are enabled
  areCookiesEnabled: (): boolean => {
    try {
      const testKey = 'sankhya_cookie_test';
      Cookies.set(testKey, 'test');
      const result = Cookies.get(testKey) === 'test';
      Cookies.remove(testKey);
      return result;
    } catch {
      return false;
    }
  },
};

// Cookie consent management
export const ConsentCookies = {
  CONSENT_KEY: 'sankhya_cookie_consent',
  
  setConsent: (consent: 'accepted' | 'declined' | 'partial') => {
    Cookies.set(ConsentCookies.CONSENT_KEY, consent, COOKIE_CONFIG.longTerm);
  },

  getConsent: (): 'accepted' | 'declined' | 'partial' | null => {
    const consent = Cookies.get(ConsentCookies.CONSENT_KEY);
    return consent as 'accepted' | 'declined' | 'partial' | null;
  },

  hasConsent: (): boolean => {
    return !!Cookies.get(ConsentCookies.CONSENT_KEY);
  },

  clearConsent: () => {
    Cookies.remove(ConsentCookies.CONSENT_KEY);
  },
};

export default {
  UserCookies,
  PreferenceCookies,
  CookieUtils,
  ConsentCookies,
  COOKIE_KEYS,
  COOKIE_CONFIG,
};