import 'rsuite/dist/styles/rsuite-default.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import HomePageRoot from './components/HomePage/HomePageRoot/HomePageRoot';
import DashboardLayout from './components/Layouts/DashboardLayout/DashboardLayout';
import EmptyLayout from './components/Layouts/EmptyLayout/EmptyLayout';
import Register from "./components/Shared/Register/Register";
import AdminLogIn from "./components/AdminLogIn/AdminLogIn";
import ForgetPassword from "./components/Shared/ForgetPassword/ForgetPassword";
import NotFound from './components/Shared/NotFound/NotFound';
import AvailableCards from './components/ClientPortal/ClientPayments/AvailableCards';

const AppRoute = ({ component: Component, layout: Layout, ...rest}) => {
  
  return(
    <Route 
      {...rest} 
      render={({location}) => 
      1 ? (
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

function App() {
  return (
    <>
        <Router>  
          <Switch> 
              <Route exact path="/">
                <EmptyLayout><HomePageRoot/></EmptyLayout>
              </Route>
              <Route exact path="/login">
                <EmptyLayout><AdminLogIn/></EmptyLayout>
              </Route>
              <AppRoute exact path="/register" layout={EmptyLayout} component={Register} />
              <AppRoute exact path="/forget-pass" layout={EmptyLayout} component={ForgetPassword} />
              <AppRoute path="/dashboard" layout={DashboardLayout} user="admin"/>
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
        </Router>
    </>
  );
}

export default App;
