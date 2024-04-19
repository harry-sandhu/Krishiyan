import React, { useState } from 'react';
import './Hero4.css';

const Hero4: React.FC = () => {
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    const toggleDropdown = (dropdownId: string) => {
        setActiveDropdown(activeDropdown === dropdownId ? null : dropdownId);
    };

    const points = [
        {
            title: 'Seamless Integration',
            para: 'Krishiyan seamlessly integrates farmers, agri-input dealers, Farmer Producer Organizations, industries, and buyers into a cohesive virtual value chain.'
        },
        {
            title: 'Access to Market Insights',
            para: 'Farmers gain access to valuable market insights through Krishiyan, enabling informed decisions on crop selection, pricing, and market opportunities.'
        },
        {
            title: 'Quality Assessment Tools',
            para: 'Krishiyan provides farmers with quality assessment tools to ensure their produce meets industry standards, enhancing marketability and profitability.'
        },
        {
            title: 'Direct Connections',
            para: 'Krishiyan facilitates direct connections between farmers/Farmer Producer Organizations and industries/buyers, eliminating intermediaries and promoting transparent transactions.'
        },
        {
            title: 'Efficiency and Sustainability',
            para: 'Krishiyan streamlines supply chains and promotes sustainable agricultural practices, driving efficiency and sustainability throughout the virtual value chain.'
        },
    ];

    return (
        <div className="totaldiv">
            <h1 className="virtualheading">KrishiYan- Virtual Value Chain enabler</h1>
            {points.map((point, index) => (
                <div key={index} className="singledropdown">
                    <button
                        onClick={() => toggleDropdown(point.title)}
                        className={`expandbutton ${activeDropdown === point.title ? 'active' : ''}`}
                    >
                        {point.title}
                        <span className="spantag">➕</span>
                    </button>
                    <div className={`dropdown-content ${activeDropdown === point.title ? 'show' : ''}`}>
                        <ul>
                            <p>{point.para}</p>
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Hero4;