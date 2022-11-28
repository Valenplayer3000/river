import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/main.css'

import { ConfigProvider } from 'antd'

import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Setting from './components/SettingComponent'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Navigate replace to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/setting" element={<Setting />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#ED4192',
          borderRadius: 16
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>
)
