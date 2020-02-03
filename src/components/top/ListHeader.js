import React, {useContext} from 'react';
import {UserContext} from '../../context/UserContext';
import {DataContext} from '../../context/DataContext';
//import UserData from '../../data/groceryUsers.json';


export const HeaderBar = () => {
	const {ChangeUser} = useContext(UserContext);
	const {userList} = useContext(DataContext);
	console.log(userList);
	
	return(
		<div>
		<h4>Grocery Application</h4>
		<select className='userBox' defaultValue={'default'} onChange={(e)=>ChangeUser({userName:e.target.options[e.target.selectedIndex].text,userId:e.target.value})}>
		<option value='default' disabled>Select a user</option>
		{userList.map(user=>(
			<option key={user.id} name={user.name} value={user.id}>{user.name}</option>))}

		</select>
		</div>)
}