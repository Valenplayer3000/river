import * as React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    createRoutesFromElements,
    Navigate,
} from "react-router-dom";

import './index.css';

import App from './App';
import Home from './pages/Home';
import { ConfigProvider } from 'antd';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index element={<Navigate replace to="/home" />} />
            <Route path="/home" element={<Home />} />
        </Route>
    )
)


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <ConfigProvider theme={{token: {borderRadius: 6, colorPrimary: '#1677ff',}}}>
            <RouterProvider router={router} />
        </ConfigProvider>
    </React.StrictMode>
);
