import React from 'react';
import { Col, Navbar, Row } from 'react-bootstrap';
import { Sidenav } from 'rsuite';
import { connect } from 'react-redux';
import { contentChange } from '../../../redux/Actions/eeztshipperActions';
import Consignment from '../../AdminPortal/BusinessRules/Consignment/Consignment';
import PasswordReset from '../../AdminPortal/Customer/PasswordReset/PasswordReset';
import Profiles from '../../AdminPortal/Customer/Profiles/Profiles';
import MultiCurrency from '../../AdminPortal/Management/MultiCurrency/MultiCurrency';
import Suppliers from '../../AdminPortal/Management/Suppliers/Suppliers';
import SystemUser from '../../AdminPortal/Management/SystemUser/SystemUser';
import WeightConversion from '../../AdminPortal/Management/WeightConversion/WeightConversion';
import Summery from '../../AdminPortal/Summery/Summery';
import LeftSidebar from '../../Sidebars/LeftSideBar/LeftSidebar';
import MainContentLayout from '../MainContentLayout/MainContentLayout';
import './DashboardLayout.css';
// import ClientDashboard from '../../ClientPortal/ClientDashboard/ClientDashboard';
import ClientAccount from '../../ClientPortal/ClientAccount/ClientAccount';
import ClientSubscription from '../../ClientPortal/ClientSubscription/ClientSubscription';
import ClientParcels from '../../ClientPortal/ClientParcels/ClientParcels';
import ClientPayments from '../../ClientPortal/ClientPayments/ClientPayments';
import Titlebar from '../../HomePage/Titlebar/Titlebar';
import ClientDashboardRoot from '../../ClientPortal/ClientDashboard/ClientDashboardRoot/ClientDashboardRoot';
import LocationRoot from '../../AdminPortal/Management/Location/LocationRoot/LocationRoot';
import PricingRoot from '../../AdminPortal/Management/Pricing/PricingRoot/PricingRoot';
import BookInParcelRoot from '../../AdminPortal/BookInParcel/BookInParcelRoot/BookInParcelRoot';
import ForgetPassword from '../../Shared/ForgetPassword/ForgetPassword';

const DashboardLayout = ({children, contentChanger, contentChange}) => {

    const user = children?.props?.user;

    return (
        <>
            <div>
                <Titlebar user ={user}></Titlebar>
            </div>
            <div>
                <Row className="sidebarheight">
                    
                    {
                        user === 'admin' ?
                        <>
                            <Col className="text-center pt-3 px-3 pr-0 position-sticky" md={2} style={{ backgroundColor: '#F1F6FC' }}>
                                <h4 onClick={() => contentChange('summery')}>Dashboard</h4>
                                <Sidenav className="bg-transparent" defaultOpenKeys={['1', '2']}>
                                    <LeftSidebar user={user}></LeftSidebar>
                                </Sidenav>
                            </Col>
                            <Col  md={8} style={{backgroundColor : '#F1F6FC'}}>
                                {
                                    contentChanger === 'summery'?
                                    <Summery></Summery>
                                    :
                                    <>
                                        {contentChanger === 'adminConsignments' && <Consignment></Consignment>}
                                        {contentChanger === 'adminSystemUser' && <SystemUser></SystemUser>}
                                        {contentChanger === 'adminLocation' && <LocationRoot></LocationRoot>}
                                        {contentChanger === 'adminPricing' && <PricingRoot></PricingRoot>}
                                        {contentChanger === 'adminMultiCurrency' && <MultiCurrency></MultiCurrency>}
                                        {contentChanger === 'adminSuppliers' && <Suppliers></Suppliers>}
                                        {contentChanger === 'adminWeightConversion' && <WeightConversion></WeightConversion>}
                                        {contentChanger === 'adminProfiles' && <Profiles></Profiles>}
                                        {contentChanger === 'adminPasswordReset' && <ForgetPassword></ForgetPassword>}
                                        {contentChanger === 'bookInParcel' && <BookInParcelRoot></BookInParcelRoot>}
                                    </>
                                }
                                
                            </Col>
                            <Col md={2} style={{backgroundColor : '#F1F6FC'}}>Right Sidebar</Col>
                        </>
                        :
                        <>
                        <Col className="pt-3 px-5" md={3} style={{ backgroundColor: '#F1F6FC' }}>
                        <Sidenav className="bg-transparent" defaultOpenKeys={['1', '2']}>
                            <LeftSidebar user={user}></LeftSidebar>
                        </Sidenav>
                        </Col>
                        <Col md={9} className="p-4" style={{backgroundColor : '#F0FBFF'}}>
                            {contentChanger === 'summery' && <ClientDashboardRoot></ClientDashboardRoot>}
                            {contentChanger === 'clientAccount' && <ClientAccount></ClientAccount>}
                            {contentChanger === 'clientSubscription' && <ClientSubscription></ClientSubscription>}
                            {contentChanger === 'clientParcels' && <ClientParcels></ClientParcels>}
                            {contentChanger === 'clientPayments' && <ClientPayments></ClientPayments>}
                        </Col>
                        </>
                    }
                    
                </Row>
            </div>
            <div>
                <p className="text-center">copyright@EzzyShippers</p>
            </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return{
        contentChanger: state.contentChanger
    }
}

const mapDispatchToProps = {
    contentChange: contentChange
}
export default connect(mapStateToProps, mapDispatchToProps)(DashboardLayout);