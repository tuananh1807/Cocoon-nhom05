import React from "react";
import { BellOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import './topbar.css'

const HeaderComponent = () => {

    const content = (
        <div>
            <span >Đăng xuất</span>

        </div >
    );

    return (
        <div className="Topbar">
            <div className="topbarleft">
                <h1 ><b>Welcome to Cocoon Original.</b></h1>
                <small style={{ fontWeight: 600, color: "grey" }}>
                    Hello Admin, Welcome Back!
                </small>
            </div>

            <div className="topbarmid">
                <input type="search" placeholder="Search Dashboard" />
                <span className="material-symbols-outlined">search</span>
            </div>

            <div className="topbarright">
                <BellOutlined style={{ width: '50px', height: '50px', fontSize: '20px' }} />

                <Popover placement="bottom" content={content} trigger="click">
                    <img
                        style={{ width: 50, height: 50, borderRadius: 10 }}
                        src="https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg"
                        alt="User avatar"
                    />
                </Popover>


            </div>
        </div >

    )
}

export default HeaderComponent