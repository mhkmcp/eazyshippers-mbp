import React from 'react';
import { CardDeck } from 'react-bootstrap';
import ClientSubscriptions from '../../ClientShared/ClientSubscriptions/ClientSubscriptions';
import CalculateShippingCost from '../CalculateShippingCost/CalculateShippingCost';
import ClientActiveParcels from '../ClientActiveParcels/ClientActiveParcels';
import ClientDeliveryAddress from '../ClientDeliveryAddress/ClientDeliveryAddress';

const ClientDashboardRoot = () => {
    return (
        <CardDeck>
            <ClientDeliveryAddress></ClientDeliveryAddress>
            <CalculateShippingCost></CalculateShippingCost>
            <ClientActiveParcels></ClientActiveParcels>
            <ClientSubscriptions></ClientSubscriptions>
        </CardDeck>
    );
};

export default ClientDashboardRoot;