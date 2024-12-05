import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // A navigation bar component
import Dashboard from './pages/Dashboard'; // Dashboard page
import Orders from './pages/Orders'; // Orders page
import Partners from './pages/Partners'; // Partners page
import NotFound from './pages/NotFound'; // 404 Not Found page
import './App.css'; // Import your CSS styles
import EditPartner from './components/EditPartnerForm';
import PartnerRegistrationForm from './components/RegistrationFrom';

const App = () => {
    return (
        <Router>
            <div className="app">
                <Navbar />
                <div className="content">
                    <Routes>
                        <Route path="/" exact element={<Dashboard/>} />
                        <Route path="/orders" element={<Orders/>} />
                        <Route path="/partners" element={<Partners/>} />
                        <Route path="/Edit-Partner/:id" element={<EditPartner/>} />
                        <Route path='/partner-registration' element={<PartnerRegistrationForm />}/>
                        <Route path="*" element={<NotFound/>} /> {/* Catch-all for 404 */}
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;