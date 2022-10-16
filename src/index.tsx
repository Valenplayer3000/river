import * as React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import './index.css';


import App from './routes/App';
import ErrorPage from "./error-page"
import Signup from "./routes/signup/index"
import PostPage from "./routes/PostPage"
import SettingPage from './routes/settings/SettingPage';
import Profile from './routes/settings/users/profile';
import PostID from "./routes/PostID"
import About from './routes/settings/misc/About';
import BlogsPage from './routes/blogs/index';
import { CssBaseline } from '@mui/material';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<ErrorPage />} element={<App />}>
      <Route index element={<Navigate replace to="/post" />} />
      <Route path="/post" element={<PostPage />} >
        {/*
          Status: Feature not implemented 
          <Route path="/:id" element={<PostID />} /> 
        */}
      </Route>
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
      main: '#89b4fa',
    },
    secondary: {
      main: '#cba6f7',
    },
    background: {
      default: '#1e1e2e',
      paper: '#313244',
    },
    divider: '#6c7086',
    success: {
      main: '#a6e3a1',
    },
    text: {
      primary: '#cdd6f4',
    },
    error: {
      main: '#f38ba8',
    },
    warning: {
      main: '#fab387',
    },
    info: {
      main: '#89dceb',
    },
  },
  shape: {
    borderRadius: 0,
  },
  typography: {
    fontFamily: 'JetBrains Mono',
  },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <head>
      {/* The title of the page. */}
      <title>River (Open Beta)</title>

      {/* For social media. */}
      <meta
        name="description"
        content="A new way to communicate with friends"
      />
      <meta property="og:url" content="https://rivermain.vercel.app" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="River (Open Beta)" />
      <meta
        property="og:description"
        content="A new way to communicate with friends"
      />
      <meta
        property="og:image"
        content="https://user-images.githubusercontent.com/64864880/191989005-40c643d1-aad9-4031-a923-861d9e932ecb.png"
      />

      <meta
        name="twitter:card"
        content="A new way to communicate with friends"
      />
      <meta property="twitter:domain" content="rivermain.vercel.app" />
      <meta property="twitter:url" content="https://rivermain.vercel.app" />
      <meta name="twitter:title" content="River (Open Beta)" />
      <meta
        name="twitter:description"
        content="A new way to communicate with friends"
      />
      <meta
        name="twitter:image"
        content="https://user-images.githubusercontent.com/64864880/191989005-40c643d1-aad9-4031-a923-861d9e932ecb.png"
      />

      {/* For the PWA. */}

      <link rel="icon" href="favicon.ico" />
      <link rel="manifest" href="/manifest.json" />
    </head>

    <ThemeProvider theme={theme}>
      <CssBaseline>
        <RouterProvider router={router} />
      </CssBaseline>
    </ThemeProvider >

  </React.StrictMode>
);