import { useState, useEffect } from 'react';
import { Form, Button, Container, Card, Alert, Spinner, InputGroup, ProgressBar } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiMail, HiLockClosed, HiEye, HiEyeOff, HiUser, HiCheckCircle } from 'react-icons/hi';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [validationError, setValidationError] = useState('');
    const [passwordStrength, setPasswordStrength] = useState({ score: 0, label: '', color: '' });

    const { register, error } = useAuth();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);


    useEffect(() => {
        if (!password) {
            setPasswordStrength({ score: 0, label: '', color: '' });
            return;
        }

        let score = 0;
        let label = '';
        let color = '';


        if (password.length >= 6) score += 25;
        if (password.length >= 8) score += 15;
        if (password.length >= 12) score += 10;


        if (/[a-z]/.test(password)) score += 15;
        if (/[A-Z]/.test(password)) score += 15;
        if (/[0-9]/.test(password)) score += 10;
        if (/[^a-zA-Z0-9]/.test(password)) score += 10;


        if (score < 40) {
            label = 'Weak';
            color = 'danger';
        } else if (score < 70) {
            label = 'Medium';
            color = 'warning';
        } else {
            label = 'Strong';
            color = 'success';
        }

        setPasswordStrength({ score, label, color });
    }, [password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidationError('');

        if (password !== confirmPassword) {
            return setValidationError('Passwords do not match');
        }

        if (password.length < 6) {
            return setValidationError('Password must be at least 6 characters');
        }

        setIsSubmitting(true);
        const success = await register(name, email, password);
        setIsSubmitting(false);
        if (success) {
            navigate('/dashboard');
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100 position-relative overflow-hidden py-4 py-md-5">

            <div className="position-absolute top-0 start-0 w-100 h-100 overflow-hidden" style={{ zIndex: -1 }}>
                <div className="position-absolute rounded-circle d-none d-md-block" style={{ top: '-10%', right: '-10%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)', filter: 'blur(80px)' }}></div>
                <div className="position-absolute rounded-circle d-none d-md-block" style={{ bottom: '-10%', left: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(239,68,68,0.15) 0%, transparent 70%)', filter: 'blur(80px)' }}></div>

                <div className="position-absolute rounded-circle d-md-none" style={{ top: '-5%', right: '-15%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)', filter: 'blur(50px)' }}></div>
                <div className="position-absolute rounded-circle d-md-none" style={{ bottom: '-5%', left: '-15%', width: '55vw', height: '55vw', background: 'radial-gradient(circle, rgba(239,68,68,0.12) 0%, transparent 70%)', filter: 'blur(50px)' }}></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-100 position-relative z-1"
                style={{ maxWidth: '550px' }}
            >
                <div className="text-center mb-3 mb-md-4">
                    <h1 className="fw-bold display-5 text-white mb-1 text-responsive-xl">Join Us</h1>
                    <p className="text-white-50 small mb-0">Create your smart expense manager account</p>
                </div>

                <Card className="glass-card border-0 shadow-2xl overflow-hidden">
                    <div className="position-absolute top-0 start-0 w-100 h-1" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)' }}></div>
                    <Card.Body className="p-4 p-md-5">
                        {error && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <Alert variant="danger" className="mb-4 border-0 bg-danger bg-opacity-10 text-danger">{error}</Alert>
                            </motion.div>
                        )}
                        {validationError && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <Alert variant="danger" className="mb-4 border-0 bg-danger bg-opacity-10 text-danger">{validationError}</Alert>
                            </motion.div>
                        )}

                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-4">
                                <Form.Label className="text-white-50 small text-uppercase ls-1 fw-bold">Full Name</Form.Label>
                                <InputGroup className="input-group-glass">
                                    <InputGroup.Text className="bg-transparent border-end-0 ps-3 text-white-50"><HiUser className="fs-5" /></InputGroup.Text>
                                    <Form.Control type="text" placeholder="John Doe" required value={name} onChange={(e) => setName(e.target.value)} className="border-start-0 ps-2 py-2 py-md-3 text-white bg-transparent" autoFocus />
                                    {name && <InputGroup.Text className="bg-transparent border-start-0 text-success"><HiCheckCircle /></InputGroup.Text>}
                                </InputGroup>
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Form.Label className="text-white-50 small text-uppercase ls-1 fw-bold">Email Address</Form.Label>
                                <InputGroup className="input-group-glass">
                                    <InputGroup.Text className="bg-transparent border-end-0 ps-3 text-white-50"><HiMail className="fs-5" /></InputGroup.Text>
                                    <Form.Control type="email" placeholder="name@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} className="border-start-0 ps-2 py-2 py-md-3 text-white bg-transparent" />
                                    {email && email.includes('@') && <InputGroup.Text className="bg-transparent border-start-0 text-success"><HiCheckCircle /></InputGroup.Text>}
                                </InputGroup>
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Form.Label className="text-white-50 small text-uppercase ls-1 fw-bold">Password</Form.Label>
                                <InputGroup className="input-group-glass">
                                    <InputGroup.Text className="bg-transparent border-end-0 ps-3 text-white-50"><HiLockClosed className="fs-5" /></InputGroup.Text>
                                    <Form.Control type={showPassword ? 'text' : 'password'} placeholder="At least 6 characters" required value={password} onChange={(e) => setPassword(e.target.value)} className="border-start-0 border-end-0 ps-2 py-2 py-md-3 text-white bg-transparent" />
                                    <InputGroup.Text className="bg-transparent border-start-0 pe-3 cursor-pointer text-white-50 hover-text-white" onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer' }}>{showPassword ? <HiEyeOff className="fs-5" /> : <HiEye className="fs-5" />}</InputGroup.Text>
                                </InputGroup>

                                {password && (
                                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-2">
                                        <div className="d-flex justify-content-between align-items-center mb-1">
                                            <small className="text-white-50" style={{ fontSize: '0.75rem' }}>Strength: <span className={`text-${passwordStrength.color} fw-bold`}>{passwordStrength.label}</span></small>
                                        </div>
                                        <ProgressBar now={passwordStrength.score} variant={passwordStrength.color} style={{ height: '3px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
                                    </motion.div>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-5">
                                <Form.Label className="text-white-50 small text-uppercase ls-1 fw-bold">Confirm Password</Form.Label>
                                <InputGroup className="input-group-glass">
                                    <InputGroup.Text className="bg-transparent border-end-0 ps-3 text-white-50"><HiLockClosed className="fs-5" /></InputGroup.Text>
                                    <Form.Control type={showConfirmPassword ? 'text' : 'password'} placeholder="Confirm password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="border-start-0 border-end-0 ps-2 py-2 py-md-3 text-white bg-transparent" />
                                    <InputGroup.Text className="bg-transparent border-start-0 pe-3 cursor-pointer text-white-50 hover-text-white" onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ cursor: 'pointer' }}>{showConfirmPassword ? <HiEyeOff className="fs-5" /> : <HiEye className="fs-5" />}</InputGroup.Text>
                                </InputGroup>
                                {confirmPassword && password === confirmPassword && (
                                    <motion.small initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-success d-block mt-1 small"><HiCheckCircle className="me-1" /> Match</motion.small>
                                )}
                            </Form.Group>

                            <Button disabled={isSubmitting} className="w-100 py-2 py-md-3 fw-bold rounded-4 btn-primary position-relative overflow-hidden hover-glow touch-target" type="submit" size="lg">
                                {isSubmitting ? (
                                    <><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" /> Creating...</>
                                ) : (
                                    'Create Account'
                                )}
                            </Button>
                        </Form>

                        <div className="text-center mt-4 mt-md-5">
                            <p className="text-white-50 mb-0">
                                Already have an account?{' '}
                                <Link to="/" className="text-white fw-bold text-decoration-none hover-text-primary transition-all position-relative link-hover-effect">
                                    Log In Here
                                </Link>
                            </p>
                        </div>
                    </Card.Body>
                </Card>

                <p className="text-center text-white-50 mt-4 small opacity-50">
                    By signing up, you agree to our Terms & Privacy Policy
                </p>
            </motion.div>
        </Container>
    );
};

export default Register;
