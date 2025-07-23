import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from "react-redux";
import { store, persistor } from "./store/store.js";
import { PersistGate } from "redux-persist/integration/react";
import {createBrowserRouter, RouterProvider} from "react-router";
import {routes} from './routes.jsx';

const router = createBrowserRouter(routes)

createRoot(document.getElementById('root')).render(
    <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>
)
