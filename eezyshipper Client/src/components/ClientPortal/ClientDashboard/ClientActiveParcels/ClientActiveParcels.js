import React, { useState } from 'react';
import { Image } from 'react-bootstrap';
import MainContentLayout from '../../../Layouts/MainContentLayout/MainContentLayout';

const ClientActiveParcels = () => {
    const [activeParcels, setActiveParcels] = useState([]);
    return (
        <>
            <MainContentLayout title="Active Parcels">
                {
                    activeParcels &&  
                    <>
                        <p className="text-secondary">Currently no active parcels.</p>

                        <Image width={600} className="mx-auto d-block" src="https://mbaileygroup.com/wp-content/uploads/2015/07/airport-illustration.png" alt="travel-image"/>
                    </>
                }
            </MainContentLayout>
        </>
    );
};

export default ClientActiveParcels;