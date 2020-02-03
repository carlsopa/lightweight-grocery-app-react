import React, {useState, createContext, useContext} from 'react';
//import groceryLists from '../data/groceryLists.json';
import {DataContext} from './DataContext';
export const ListContext = createContext();


export const GroceryListProvider =(props) => {
	const {getAllLists} = useContext(DataContext);
	const [listId, SetListId] = useState([]);
	const [list, SetList] = useState([]);
	let initId = 0;

	const SetId = (x) => {
		SetListId(x);
	}
	const GetId =()=>{
		return(listId);
	}
	const FillList = () => {
		let id = 0;
		GetId().length===0?(id = initId):(id=GetId());
		SetList([]);
		getAllLists().forEach(lists=>
			lists.listId===parseInt(id)?
			(lists.items.forEach(product=>SetList(currentList=>[...currentList,product]))):(null)
			)

	}
	const GetList = () => {
		return(list);
	}
	return (
		<ListContext.Provider value={{listId,list,
			SetId,GetId,SetList,GetList,FillList}}>
		{props.children}
		</ListContext.Provider>
	)
}
