import React from "react";
import { Routes, Route } from "react-router-dom";
import { ROUTES } from "../utils/routes";
import HomePage from "../pages/Home/HomePage";
import DiscoverPage from "../pages/Discover/DiscoverPage";
import ArtistsPage from "../pages/Artists/ArtistsPage";
import ErrorPage from "../pages/Error/ErrorPage";

const AppRoutes = () => (
    <Routes>
        <Route index element={<HomePage />} />
        <Route path={ROUTES.DISCOVER} element={<DiscoverPage />} />
        <Route path={ROUTES.ARTISTS} element={<ArtistsPage />} />
        <Route path="*" element={<ErrorPage />} />
    </Routes>
);

export default AppRoutes;