import React, {useContext,useEffect,useState} from 'react';
//import { PDFDownloadLink, PDFViewer, Document, Page, Text } from '@react-pdf/renderer'
//import MyDocument from './pdf';

import {DataContext} from 'context/DataContext'
import Card from './ItemCard';

const List = () =>{
	const {listId} = useContext(DataContext);
	const {userItemList} = useContext(DataContext);
	const {Updater} = useContext(DataContext);
	const {GetList} = useContext(DataContext);
	const {Delete} = useContext(DataContext);
	const {UpdateCart} = useContext(DataContext);

	const [items, SetItems] = useState([]);

	useEffect(()=>{
		GetList();
	},[listId])
	useEffect(()=>{
		SetItems([]);
		SetItems(userItemList)
	},[userItemList])


	const productChange = (itemTxt, itemId) => {
		SetItems(items.map(item=>{
			if(item.listItemId===itemId){
				return{...item,product:itemTxt}
			}
			return item;
		}
		))
	}
	const quantityChange = (itemTxt, itemId) => {
		SetItems(items.map(item=>{
			if(item.listItemId===itemId){
				return{...item,quantity:itemTxt}
			}
			return item;
		}
		))
	}
	const cartChange  = (itemId) => {
		SetItems(items.map(item=>{
			if(item.listItemId===itemId){
				UpdateCart({...item,cart:!item.cart},item.listItemId)
				return{...item,cart:!item.cart}
			}
			return item;}
		))
	}
	return(
		<div>
		<p>To Find:</p>
		<ul>
		{items.map((item,index)=>item.cart===false?
			<Card key={item.listItemId} index={index}
			value={item.listItemId} cart={item.cart} item={item.product} 
			units={item.quantity} unitType={item.unit} 
	 		cartChange={cartChange} itemChange={productChange} quantityChange={quantityChange} change={Updater} delete={Delete}/>:null)}
		</ul>
		<p>Found</p>
		<ul>
		{items.map((item,index)=>item.cart===true?<Card key={item.listItemId} index={index}
			value={item.listItemId} cart={item.cart} item={item.product} 
			units={item.quantity} unitType={item.unit} 
	 		cartChange={cartChange} itemChange={productChange} quantityChange={quantityChange} change={Updater} delete={Delete}/>:null)}
		</ul>

		</div>
	)
}
export default List;