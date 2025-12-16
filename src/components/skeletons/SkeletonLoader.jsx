import { Card } from 'react-bootstrap';
import './SkeletonLoader.css';

export const SkeletonCard = () => {
    return (
        <Card className="glass-card h-100 p-4">
            <div className="skeleton-wrapper">
                <div className="skeleton skeleton-text skeleton-title mb-3"></div>
                <div className="skeleton skeleton-text skeleton-number mb-4"></div>
                <div className="skeleton skeleton-text skeleton-small"></div>
            </div>
        </Card>
    );
};

export const SkeletonChart = () => {
    return (
        <Card className="glass-card p-4 h-100">
            <div className="skeleton-wrapper">
                <div className="skeleton skeleton-text skeleton-title mb-4"></div>
                <div className="skeleton skeleton-chart"></div>
            </div>
        </Card>
    );
};
