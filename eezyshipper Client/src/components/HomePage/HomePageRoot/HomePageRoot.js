import React, { useEffect, useState } from 'react';
import Titlebar from '../Titlebar/Titlebar';
import ClientFeedback from '../ClientFeedback/ClientFeedback';
import TopBanner from '../TopBanner/TopBanner';
import FeaturesList from '../FeaturesList/FeaturesList';

const HomePageRoot = () => {
    const [welcomeMessage, setWelcomeMessage] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/')
        .then(res => res.json())
        .then(data => setWelcomeMessage(data.OkMessage));
    }, [])
    return (
        <div>
            <Titlebar></Titlebar>
            <TopBanner></TopBanner>
            <FeaturesList></FeaturesList>
            <h2 className="text-center">{welcomeMessage}</h2>
            <ClientFeedback></ClientFeedback>
        </div>
    );
};

export default HomePageRoot;