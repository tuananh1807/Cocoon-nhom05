import React from 'react';
import { Carousel } from 'antd';

const ImageCarousel = () => {
    // Danh sách hình ảnh để hiển thị trong carousel
    const images = [
        { id: 1, src: 'https://file.hstatic.net/200000590181/article/306847745_193544793032964_9131857493822181502_n_127614a731fb42309d37aa5adc328e2a.jpg', alt: 'Image 1' },
        { id: 2, src: 'https://image.cocoonvietnam.com/uploads/BANNER_CHINH_1920_X720_a2495f44ea.jpg', alt: 'Image 2' },
    ];

    return (
        <Carousel autoplay>
            {images.map((image) => (
                <div key={image.id} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px' }}> {/* Adjust height here */}
                    <img 
                        src={image.src} 
                        alt={image.alt} 
                        style={{ width:'100%', height: '400px', objectFit: 'cover', borderRadius: '10px' }} // Set width to 'auto' and height to '100%'
                    />
                </div>
            ))}
        </Carousel>
    );
};

export default ImageCarousel;
