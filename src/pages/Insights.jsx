import { Container, Row, Col, Badge } from 'react-bootstrap';
import { useExpenses } from '../context/ExpenseContext';
import { calculateInsights } from '../utils/insights';
import { motion } from 'framer-motion';

const Insights = () => {
    const { expenses } = useExpenses();
    const insights = calculateInsights(expenses);

    const getInsightType = (text) => {
        if (text.includes('Alert')) return { color: 'danger', icon: 'bi-exclamation-triangle-fill', bg: 'rgba(239, 68, 68, 0.1)' };
        if (text.includes('Warning')) return { color: 'warning', icon: 'bi-exclamation-circle-fill', bg: 'rgba(245, 158, 11, 0.1)' };
        if (text.includes('Good Job')) return { color: 'success', icon: 'bi-check-circle-fill', bg: 'rgba(16, 185, 129, 0.1)' };
        if (text.includes('Tip')) return { color: 'info', icon: 'bi-lightbulb-fill', bg: 'rgba(6, 182, 212, 0.1)' };
        return { color: 'primary', icon: 'bi-info-circle-fill', bg: 'rgba(99, 102, 241, 0.1)' };
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 100 }
        }
    };

    return (
        <Container fluid className="px-0 pb-5">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <div className="mb-4 mb-md-5 animate-enter">
                    <h1 className="display-4 fw-bold text-gradient mb-2 text-responsive-xl">My Insights</h1>
                    <p className="text-white-50 fs-6 fs-md-5">AI-powered financial analysis & smart tips.</p>
                </div>

                <div className="glass-card p-3 p-md-4 p-lg-5 mb-4 mb-md-5">
                    <div className="d-flex align-items-center mb-4 mb-md-5">
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-2 p-md-3 rounded-circle me-3 me-md-4 text-white shadow-lg d-flex align-items-center justify-content-center" style={{ width: 48, height: 48, background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}>
                            <i className="bi bi-robot fs-4 fs-md-2"></i>
                        </div>
                        <div>
                            <h3 className="fw-bold mb-1 text-white fs-5 fs-md-4">Smart Analysis</h3>
                            <p className="text-white-50 mb-0 small">Based on your recent spending habits</p>
                        </div>
                    </div>

                    {insights.length > 0 ? (
                        <Row className="g-3 g-md-4">
                            {insights.map((insight, index) => {
                                const type = getInsightType(insight);
                                return (
                                    <Col xs={12} md={6} lg={4} key={index}>
                                        <motion.div
                                            variants={itemVariants}
                                            className="h-100 p-3 p-md-4 rounded-3 rounded-md-4 position-relative overflow-hidden hover-float"
                                            style={{
                                                background: 'rgba(255,255,255,0.03)',
                                                border: '1px solid rgba(255,255,255,0.05)',
                                                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)'
                                            }}
                                        >
                                            <div className="d-flex align-items-start mb-3">
                                                <div className={`p-2 rounded-3 me-3 text-${type.color}`} style={{ background: type.bg }}>
                                                    <i className={`bi ${type.icon} fs-4`}></i>
                                                </div>
                                                <Badge bg={type.color} className="bg-opacity-25 text-white fw-normal px-2 px-md-3 py-1 py-md-2 rounded-pill border border-white border-opacity-10 text-uppercase ls-1" style={{ fontSize: '0.65rem' }}>
                                                    {insight.split(':')[0].replace(/[^a-zA-Z ]/g, '')}
                                                </Badge>
                                            </div>

                                            <p className="text-white lead mb-0" style={{ fontSize: 'clamp(0.9rem, 2vw, 1rem)', lineHeight: '1.6' }}
                                                dangerouslySetInnerHTML={{
                                                    __html: insight.split(':').slice(1).join(':').trim()
                                                        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white fw-bold">$1</strong>')
                                                }}
                                            />

                                            
                                            <div className={`position-absolute rounded-circle bg-${type.color}`} style={{ bottom: -20, right: -20, width: 80, height: 80, opacity: 0.1, filter: 'blur(30px)' }}></div>
                                        </motion.div>
                                    </Col>
                                );
                            })}
                        </Row>
                    ) : (
                        <div className="text-center py-5 text-white-50">
                            <i className="bi bi-clipboard-data display-1 mb-3 d-block opacity-25"></i>
                            <h4 className="fw-normal">No enough data yet</h4>
                            <p>Start adding expenses to unlock personalized insights!</p>
                        </div>
                    )}
                </div>
            </motion.div>
        </Container>
    );
};

export default Insights;
