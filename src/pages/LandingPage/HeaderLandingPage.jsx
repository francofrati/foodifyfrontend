import React from "react";
import food_lp1 from '../../assets/food_lp1.jpg'
import food_lp2 from '../../assets/food_lp2.jpg'
import food_lp3 from '../../assets/food_lp3.jpg'
import food_lp4 from '../../assets/food_lp4.jpg'
import lp_bg_header from '../../assets/lp_bg_header.jpg'
import s from './HeaderLandingPage.module.scss'

const HeaderLandingPage = () => {   

  return (
    <div className={s.body}>
        <div className={s.flexRow}>
            <div className={s.flexColumn}>
                <div className={s.left}>
                        <div className={s.flexRow}>
                            <h5>Explore Foodify!</h5>
                        </div>
                        <div className={s.flexRow}>
                             <h2>The goat of the foods apps</h2>

                        </div>   
                </div>
            </div>
            <div className={s.flexColumn}>
                <h1>Bebe</h1>
            </div>
        </div>
    </div>
  )
};

export default HeaderLandingPage;