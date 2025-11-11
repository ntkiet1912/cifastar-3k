import { useAuthStore, selectIsAuthenticated, selectUser, selectToken } from '@/stores/useAuthStore';
import { useThemeStore } from '@/stores/useThemeStore';
import { useNotificationStore } from '@/stores/useNotificationStore';
import { useLoadingStore, selectIsLoading } from '@/stores/useLoadingStore';

/**
 * Custom hook for auth state and actions
 */
export const useAuth = () => {
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const user = useAuthStore(selectUser);
  const token = useAuthStore(selectToken);
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const updateUser = useAuthStore((state) => state.updateUser);

  return {
    isAuthenticated,
    user,
    token,
    setAuth,
    clearAuth,
    updateUser,
  };
};

/**
 * Custom hook for theme state and actions
 */
export const useTheme = () => {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const setTheme = useThemeStore((state) => state.setTheme);

  return {
    theme,
    toggleTheme,
    setTheme,
  };
};

/**
 * Custom hook for notifications
 */
export const useNotification = () => {
  const addNotification = useNotificationStore((state) => state.addNotification);
  const removeNotification = useNotificationStore((state) => state.removeNotification);
  const clearNotifications = useNotificationStore((state) => state.clearNotifications);

  return {
    addNotification,
    removeNotification,
    clearNotifications,
  };
};

/**
 * Custom hook for loading state
 */
export const useLoading = () => {
  const isLoading = useLoadingStore(selectIsLoading);
  const loadingMessage = useLoadingStore((state) => state.loadingMessage);
  const startLoading = useLoadingStore((state) => state.startLoading);
  const stopLoading = useLoadingStore((state) => state.stopLoading);
  const clearLoading = useLoadingStore((state) => state.clearLoading);

  return {
    isLoading,
    loadingMessage,
    startLoading,
    stopLoading,
    clearLoading,
  };
};
