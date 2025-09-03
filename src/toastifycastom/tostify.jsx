import { useState, useEffect } from 'react'

const Notification = ({ notification, removeNotification }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      removeNotification(notification.id)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="notification-item">
      <span>{notification.message}</span>
      <button onClick={() => removeNotification(notification.id)}>X</button>
    </div>
  )
}

export const NotificationList = () => {
  const [notifications, setNotifications] = useState([])

  const addNotification = (message) => {
    const newNotification = {
      id: Date.now(),
      message: message,
    }
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      newNotification,
    ])
  }

  const removeNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    )
  }

  //   useEffect(() => {
  //     const timer = setTimeout(() => {
  //       setNotifications((prevNotifications) => prevNotifications.slice(1))
  //       //removeNotification()
  //     }, 900)
  //     return () => clearTimeout(timer)
  //   }, [notifications])

  return (
    <div className="notification-list">
      <button onClick={() => addNotification('success')}>add success</button>
      <button onClick={() => addNotification('warning')}>add warning</button>
      <button onClick={() => addNotification('error')}>add error</button>
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          notification={notification}
          removeNotification={removeNotification}
        ></Notification>
      ))}
    </div>
  )
}
