import React, {useContext} from 'react';
import {ListContext} from '../../context/ListContext';
//import groceryLists from '../../data/groceryLists.json';
import {UserContext} from '../../context/UserContext';
import {DataContext} from '../../context/DataContext';

export const Select = () => {

	const {SetId} = useContext(ListContext);
	const {GetUserId} = useContext(UserContext);
	const {groceryList} = useContext(DataContext);
	const xid = GetUserId().userId;

	return(
		<div>
		<select defaultValue={'default'} onChange={(e)=>SetId(e.target.value)}>
		<option value='default' disabled>Select a shopping list</option>
		{groceryList.map(user=>(
			user.userId === parseInt(xid) ? 
			(<option key={user.listId} value={user.listId}>{user.title}</option>):(null))
		)}

		</select>
		</div>
		)
}