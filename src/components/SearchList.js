import React, {useState,useEffect, useContext} from 'react';
import {ListContext} from '../context/ListContext'

export const Search = (props) => {
	const {listId} = useContext(ListContext);
	const [checked, setChecked] = useState([]);
	const [product, setProduct] = useState([]);
	const [qty, setQty] = useState([]);
	//console.log(props.item.product);
	//console.log(props.item.cart);

	useEffect(()=>{
		console.log('effect')
		setChecked(props.item.cart)
		 setProduct(props.item.product)
		 setQty(props.item.quantity)
		 console.log(product)
		 console.log(qty)

	},[listId])

	return(
		<li key={props.item.listItemId}>
		{console.log(product)}
			{console.log(qty)}
		<div className={props.item.cart===false? 'listProduct':'listProduct found'}>
			<div>
				<input value={props.item.listItemId} type="checkbox" 
				checked={checked} onChange={(e)=>props.action(e.target)}/>
			</div>
			<div>
				<input id='product'className='update' type='text' value={props.item.product} onChange={(e)=>setProduct(e.target.value)}/>
				<br/>
				<input id='quantityValue' className='update'type='number' value={props.item.qty} onChange={(e)=>setQty(e.target.value)}/>
				<span id='quantityType' className='update'>{props.item.unit}</span>

			</div>
			<div>
				<button id='save-button' type='button'>&#10003; save</button>
				<button id='delete-button' type='button'>&#10007; delete</button>
			</div>
		</div>
		</li>)
}