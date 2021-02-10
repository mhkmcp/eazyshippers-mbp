import React from 'react';
import AddNewLocation from '../AddNewLocation/AddNewLocation';
import LocationList from '../LocationList/LocationList';

const LocationRoot = () => {
    return (
        <>
            <div>
                <LocationList></LocationList>
            </div>
            <div>
                <AddNewLocation></AddNewLocation>
            </div>
            
        </>
    );
};

export default LocationRoot;