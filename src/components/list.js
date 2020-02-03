import React,{useContext,useEffect, useState} from 'react';
import {Search} from './SearchList';
import {ListContext} from '../context/ListContext';


export const List = () => {
	const {GetList} = useContext(ListContext);
	const {FillList} = useContext(ListContext);
	const {SetList} = useContext(ListContext);
	const {listId} = useContext(ListContext);
	const {list} = useContext(ListContext);
	const [findList, AddfindList] = useState([]);
	const [foundList, AddfoundList] = useState([]);


	useEffect(()=>{
		FillList();

	},[listId])

	useEffect(()=>{
		AddfoundList([]);
		AddfindList([]);
		console.log('am i here')
		GetList().forEach(items=>items.cart===true?AddfoundList(list=>[...list,items]):AddfindList(list=>[...list,items]));

	},[list])
	const ActiveBox=(e)=> {
		const index = list.findIndex(i=>i.listItemId === parseInt(e.value))
		console.log(e.value)
		console.log(index);
		var aa = list;
		aa[index].cart=!aa[index].cart;
		console.log(aa)
		SetList([...aa])
	};
	return(
		
		<div className='listControl'>
		{console.log(findList)}
		{console.log(foundList)}
			<p>Still to find:</p>
			<ul>
				{findList.map(items=><Search item={items} action={ActiveBox}/>)}
			</ul>
			<p>In the basket</p>
			<ul>
				{foundList.map(items=><Search item={items} action={ActiveBox}/>)}
			</ul>
		</div>
	)

}