import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import Pricing from "./Component/Subscription/Index";
import CheckoutForm from "./Component/Payment/Index";
import Login from "./Component/Login/index";
import UserDetailsForm from "./Component/UserDetailsForm/Index";
import Home from "./Component/Home/Index";

const hist = createBrowserHistory();


function App() {
  return (
    <Router history={hist}>
    <div className="App">
        <div className="inner">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/signup' component={UserDetailsForm} />
            <Route exact path='/plans' component={Pricing} />
            <Route exact path='/payment' component={CheckoutForm} />
            <Route exact path='/main' component={Home} />
          </Switch>
        </div>
      </div>
      </Router>
  );
}

export default App;
