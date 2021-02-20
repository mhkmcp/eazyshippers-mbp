import React, { useEffect, useState } from 'react';
import Titlebar from '../Titlebar/Titlebar';
import ClientFeedback from '../ClientFeedback/ClientFeedback';
import TopBanner from '../TopBanner/TopBanner';
import FeaturesList from '../FeaturesList/FeaturesList';

const HomePageRoot = () => {
    const [welcomeMessage, setWelcomeMessage] = useState('');

    useEffect(() => {
        fetch('http://127.0.0.1:8000/')
        .then(res => res.json())
        .then(data => setWelcomeMessage(data.message));
    }, []);
    
    return (
        <div>
            <h2 className="text-center">{`${welcomeMessage} Connected to API`}</h2>
            <TopBanner></TopBanner>
            <FeaturesList></FeaturesList>
            <ClientFeedback></ClientFeedback>
        </div>
    );
};

export default HomePageRoot;