import React from 'react';
import AddNewPricing from '../AddNewPricing/AddNewPricing';
import PricingList from '../PricingList/PricingList';

const PricingRoot = () => {
    return (
        <div>
            <PricingList></PricingList>
            <AddNewPricing></AddNewPricing>
        </div>
    );
};

export default PricingRoot;