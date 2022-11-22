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
import Discover from './routes/discover';
import Verifications from './routes/settings/verifications';
import Donations from './routes/settings/donations';
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
                <Route path="/discover" element={<Discover />} />
                <Route path="/verify" element={<Verifications />} />
                <Route path="/donate" element={<Donations />} />
            </Route>
    )
)


export const theme = createTheme({
    palette: {
        mode: 'light'
    },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme>
                <RouterProvider router={router} />
            </CssBaseline>
        </ThemeProvider>
    </React.StrictMode>
);