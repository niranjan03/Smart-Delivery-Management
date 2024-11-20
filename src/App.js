import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar'; // A navigation bar component
import Dashboard from './pages/Dashboard'; // Dashboard page
import Orders from './pages/Orders'; // Orders page
import Partners from './pages/Partners'; // Partners page
import NotFound from './pages/NotFound'; // 404 Not Found page
import './App.css'; // Import your CSS styles

const App = () => {
    return (
        <Router>
            <div className="app">
                <Navbar />
                <div className="content">
                    <Routes>
                        <Route path="/" exact component={Dashboard} />
                        <Route path="/orders" component={Orders} />
                        <Route path="/partners" component={Partners} />
                        <Route path="*" component={NotFound} /> {/* Catch-all for 404 */}
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;