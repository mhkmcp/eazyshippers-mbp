import React from 'react';
import { Sidenav, Nav, Dropdown, Icon } from 'rsuite';
import { connect } from 'react-redux';
import { contentChange } from '../../../redux/Actions/eeztshipperActions';
import './LeftSidebar.css';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LeftSidebar = ({ user, contentChanger, contentChange }) => {
    return (
        <div>
          {
            user === 'admin' ?
            <>
            <Sidenav.Body>
            <Nav>
                <Dropdown  eventKey="1" title="Business Rules" icon={<Icon icon="magic" />}>
                    <Link to={`/dashboard/adminConsignments`}><Dropdown.Item eventKey="1-1">Consingnment</Dropdown.Item></Link>
                </Dropdown>
                <Dropdown eventKey="2" title="Management" icon={<Icon icon="gear-circle" />}>
                    <Link to={`/dashboard/adminSystemUser`}><Dropdown.Item eventKey="2-1">System User</Dropdown.Item></Link>
                    <Link to={`/dashboard/adminLocationList`}><Dropdown.Item eventKey="2-2">Location</Dropdown.Item></Link>
                    <Link to={`/dashboard/adminPricingList`}><Dropdown.Item eventKey="2-3">Pricing</Dropdown.Item></Link>
                    <Link to={`/dashboard/adminSuppliers`}><Dropdown.Item eventKey="2-4">Suppliers</Dropdown.Item></Link>
                    <Link to={`/dashboard/adminMultiCurrency`}><Dropdown.Item eventKey="2-5">Multi Currency</Dropdown.Item></Link>
                    <Link to={`/dashboard/adminWeightConversion`}><Dropdown.Item eventKey="2-6">Weight Conversion</Dropdown.Item></Link>
                </Dropdown>
                <Dropdown eventKey="3" title="Customers" icon={<Icon icon="magic" />}>
                    <Link to={`/dashboard/adminProfiles`}><Dropdown.Item eventKey="3-1">Profiles</Dropdown.Item></Link>
                    <Link to={`/dashboard/adminPasswordReset`}><Dropdown.Item eventKey="3-2">Password Reset</Dropdown.Item></Link>
                </Dropdown>
            </Nav>
            </Sidenav.Body>
            </>
            :
            <>
            <Sidenav.Body>
            <Nav>
                <h6 className="text-dark">Administration</h6>
                <Button onClick={() => contentChange('summery')} className="btn-block my-2" variant="info">Dashboard</Button>
                <Button onClick={() => contentChange('clientAccount')} className="btn-block my-2" variant="secondary">Account</Button>
                <Button onClick={() => contentChange('clientSubscription')} className="btn-block my-2" variant="secondary">Subscription</Button>
                <h6 className="text-dark my-3">Services</h6>
                <Button onClick={() => contentChange('clientParcels')} className="btn-block my-2" variant="secondary">Percels</Button>
                <Button onClick={() => contentChange('clientPayments')} className="btn-block my-2" variant="secondary">Payments</Button>
            </Nav>

            <div className="text-secondary mt-5 pt-3">
                <h6>Restricted & Prohibited Items</h6> 
                <h6>Help Center</h6> 
                <h6>Terms & Conditions</h6> 
                <h6>Privacy Policy</h6> 
            </div>
            </Sidenav.Body>
            </>
          }  
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        contentChanger: state.contentChanger
    }
}

const mapDispatchToProps = {
    contentChange: contentChange
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftSidebar);