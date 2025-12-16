import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import { Container } from 'react-bootstrap';

const Layout = () => {
    return (
        <>
            <Navigation />
            <Container className="main-content-spacer">
                <Outlet />
            </Container>
            <footer className="text-center mt-5 py-3 text-white border-top">
                &copy; {new Date().getFullYear()} Smart Expense Manager. All rights reserved.
            </footer>
        </>
    );
};

export default Layout;
