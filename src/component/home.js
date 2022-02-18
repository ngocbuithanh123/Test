import { Link } from 'react-router-dom'
import { Carousel } from 'react-bootstrap'
import logo from '../images/Introduction_Scene/Intro_bg.png'
import logo2 from '../images/Introduction_Scene/Introduction.png'
// import logo3 from '../images/Introduction_Scene/Introduction_Scene.jpg'
export default function Home() {
    return (
        <div className="home-page">
            <div className="home-background" >
                <Carousel>
                    <Carousel.Item interval={3000}>
                        <img
                            className="d-block w-100"
                            src={logo}
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item interval={3000}>
                        <img
                            className="d-block w-100"
                            src={logo2}
                            alt="Second slide"
                        />
                    </Carousel.Item>
                    {/* <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={logo3}
                            alt="Third slide"
                        />
                    </Carousel.Item> */}
                </Carousel>
            </div>
            <div>
                <div className="row text-center py-3">
                    <div className="col-4">
                        <Link className="btn font-weight-bold text-white btn-pink btn-lg" to="/guest-register">I WANT TO PLAY FOR FREE</Link>
                    </div>
                    <div className="col-4">
                        <Link className="btn font-weight-bold text-white btn-orange btn-lg" to="/register">I AM A NEW CUSTOMER</Link>
                    </div>
                    <div className="col-4">
                        <Link className="btn font-weight-bold text-white btn-blue btn-lg" to="/login">REGISTERED CUSTOMER</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}