import './App.css';
import {BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import headerImage from './images/Introduction_Scene/header.png'
import Home from './component/home'
import Register from './component/register'
import GuestRegister from './component/guestRegister'
import Login from './component/login'
import ForgotPassword from './component/fogotPassword'
import Loader from './component/loader'
import Profile from './component/profile'
import MyCoupon from './component/myCoupon'
import MyAccount from './component/myAccount'
import GameLobby from './component/gameLobby'
import GamePlay from './component/gamePlay'
import Message from './component/modal/message'
import PurchaseCoupon from './component/purchaseCoupon'
import { useSelector } from 'react-redux';


function PrivateRoute({ children, ...rest }) {
    const isLogin = useSelector(state => state.isLogin)
    return (
        <Route {...rest} render={() =>
            isLogin ? (children) :
            (<Redirect to='/login' />)
            }
        />
    )
}


function App() {
    return (
        <div className="App">
            <Message/>
            <Loader/>
            <div>
            <img className="header-image" src={headerImage} width="100%" alt="headerImage" height="auto"/>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/guest-register" component={GuestRegister} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/forgot-password" component={ForgotPassword} />
                        <PrivateRoute>
                            <Route exact path="/profile" component={Profile} />
                            <Route exact path="/my-coupon" component={MyCoupon} />
                            <Route exact path="/my-account" component={MyAccount} />
                            <Route exact path="/purchase-coupon" component={PurchaseCoupon} />
                            <Route exact path="/game-lobby" component={GameLobby} />
                            <Route exact path="/game-play" component={GamePlay} />
                        </PrivateRoute>
                    </Switch>
                </Router>
            </div>
            <footer>Copyright@ www.skidoozy.com All rights reserved</footer>
        </div>
    );
}

export default App;
