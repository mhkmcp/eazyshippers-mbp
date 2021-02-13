import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Sidenav } from 'rsuite';
import { connect } from 'react-redux';
import { contentChange } from '../../../redux/Actions/eeztshipperActions';
import Consignment from '../../AdminPortal/BusinessRules/Consignment/Consignment';
import Profiles from '../../AdminPortal/Customer/Profiles/Profiles';
import MultiCurrency from '../../AdminPortal/Management/MultiCurrency/MultiCurrency';
import Suppliers from '../../AdminPortal/Management/Suppliers/Suppliers';
import SystemUser from '../../AdminPortal/Management/SystemUser/SystemUser';
import WeightConversion from '../../AdminPortal/Management/WeightConversion/WeightConversion';
import Summery from '../../AdminPortal/Summery/Summery';
import LeftSidebar from '../../Sidebars/LeftSideBar/LeftSidebar';
import './DashboardLayout.css';
// import ClientDashboard from '../../ClientPortal/ClientDashboard/ClientDashboard';
import ClientAccount from '../../ClientPortal/ClientAccount/ClientAccount';
import ClientSubscription from '../../ClientPortal/ClientSubscription/ClientSubscription';
import ClientParcels from '../../ClientPortal/ClientParcels/ClientParcels';
import ClientPayments from '../../ClientPortal/ClientPayments/ClientPayments';
import Titlebar from '../../HomePage/Titlebar/Titlebar';
import ClientDashboardRoot from '../../ClientPortal/ClientDashboard/ClientDashboardRoot/ClientDashboardRoot';
import ForgetPassword from '../../Shared/ForgetPassword/ForgetPassword';
import { Route, Switch } from 'react-router-dom';
import AddNewLocation from '../../AdminPortal/Management/Location/AddNewLocation/AddNewLocation';
import LocationList from '../../AdminPortal/Management/Location/LocationList/LocationList';
import SupplierList from '../../AdminPortal/Management/Suppliers/SupplierList/SupplierList';
import PricingList from '../../AdminPortal/Management/Pricing/PricingList/PricingList';
import AddNewPricing from '../../AdminPortal/Management/Pricing/AddNewPricing/AddNewPricing';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import SearchUser from '../../AdminPortal/BookInParcel/SearchUser/SearchUser';
import AddParcelToClient from '../../AdminPortal/BookInParcel/AddParcelToClient/AddParcelToClient';

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
                                <Link to={`/dashboard/summery`}><h4>Dashboard</h4></Link>
                                <Sidenav className="bg-transparent" defaultOpenKeys={['1', '2']}>
                                    <LeftSidebar user={user}></LeftSidebar>
                                </Sidenav>
                            </Col>
                            <Col  md={8} style={{backgroundColor : '#F1F6FC'}}>
                                    <Switch>
                                        <Route path="/dashboard/summery">
                                            <Summery></Summery>
                                        </Route>
                                        <Route path="/dashboard/adminConsignments">
                                            <Consignment></Consignment>
                                        </Route>
                                        <Route path="/dashboard/addNewLocation">
                                            <AddNewLocation></AddNewLocation>
                                        </Route>
                                        <Route path="/dashboard/adminSystemUser">
                                            <SystemUser></SystemUser>
                                        </Route>
                                        <Route path="/dashboard/adminLocationList" >
                                            <LocationList></LocationList>
                                        </Route>
                                        <Route path="/dashboard/adminPricingList" >
                                            <PricingList></PricingList>
                                        </Route>
                                        <Route path="/dashboard/addNewPricing" >
                                            <AddNewPricing></AddNewPricing>
                                        </Route>
                                        <Route path="/dashboard/adminMultiCurrency" >
                                            <MultiCurrency></MultiCurrency>
                                        </Route>
                                        <Route path="/dashboard/adminSuppliers" >
                                            <SupplierList></SupplierList>
                                        </Route>
                                        <Route path="/dashboard/addNewSupplier" >
                                            <Suppliers></Suppliers>
                                        </Route>
                                        <Route path="/dashboard/adminWeightConversion" >
                                            <WeightConversion></WeightConversion>
                                        </Route>
                                        <Route path="/dashboard/adminProfiles" >
                                            <Profiles></Profiles>
                                        </Route>
                                        <Route path="/dashboard/adminPasswordReset" >
                                            <ForgetPassword></ForgetPassword>
                                        </Route>
                                        <Route exact path="/dashboard/bookInParcel" >
                                            <SearchUser></SearchUser>
                                        </Route>
                                        <Route path="/dashboard/bookInParcel/:userId" >
                                            <AddParcelToClient></AddParcelToClient>
                                        </Route>
                                    </Switch>
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