import {useState,useEffect,useContext} from 'react';
import {GroceryContext} from '../context/GroceryContext';
import UserData from '../data/groceryUsers.json';
import groceryLists from '../data/groceryLists.json';
//import groceryItems from '../data/'

const ListUsers = () =>{
	const [users, SetUsers] = useState([]);
	useEffect(()=>{
		const x = UserData.map(user=>(
		 user
	))
	SetUsers(x)
},[])
	return(users)

}
const ListList = () =>{
	const {ChangeUser} = useContext(GroceryContext);
	const {displayUser} = useContext(GroceryContext);
	const [Lists, SetLists] = useState([]);
	const Du = displayUser();
	useEffect(()=>{
		SetLists([])
		console.log('help')
		groceryLists.forEach(lists=>
			lists.userId === parseInt(Du) ? (
			SetLists(currentLists=>[...currentLists,lists])):(null)
			)
	},[ChangeUser])
	return(Lists);
}
const GroceryItems = () => {
	const {ChangeList} = useContext(GroceryContext);
	const {displayList} = useContext(GroceryContext);
	const {CreateList} = useContext(GroceryContext);
	const Dl = displayList();
	const [items, SetItems] = useState([]);
	useEffect(()=>{
		SetItems([])
		console.log('e tu')
		groceryLists.forEach(lists=>
			lists.listId === parseInt(Dl) ?(

				lists.items.forEach(product=> 
					SetItems(CurrentItems=>[...CurrentItems,product])					
				):(null)
			):(null)
		)	
		//CreateList(items)
	},[ChangeList])
	//CreateList(items)
	return(items)
}
const GroceryItemList = () =>{
	//const {} = useContext(GroceryContext);
	//const {} = useContext(GroceryContext);
}
const GroceryFoundUpdate = (e) => {
	//const {displayItemList} = useCntext(GroceryContext);
	console.log(e);
}
export{ListUsers,ListList,GroceryItems,GroceryItemList,GroceryFoundUpdate}