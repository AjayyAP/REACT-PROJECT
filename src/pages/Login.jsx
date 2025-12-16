import { useState } from 'react';
import { Form, Button, Container, Card, Alert, Spinner, InputGroup } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiMail, HiLockClosed, HiEye, HiEyeOff } from 'react-icons/hi';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { login, error } = useAuth();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const success = await login(email, password);
        setIsSubmitting(false);
        if (success) {
            navigate('/dashboard');
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100 position-relative overflow-hidden py-4 py-md-5">
            {/* Background Decor */}
            <div className="position-absolute top-0 start-0 w-100 h-100 overflow-hidden" style={{ zIndex: -1 }}>
                <div className="position-absolute rounded-circle d-none d-md-block" style={{ top: '-10%', left: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)', filter: 'blur(60px)' }}></div>
                <div className="position-absolute rounded-circle d-none d-md-block" style={{ bottom: '-10%', right: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(217,70,239,0.2) 0%, transparent 70%)', filter: 'blur(60px)' }}></div>
                {/* Mobile - Smaller blobs */}
                <div className="position-absolute rounded-circle d-md-none" style={{ top: '-5%', left: '-15%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)', filter: 'blur(40px)' }}></div>
                <div className="position-absolute rounded-circle d-md-none" style={{ bottom: '-5%', right: '-15%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(217,70,239,0.15) 0%, transparent 70%)', filter: 'blur(40px)' }}></div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-100 position-relative z-1"
                style={{ maxWidth: '480px' }}
            >
                <div className="text-center mb-5 animate-float">

                    <h1 className="fw-bold display-6 text-white mb-0" style={{ letterSpacing: '-1px' }}>Smart Expense Manager</h1>
                </div>

                <Card className="glass-card border-0 shadow-2xl overflow-hidden">
                    <div className="position-absolute top-0 start-0 w-100 h-1" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)' }}></div>
                    <Card.Body className="p-4 p-md-5">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-center mb-4"
                        >
                            <h2 className="fw-bold text-white mb-1 fs-4 fs-md-3">Welcome Back</h2>
                            <p className="text-white-50 small mb-0">Enter your credentials to access your account</p>
                        </motion.div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                            >
                                <Alert variant="danger" className="mb-4 border-0 bg-danger bg-opacity-10 text-danger d-flex align-items-center">
                                    <i className="bi bi-exclamation-circle-fill me-2 fs-5"></i>
                                    {error}
                                </Alert>
                            </motion.div>
                        )}

                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-4">
                                <Form.Label className="text-white-50 small text-uppercase ls-1 fw-bold">Email Address</Form.Label>
                                <InputGroup className="input-group-glass">
                                    <InputGroup.Text className="bg-transparent border-end-0 ps-3 text-white-50">
                                        <HiMail className="fs-5" />
                                    </InputGroup.Text>
                                    <Form.Control
                                        type="email"
                                        placeholder="name@example.com"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="border-start-0 ps-2 py-2 py-md-3 text-white bg-transparent"
                                        autoFocus
                                    />
                                </InputGroup>
                            </Form.Group>

                            <Form.Group className="mb-5">
                                <Form.Label className="text-white-50 small text-uppercase ls-1 fw-bold">Password</Form.Label>
                                <InputGroup className="input-group-glass">
                                    <InputGroup.Text className="bg-transparent border-end-0 ps-3 text-white-50">
                                        <HiLockClosed className="fs-5" />
                                    </InputGroup.Text>
                                    <Form.Control
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Enter your password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="border-start-0 border-end-0 ps-2 py-2 py-md-3 text-white bg-transparent"
                                    />
                                    <InputGroup.Text
                                        className="bg-transparent border-start-0 pe-3 cursor-pointer text-white-50 hover-text-white transition-all"
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {showPassword ? <HiEyeOff className="fs-5" /> : <HiEye className="fs-5" />}
                                    </InputGroup.Text>
                                </InputGroup>
                            </Form.Group>

                            <Button
                                disabled={isSubmitting}
                                className="w-100 py-2 py-md-3 fw-bold rounded-4 btn-primary position-relative overflow-hidden hover-glow touch-target"
                                type="submit"
                                size="lg"
                                style={{ letterSpacing: '0.5px' }}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                                        Authenticating...
                                    </>
                                ) : (
                                    <>Log In <i className="bi bi-arrow-right ms-2"></i></>
                                )}
                            </Button>
                        </Form>

                        <div className="text-center mt-4 mt-md-5">
                            <p className="text-white-50 mb-0">
                                Don't have an account?{' '}
                                <Link to="/register" className="text-white fw-bold text-decoration-none hover-text-primary transition-all position-relative link-hover-effect">
                                    Sign Up Now
                                </Link>
                            </p>
                        </div>
                    </Card.Body>
                </Card>

                <p className="text-center text-white-50 mt-4 small opacity-50">
                    &copy; {new Date().getFullYear()} Smart Expense Manager. Secure & Encrypted.
                </p>
            </motion.div>
        </Container>
    );
};

export default Login;
