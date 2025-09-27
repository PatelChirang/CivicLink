import React, { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export function useNotification() {
  return useContext(NotificationContext);
}

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message }]);

    // Auto remove after 5s
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 300000);
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}

      {/* Popup container */}
      <div className="fixed top-4 right-4 space-y-3 z-50">
        {notifications.map((n) => (
          <div
            key={n.id}
            className="bg-sky-600 text-white px-4 py-2 rounded-xl shadow-md"
          >
            {n.message}
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
}
