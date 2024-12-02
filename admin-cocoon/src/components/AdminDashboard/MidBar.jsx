import React from "react";
import video from "../AdminDashboard/video/video.mp4";
import cocoonImage from './cocoon_1.png';
import cocoonImage2 from './cocoon_2.png';

function MidBar() {
    return (
        <div className="Midbar">
            <div className="videocontainer">
                <div className="videodiv">
                    <video autoPlay loop muted>
                        <source src={video} type="video/mp4" />
                    </video>
                </div>

                <h2 style={{ fontWeight: 'bold', fontSize: '16px' }}>Create and sell extraordinary products</h2>

                <p>
                    The world's fast growing industry todey are natural made products!
                </p>
                <div className="midbarbtndiv">
                    <button className="midbarexploreBTN">Explore More</button>
                    <button
                        className="midbarsellersBTN"
                        style={{
                            background: "transparent",
                            color: "white",
                            border: "2px solid white"
                        }}
                    >
                        Top Sellers
                    </button>
                </div>
            </div>

            <div className="Mystatcontainer">
                <h2>My Stat</h2>
                <div className="statmid">
                    <div className="statmidleft">
                        <p>Today</p>
                        <p style={{ color: "rgb(110, 141, 64)" }}>4 Orders</p>{" "}
                    </div>
                    <div className="statmidright">
                        <p>This Mount</p>
                        <p style={{ color: "rgb(110, 141, 64)" }}>175 Orders</p>
                    </div>
                </div>
                <h4>
                    Go to my orders
                    <span class="material-symbols-outlined">arrow_forward</span>
                </h4>

                <img
                    className="mystatplantpotimg"
                    src={cocoonImage}
                    alt="Cocoon"
                />
            </div>

            <img
                className="lambader"
                src={cocoonImage2}
                alt=""
                style={{ objectFit: 'fill' }}
            />
        </div>
    );
}

export default MidBar;
