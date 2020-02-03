import React, {useState, createContext} from 'react';
export const UserContext = createContext();

export const GroceryUserProvider = (props) => {
	const [user, SetUser] = useState([]);

	const ChangeUser = (u) => {
		console.log('user');
		SetUser(u);
		console.log(u)
		console.log(user)
	}
	const GetUserId = () =>{
		//console.log('user.Id');
		return(user);
	}
	const GetUserName = () => {
		return(user.Name)
	}
	return (
		<UserContext.Provider value={{user,ChangeUser,GetUserId,GetUserName}}>
		{props.children}
		</UserContext.Provider>
	)
}
