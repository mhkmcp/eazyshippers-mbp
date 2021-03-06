import 'rsuite/dist/styles/rsuite-default.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Redirect, Route, Switch } from "react-router-dom";
import HomePageRoot from './components/HomePage/HomePageRoot/HomePageRoot';
import DashboardLayout from './components/Layouts/DashboardLayout/DashboardLayout';
import EmptyLayout from './components/Layouts/EmptyLayout/EmptyLayout';
import Register from "./components/Shared/Register/Register";
import AdminLogIn from "./components/Shared/AdminLogIn/AdminLogIn";
import ForgetPassword from "./components/Shared/ForgetPassword/ForgetPassword";
import NotFound from './components/Shared/NotFound/NotFound';
import AvailableCards from './components/ClientPortal/ClientPayments/AvailableCards';
import { connect } from 'react-redux';

const AppRoute = ({currentUser, component: Component, layout: Layout, ...rest}) => {
  
  return(
    <Route 
      {...rest} 
      render={({location}) => 
      currentUser?.email ? (
      <Layout>
        <Component  {...rest}/>
      </Layout>
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state:{from: location}
          }}
          />
      )}></Route>
  )
}

function App({currentUser}) {
  return (
    <>
      <Switch> 
          <Route exact path="/">
            <EmptyLayout><HomePageRoot/></EmptyLayout>
          </Route>
          <Route exact path="/login">
            <EmptyLayout><AdminLogIn/></EmptyLayout>
          </Route>
          <Route exact path="/register">
            <EmptyLayout><Register/></EmptyLayout>
          </Route>
          <Route exact path="/forget-pass">
            <EmptyLayout><ForgetPassword/></EmptyLayout>
          </Route>
          <AppRoute path="/dashboard" currentUser={currentUser} user="admin" layout={DashboardLayout}/>
          <AppRoute path="/track-parcel" layout={EmptyLayout} />
          <Route path="/available-card">
            <AvailableCards></AvailableCards>
          </Route>
          <Route path="*">
            <EmptyLayout><NotFound/></EmptyLayout>
          </Route>

          {/* <AppRoute path="/subscription" layout={EmptyLayout}  user="client" component={Subscription} /> */}

          {/* <AppRoute path="*" layout={EmptyLayout} component={NotFound} />            */}
          {/*Nice Comment*/} 
        </Switch>
    </>
  );
}

const mapStateToProps = state =>{
  return{
    currentUser: state.currentUser
  }
}


export default connect(mapStateToProps)(App);
