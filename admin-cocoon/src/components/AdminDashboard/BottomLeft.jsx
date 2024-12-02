
import { message, Card } from "antd";
import React, { useEffect, useState } from "react";
import { getAllCategory } from "../../services/CategorySevices";

function BottomLeft() {
    const [categories, setAllCategories] = useState([]);

    const fetchCategories = async () => {
        try {
            const res = await getAllCategory();
            setAllCategories(res.map(item => ({ ...item, key: item.categoryId })));
        } catch (error) {
            message.error("Failed to load categories.");
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className="BottomLeft">
            <div className="bottomlefttop">
                <h2 style={{ fontWeight: 'bold', fontSize: '15px' }}>My Listings</h2>

            </div>

            <div className="bottomleftmid">
                <div className="card-container">
                    <div className="horizontal-scroll">
                        <div className="scroll-content">
                            {categories.map((category) => (
                                <div className="item" key={category.categoryId}>
                                    <Card
                                        hoverable
                                        style={{ width: 110, height: 160 }}
                                        cover={
                                            category.image && (
                                                <img
                                                    className="card-image"
                                                    src={category.image}
                                                    alt="product"
                                                    style={{
                                                        marginLeft: '5%',
                                                        marginTop: '5%',
                                                        height: '110px',
                                                        width: '90%',
                                                        objectFit: 'fill'

                                                    }}
                                                />
                                            )
                                        }
                                    >
                                        <Card.Meta title={category.categoryName} />
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>


        </div >
    );
}

export default BottomLeft;