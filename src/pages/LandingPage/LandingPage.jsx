import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { jarallax, jarallaxElement } from 'jarallax'
import Footer from '../Footer/Footer.jsx'
import restaurant from '../../assets/restaurant.jpg'
import restaurant2 from '../../assets/restaurant2.jpeg'
import restaurant3 from '../../assets/restaurant3.jpeg'
import restaurant4 from '../../assets/restaurant4.jpeg'
import McDonaldsPromo from '../../assets/McDonaldsPromo.jpg'
import IndianPromo from '../../assets/IndianPromo.png'
import FishPromo from '../../assets/FishPromo.jpg'
import BangusPromo from '../../assets/BangusPromo.jpg'
import './LandingPage.scss'
import './Jarallax.css'
import HeaderLandingPage from "./HeaderLandingPage.jsx"
import {Slideshow, Slide, TextoSlide} from '../../components/Slider/Slider'
import { useDispatch, useSelector } from "react-redux"
import { fetchCreds } from "../../Redux/thunks/userThunks"
import Logo from '../../components/Logo/Logo.jsx'

const LandingPage = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.user)

    useEffect(() => {

        if (user) {
            if (user.type === 'restaurant') navigate('/negocios')
        } else {
            const token = window.localStorage.getItem('token')
            if (token) {
                dispatch(fetchCreds(token))
            }
        }
    }, [user])

    useEffect(()=>{
        if(user && user.type==='restaurant')navigate('/negocios')
    },[user])

    useEffect(() => {

        jarallaxElement();

        jarallax(document.querySelectorAll("[data-jarallax-element]"));

        jarallax(document.querySelectorAll('.jarallax'), {
            speed: 0.5,
        });

    }, [])


//fff
    return (
        <div>
        <div className="slidermargin">
                <Slideshow controles={true} autoplay={true} velocidad="6000" intervalo="5000">
				<Slide>
					
						<img src={McDonaldsPromo} alt=""/>
					
					<TextoSlide>
					{/* <TextoSlide colorFondo="navy"> */}
						<p>15% descuento</p>
					</TextoSlide>
				</Slide>
				<Slide>
					
						<img src={BangusPromo} alt=""/>
					
					<TextoSlide>
						<p>15% descuento</p>
					</TextoSlide>
				</Slide>
                <Slide>
					
						<img src={FishPromo} alt=""/>
					
					<TextoSlide>
						<p>15% descuento</p>
					</TextoSlide>
				</Slide>
                <Slide>
					
						<img src={BangusPromo} alt=""/>
					
					<TextoSlide>
						<p>15% descuento</p>
					</TextoSlide>
				</Slide>
			</Slideshow>
                </div>
        <div className='body1' onClick={() => navigate('/restaurantes')}>
            <section>
                <div className='box1'>
                    <h2 data-jarallax-element="0 -200">Landing page</h2>
                    <div className='container1'>
                        <div className='imgBx1 jarallax'>
                            <img src={restaurant2} alt='demo_img' className="jarallax-img" />
                        </div>
                        <div className='content1' data-jarallax-element="-200 0">
                            <p>The Vista by Chef Denis, the in house contemporary fine-dining restaurant at Mount Alverno Luxury Resorts Caledon, specializes in traditional Canadian cuisine with a delicious French twist.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className='box1'>
                    <h2 data-jarallax-element="0 200">Landing page</h2>
                    <div className='container1'>
                        <div className='imgBx1 jarallax'>
                            <img src={restaurant} alt='demo_img' className="jarallax-img" />
                        </div>
                        <div className='content1' data-jarallax-element="-200 0">
                            <p>Bubby’s opened on Thanksgiving Day 1990. Chef / Owner Ron Silver began baking pies and selling them to restaurants and his neighbors out of a small kitchen at the corner of Hudson and North Moore St. in Tribeca. </p>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className='box1'>
                    <h2 data-jarallax-element="0 -200">Landing page</h2>
                    <div className='container1'>
                        <div className='imgBx1 jarallax'>
                            <img src={restaurant3} alt='demo_img' className="jarallax-img" />
                        </div>
                        <div className='content1' data-jarallax-element="-200 0">
                            <p>The Old Ebbitt Grill, Washington's oldest saloon, was founded in 1856 when, according to legend, innkeeper William E. Ebbitt bought a boarding house.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className='box1'>
                    <h2 data-jarallax-element="0 200">Landing page</h2>
                    <div className='container1'>
                        <div className='imgBx1 jarallax'>
                            <img src={restaurant4} alt='demo_img' className="jarallax-img" />
                        </div>
                        <div className='content1' data-jarallax-element="-200 0">
                            <p>The fabric of Cutlets was born out of love and respect for these humble deli creations, met with a desire to bring quality ingredients to the table.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <Footer />
        </div>
    )
}

export default LandingPage