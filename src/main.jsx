import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from "react-redux";
import {ThemeProvider} from "./contexts/ThemeProvider.jsx";
import { store, persistor } from "./store/store.js";
import { PersistGate } from "redux-persist/integration/react";
import {createBrowserRouter, RouterProvider} from "react-router";
import {routes} from './routes.jsx';
import SocketProvider from "./contexts/SocketProvider.jsx";

const router = createBrowserRouter(routes)

createRoot(document.getElementById('root')).render(
    <StrictMode>
      <ThemeProvider>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <SocketProvider>
        <RouterProvider router={router} />
      </SocketProvider> 
      </PersistGate>
    </Provider>
    </ThemeProvider>
  </StrictMode>
)
