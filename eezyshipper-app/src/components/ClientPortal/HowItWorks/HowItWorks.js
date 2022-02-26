import React from 'react';
import MainContentLayout from '../../Layouts/MainContentLayout/MainContentLayout';

const HowItWorks = () => {
    return (
        <div>
            <MainContentLayout title="How It works">
                <div className="d-flex justify-content-between">
                    <div>
                        <div className="d-flex text-center align-items-center justify-content-center" style={{height : '150px', width : '150px', borderRadius : '50%', border: '2px dashed #3A7DD8'}}>
                            <h1 className="display-3 text-primary">1</h1>
                        </div>
                        <p className="mt-4">Shop in a Uk online store and add your purchases to your cart</p>
                    </div>
                    <div>
                        <div className="d-flex text-center align-items-center justify-content-center" style={{height : '150px', width : '150px', borderRadius : '50%', border: '2px dashed #3A7DD8'}}>
                            <h1 className="display-3 text-primary">2</h1>
                        </div>
                        <p className="mt-4">Shop in a Uk online store and add your purchases to your cart</p>
                    </div>
                    <div>
                        <div className="d-flex text-center align-items-center justify-content-center" style={{height : '150px', width : '150px', borderRadius : '50%', border: '2px dashed #3A7DD8'}}>
                            <h1 className="display-3 text-primary">3</h1>
                        </div>
                        <p className="mt-4">Shop in a Uk online store and add your purchases to your cart</p>
                    </div>
                    <div>
                        <div className="d-flex text-center align-items-center justify-content-center" style={{height : '150px', width : '150px', borderRadius : '50%', border: '2px dashed #3A7DD8'}}>
                            <h1 className="display-3 text-primary">4</h1>
                        </div>
                        <p className="mt-4">Shop in a Uk online store and add your purchases to your cart</p>
                    </div>
                </div>
            </MainContentLayout>
        </div>
    );
};

export default HowItWorks;
