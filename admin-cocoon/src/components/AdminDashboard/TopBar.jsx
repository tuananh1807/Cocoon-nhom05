import React from "react";

function TopBar() {
    return (
        <div className="Topbar">
            <div className="topbarleft">
                <h1>Welcome to Planti.</h1>
                <small style={{ fontWeight: 600, color: "grey" }}>
                    Hello Alikemal, Welcome Back!
                </small>
            </div>

            <div className="topbarmid">
                <input type="search" placeholder="Search Dashboard" />
                <span className="material-symbols-outlined">search</span>
            </div>

            <div className="topbarright">
                <span className="material-symbols-outlined">bubble_chart</span>
                <span className="material-symbols-outlined">notifications</span>
                <img
                    style={{ width: 50, height: 50, borderRadius: 10 }}
                    src="https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg"
                    alt="User avatar"
                />
            </div>
        </div>
    );
}

export default TopBar;
