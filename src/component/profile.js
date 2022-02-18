import { Link } from 'react-router-dom'
import Header from './header'
export default function Profile(){
    return(
        <div className="main-container">
            <div className="container-fluid">
                <div className="text-right" style={{marginTop: '12rem'}}>
                    
                </div>
                <Header showbutton={true}/>
                <div className="row pt-2 height-40vh">
                    <div className="col-4 bg-my-account">
                        <div className="centered">
                            <Link to="/my-coupon" className="btn btn-orange">MY COUPON</Link>
                        </div>
                    </div>
                    <div className="col-4 bg-my-coupon">
                        <div className="centered">
                            <Link to="/purchase-coupon" className="btn btn-orange">PURCHESE COUPON</Link>
                        </div>
                    </div>
                    <div className="col-4 bg-purchase-coupon">
                        <div className="centered">
                            <Link to="/my-account" className="btn btn-orange">MY ACCOUNT</Link>
                        </div>
                    </div>
                </div>
                <div className="row mt-2 text-center height-20vh line-height-20vh bg-bottom-profile">
                    <div className="col-3">
                        <Link className="btn btn-orange" to="/">COUPON POINTS ONLY</Link>
                    </div>
                    <div className="col-3">
                        <Link className="btn btn-orange" to="/register">INSTANT REVEAL</Link>
                    </div>
                    <div className="col-3">
                        <Link className="btn btn-orange" to="/login">PLAY LATER</Link>
                    </div>
                    <div className="col-3">
                        <Link className="btn btn-orange" to="/game-lobby">PLAY NOW</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}