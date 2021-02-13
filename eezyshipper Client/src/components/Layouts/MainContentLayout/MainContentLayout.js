import React from 'react';
import { connect } from 'react-redux';
import './MainContentLayout.css';

const MainContentLayout = ({children, contentChanger, title}) => {
    return (
        <div className="shadow mainContent px-2 py-4">
            <h3>{title || contentChanger}</h3>
            <hr/>
            {children}
        </div>
    );
};

const mapStateToProps = (state) => {
    return{
        contentChanger: state.contentChanger
    }
}

export default connect(mapStateToProps)(MainContentLayout);