import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import MainPage from './pages/MainPage.jsx';
import DetailsPage from './pages/DetailsPage.jsx';
import FavoritePage from './pages/FavoritePage.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainPage />} />
      <Route path="/details/:id" element={<DetailsPage />} />
      <Route path="/favorite" element={<FavoritePage />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
