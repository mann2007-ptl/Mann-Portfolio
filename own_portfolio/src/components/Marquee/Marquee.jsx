import React from 'react';
import './Marquee.css';

const Marquee = () => {
    const items = [
        'REACT', 'NODE.JS', 'JAVASCRIPT', 'TYPESCRIPT', 'MONGODB',
        'EXPRESS', 'HTML5', 'CSS3', 'GIT', 'FIGMA',
        'MERN STACK', 'UI/UX', 'REST API', 'RESPONSIVE DESIGN'
    ];

    return (
        <section className="marquee-section">
            <div className="marquee-track">
                <div className="marquee-content">
                    {[...items, ...items].map((item, i) => (
                        <span key={i} className="marquee-item">
                            {item}
                            <span className="marquee-dot">◆</span>
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Marquee;
