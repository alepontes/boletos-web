import {BrowserRouter as Router, Route, Link, Routes, Navigate} from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Invoices from './pages/invoices';
import './App.css';

function App() {
    return (
        <Router>
            <div>
                <header className="app-header">
                    <nav className="nav-bar">
                        <Link to="/dashboard" className="nav-button">Dashboard</Link>
                        <Link to="/invoices" className="nav-button">Faturas</Link>
                    </nav>
                </header>
                <main className="app-content">
                    <Routes>
                        <Route path="*" element={<Navigate to="/invoices" />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/invoices" element={<Invoices />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App
