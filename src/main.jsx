import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './App/AppRouter.jsx'
//import { TostiFy, NotificationList } from './toastifycastom/tostify.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppRouter />
    {/* <NotificationList></NotificationList> */}
  </BrowserRouter>
)

// class MyPromise {
//   constructor(executor) {
//     this.state = 'pending'
//     this.value = undefined
//     this.reason = undefined
//     this.onFulfilledCallbacks = []
//     this.onRejectedCallbacks = []

//     const resolve = (value) => {
//       if (this.state === 'pending') {
//         this.state = 'fulfilled'
//         this.value = value
//         this.onFulfilledCallbacks.forEach((callback) => callback(this.value))
//       }
//     }

//     const reject = (reason) => {
//       if (this.state === 'pending') {
//         this.state = 'rejected'
//         this.reason = reason
//         this.onRejectedCallbacks.forEach((callback) => callback(this.reason))
//       }
//     }

//     try {
//       executor(resolve, reject)
//     } catch (error) {
//       reject(error)
//     }
//   }

//   then(onFulfilled, onRejected) {
//     if (typeof onFulfilled !== 'function') {
//       onFulfilled = (value) => value
//     }
//     if (typeof onRejected !== 'function') {
//       onRejected = (reason) => {
//         throw reason
//       }
//     }

//     const newPromise = new MyPromise((resolve, reject) => {
//       const handleFulfilled = (value) => {
//         try {
//           const result = onFulfilled(value)
//           if (result && typeof result.then === 'function') {
//             result.then(resolve, reject)
//           } else {
//             resolve(result)
//           }
//         } catch (error) {
//           reject(error)
//         }
//       }

//       const handleRejected = (reason) => {
//         try {
//           const result = onRejected(reason)
//           if (result && typeof result.then === 'function') {
//             result.then(resolve, reject)
//           } else {
//             reject(result)
//           }
//         } catch (error) {
//           reject(error)
//         }
//       }

//       if (this.state === 'fulfilled') {
//         handleFulfilled(this.value)
//       } else if (this.state === 'rejected') {
//         handleRejected(this.reason)
//       } else {
//         this.onFulfilledCallbacks.push(handleFulfilled)
//         this.onRejectedCallbacks.push(handleRejected)
//       }
//     })
//     return newPromise
//   }

//   catch(onRejected) {
//     return this.then(null, onRejected)
//   }
// }

// // Пример использования
// const promise = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('Успех!')
//   }, 1000)
// })

// promise.then(
//   (value) => {
//     console.log('then:', value) // Вывод: then: Успех!
//   },
//   (reason) => {
//     console.log('catch:', reason)
//   }
// )
