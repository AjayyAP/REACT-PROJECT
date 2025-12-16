import { useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navigation = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
        setExpanded(false);
    };

    return (
        <Navbar
            fixed="top"
            expand="lg"
            className="glass-card py-2 py-md-3 rounded-0"
            style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}
            expanded={expanded}
        >
            <Container>
                <Navbar.Brand as={Link} to="/dashboard" className="d-flex align-items-center gap-2" onClick={() => setExpanded(false)}>
                    <div className="rounded-circle d-flex align-items-center justify-content-center bg-primary-subtle text-primary" style={{ width: 32, height: 32 }}>
                        <i className="bi bi-wallet2"></i>
                    </div>
                    <span className="fw-bold text-gradient fs-5 fs-md-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Expense Manager</span>
                </Navbar.Brand>
                <Navbar.Toggle
                    aria-controls="basic-navbar-nav"
                    className="border-0 shadow-none text-white"
                    onClick={() => setExpanded(!expanded)}
                >
                    <i className="bi bi-list fs-1 fs-md-2"></i>
                </Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto align-items-center gap-2 gap-lg-4 mt-3 mt-lg-0">
                        {['Dashboard', 'Expenses', 'AI Insights'].map((item) => (
                            <Nav.Link
                                key={item}
                                as={Link}
                                to={item === 'Dashboard' ? '/dashboard' : `/dashboard/${item.toLowerCase().replace(' ', '-')}`}
                                className="text-white-50 fw-medium position-relative px-0 py-2 py-lg-0 link-hover-effect touch-target"
                                style={{ transition: 'color 0.3s' }}
                                onClick={() => setExpanded(false)}
                            >
                                {item}
                            </Nav.Link>
                        ))}
                    </Nav>
                    <Nav className="align-items-center gap-3 mt-3 mt-lg-0">
                        {user && (
                            <div className="d-flex align-items-center px-3 py-2 rounded-pill" style={{ background: 'rgba(255, 255, 255, 0.05)', fontSize: 'clamp(0.8rem, 2vw, 0.9rem)' }}>
                                <div className="rounded-circle bg-gradient-primary d-flex align-items-center justify-content-center text-white me-2" style={{ width: 24, height: 24, fontSize: '0.7rem' }}>
                                    <i className="bi bi-person-fill"></i>
                                </div>
                                <span className="text-white small me-1 d-none d-sm-inline">Hi,</span>
                                <span className="text-white fw-semibold small">{user.name?.split(' ')[0] || 'User'}</span>
                            </div>
                        )}
                        <Button
                            variant="link"
                            onClick={handleLogout}
                            className="text-white-50 text-decoration-none p-2 d-flex align-items-center hover-text-danger transition-all touch-target"
                        >
                            <i className="bi bi-box-arrow-right fs-5"></i>
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
