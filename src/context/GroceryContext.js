import React, {useState, createContext} from 'react';

export const GroceryContext = createContext();

export const GroceryUserProvider = (props) => {
	const [User, SetUser] = useState([]);
	const [ListId, SetListId] = useState([]);
	const [ItemList, SetItemList] = useState([]);

	const ChangeUser = (u) => {
		console.log('user');
		SetUser(u);
	}
	const displayUser = () => {
		return(User);
	}
	const ChangeList = (u) => {
		SetListId(u);
	}
	const displayList = () => {
		return(ListId);
	}
	const CreateList = (u) => {
		SetItemList(u);
	}
	const displayItemList = () => {
		return(ItemList);
	}
	return (
		<GroceryContext.Provider value={{ChangeUser,displayUser,ChangeList,displayList,CreateList, displayItemList}}>
	{props.children}
	</GroceryContext.Provider>
)
}

