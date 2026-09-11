import React, {
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";

export const NotificationContext = createContext(null);

const DEFAULT_DURATION = 5000;

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  /*
   * Remove a notification by ID
   */
  const removeNotification = useCallback((id) => {
    setNotifications((currentNotifications) =>
      currentNotifications.filter(
        (notification) => notification.id !== id
      )
    );
  }, []);

  /*
   * Add a new notification
   */
  const addNotification = useCallback(
    ({
      title = "Notification",
      message = "",
      type = "info",
      duration = DEFAULT_DURATION,
    }) => {
      const id = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 9)}`;

      const notification = {
        id,
        title,
        message,
        type,
        duration,
      };

      setNotifications((currentNotifications) => [
        ...currentNotifications,
        notification,
      ]);

      /*
       * Automatically remove notification
       */
      if (duration > 0) {
        setTimeout(() => {
          removeNotification(id);
        }, duration);
      }

      return id;
    },
    [removeNotification]
  );

  /*
   * Success notification
   */
  const success = useCallback(
    (message, title = "Success") => {
      return addNotification({
        title,
        message,
        type: "success",
      });
    },
    [addNotification]
  );

  /*
   * Error notification
   */
  const error = useCallback(
    (message, title = "Error") => {
      return addNotification({
        title,
        message,
        type: "error",
      });
    },
    [addNotification]
  );

  /*
   * Warning notification
   */
  const warning = useCallback(
    (message, title = "Warning") => {
      return addNotification({
        title,
        message,
        type: "warning",
      });
    },
    [addNotification]
  );

  /*
   * Info notification
   */
  const info = useCallback(
    (message, title = "Information") => {
      return addNotification({
        title,
        message,
        type: "info",
      });
    },
    [addNotification]
  );

  /*
   * Remove all notifications
   */
  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  /*
   * Context value
   */
  const contextValue = useMemo(
    () => ({
      notifications,
      addNotification,
      removeNotification,
      success,
      error,
      warning,
      info,
      clearAll,
    }),
    [
      notifications,
      addNotification,
      removeNotification,
      success,
      error,
      warning,
      info,
      clearAll,
    ]
  );

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;