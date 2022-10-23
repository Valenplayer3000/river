import * as React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    createRoutesFromElements,
    Navigate,
} from "react-router-dom";

import { createTheme, ThemeProvider, experimental_sx as sx } from '@mui/material/styles';

import './index.css';


import App from './routes/App';
import ErrorPage from "./error-page"
import Signup from "./routes/signup/index"
import PostPage from "./routes/post/PostPage"
import SettingPage from './routes/settings/SettingPage';
import Profile from './routes/settings/users/profile';
import PostID from "./routes/post/PostID"
import About from './routes/settings/misc/About';
import BlogsPage from './routes/blogs/index';
import { CssBaseline } from '@mui/material';
;

const router = createBrowserRouter(
    createRoutesFromElements(
            <Route path="/" errorElement={<ErrorPage />} element={<App />}>
                <Route index element={<Navigate replace to="/post" />} />
                <Route path="/post" element={<PostPage />} />
                <Route path="post/:id" element={<PostID />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/setting/" element={<SettingPage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/about" element={<About />} />
                <Route path="/blog" element={<BlogsPage />} />
            </Route>
    )
)


export const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#b4befe',
            dark: '#b4befe'
        },
        secondary: {
            main: '#f5e0dc',
            dark: '#f5e0dc'
        },
        background: {
            default: '#1e1e2e',
            paper: '#313244',
        },
        divider: '#6c7086',
        success: {
            main: '#a6e3a1',
            dark: '#a6e3a1'
        },
        text: {
            primary: '#cdd6f4',
            disabled: '#a6adc8',
            secondary: '#bac2de'
        },
        error: {
            main: '#f38ba8',
            dark: '#f38ba8'
        },
        warning: {
            main: '#fab387',
            dark: '#fab387'
        },
        info: {
            main: '#89dceb',
            dark: '#89dceb'
        },
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: sx({
                    borderRadius: 2
                })
            }
        }
    },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline>
                <RouterProvider router={router} />
            </CssBaseline>
        </ThemeProvider>
    </React.StrictMode>
);