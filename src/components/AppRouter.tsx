// AppRouter.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Debug from './Debug';
import MainScreen from "./MainScreen";

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainScreen />} />
                <Route path="/debug" element={<Debug />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;