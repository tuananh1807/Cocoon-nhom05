import React from "react";
import HomePageHeader from "../../components/HeaderComponents/HomePageHeader";
import { Col } from 'antd';
import { WrapperHeader } from "./style";
import ImageCarousel from "./ImageCarousel";
import Marquee from "./Marquee";

const HomePage = () => {
    
    return (
        <div>
            <HomePageHeader/>
            <div>
                <div>
                    {/* Marquee component added here */}
                    <Marquee />
                    <ImageCarousel /> {/* ImageCarousel component */}

                    {/* <WrapperHeader>
                        <Col span={12} style={{ padding: '40px 90px', background: '#f9e8c8' }}>
                            <p style={{ fontSize: '26px', fontFamily: 'revert', fontWeight: '600', color: '#5a3e1b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', }}>
                                CẢI TIẾN ĐỘT PHÁ
                            </p>
                            <h2 style={{ fontSize: '50px', fontFamily: 'initial', fontWeight: 'bold', color: '#5a3e1b', lineHeight: '1.3', marginBottom: '25px', marginTop: '15px' }}>
                                Đường thốt nốt An Giang làm sạch da chết cơ thể
                            </h2>
                            <p style={{ fontSize: '12px', color: '#5a3e1b', lineHeight: '1.7', textAlign: 'justify' }}>
                                Được bổ sung các thành phần hoạt tính cao cấp như Pentavitin, hỗn hợp dầu chưng cất phần tử gồm Passioline và Soline, mang đến hiệu quả dưỡng da trong lúc tẩy da chết, dưỡng ẩm sâu và củng cố hàng rào tự nhiên, giúp da trở nên mượt mà, khỏe khoắn.
                            </p>
                        </Col>


                        <Col span={12}>
                            <video autoPlay loop muted >
                                <source src="https://image.cocoonvietnam.com/uploads/vuong_1_3d44b70213.mp4" type="video/mp4" />
                            </video>
                        </Col>

                    </WrapperHeader>
                </div>

                <div >
                    <img src="https://image.cocoonvietnam.com/uploads/Banner_Website_Thu_hoi_vo_chai_PC_eb79fb0ad1.jpg" style={{ width: '100%' }}></img>
                </div>

                <div>
                    <WrapperHeader>
                        <Col span={12}>
                            <div
                                style={{
                                    backgroundImage: 'url(https://image.cocoonvietnam.com/uploads/274672650_4865096783585909_11576646889530917_n_e2468ba4d4.jpg)',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',
                                    height: '100%',
                                }}
                            >
                            </div>
                        </Col>

                        <Col span={12} style={{ padding: '40px 90px', background: '#ede0cc' }}>
                            <p style={{ fontSize: '26px', fontFamily: 'revert', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', }}>
                                CHƯƠNG TRÌNH
                            </p>
                            <h2 style={{ fontSize: '50px', fontFamily: 'initial', fontWeight: 'bold', lineHeight: '1.3', marginBottom: '25px', marginTop: '15px' }}>
                                Đỗi võ chai củ nhận sản phẩm mới
                            </h2>
                            <p style={{ fontSize: '12px', lineHeight: '1.7', textAlign: 'justify' }}>
                                Cocoon luôn sẵn sàng nhận vỏ chai cũ từ các bạn và trao đi các sản phẩm mới. Cứ 10 vỏ chai lọ rỗng bạn khi gửi về cho chúng tôi, bạn sẽ nhận lại một sản phẩm mới.
                            </p>
                        </Col>
                    </WrapperHeader> */}
                </div>

            </div>
        </div>
    );
};

export default HomePage;
