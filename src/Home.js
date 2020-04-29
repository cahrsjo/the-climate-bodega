import React from 'react'
import './Home.css';

export default function Home() {
    return (
        <div className="wrapper">
            <div className="contents">
                <div className="emojis">
                    <span role="img" aria-label="chart">💨</span>
                    <span role="img" aria-label="chart">➡️</span>
                    <span role="img" aria-label="chart">📊</span>
                </div>
                <h1 className="text">Welcome to the Climate Bodega</h1>
                <div className="text">Where climate data comes to life</div>
            </div>
            <div className="imgWrapper">
                <img src="./images/c.png" alt="c"/>
                <img src="./images/p1.png" alt="p1"/>
                <img src="./images/p2.png" alt="p2"/>
                <img src="./images/e.png" alt="e"/>
            </div>
        </div>
    )
}
