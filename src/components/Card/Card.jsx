import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import VanillaTilt from 'vanilla-tilt'

import { addToCart } from '../../Redux/slices/shoppingSlice'

import s from './Card.module.scss'


const Card = ({ id, title, image, price, rating, food }) => {
	const dispatch = useDispatch()

	const ratingfix = rating.toFixed(1)

	function Tilt(props) {
		const { options, ...rest } = props;
		const tilt = useRef(null);

		useEffect(() => {
			VanillaTilt.init(tilt.current, options);
		}, [options]);

		return <div ref={tilt} {...rest} />;
	}


	const handleAddToCart = (food) => {
		dispatch(addToCart(food));
		console.log('HIZO ALGO')
	};

	return (
		//     <div className="canvas-wrapper">


		//     <div className="card-wrapper" ref={ (cardEl) => this.cardEl = cardEl} onMouseEnter={this.mouseEnterHandler} onMouseMove={this.mouseMoveHandler} onMouseLeave={this.mouseLeaveHandler}>




		//     <div className="card" style={this.cardStyle}>

		//       <div className={classComponent}>
		//         <img className="base-color" src='https://svgshare.com/i/9vE.svg' title='' />
		//         <img className="base-metal" src='https://svgshare.com/i/9wP.svg' title='' />
		//       </div>

		//       <div className="card-content">


		//       <div className="pattern-bg"/>
		//       <div className="parallax-bg" style={this.backgroundStyle}/>
		//       <div className="character-bg parallax-bg" style={this.characterStyle}/>

		//       <div className="card-detail">
		//         <h1>{character.name}</h1>
		//         <p>{character.description}</p>
		//         <p>{character.type}</p>
		//       </div>
		//     </div>
		//       </div>
		// </div>



		//   </div>

		<div className={s.cuerpo}>
			<Tilt>

				<div className={s.container}>
					<div className={s.box}>
						<h2 className={s.name}>{title}</h2>
						<a className={s.buy} onClick={() => handleAddToCart(food)}>Buy now</a>
						{/* <div className={s.circle}></div> */}
						<img src={image} className={s.product} />
						<h2 className={s.price}>Price: {price}$</h2>
						
					</div>
				</div>
			</Tilt>
		</div>

	)
}

export default Card