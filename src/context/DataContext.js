import React, {useState, createContext,useEffect} from 'react';
import firebase from 'firebase';
import firebaseConfig from '../initfirebase'
import 'firebase/firestore';
export const DataContext = createContext();

export const GroceryDataProvider =(props)=>{
	const [groceryList, setGroceryList] = useState([]);
	const [userList, setUserList] = useState([]);
	const [userGroceryList, setUserGroceryList] = useState([]);
	const [userItemList, setUserItemList] = useState([]);
	const [userTypeList, setUserTypeList] = useState([]);
	const [listId, setListId] = useState('');
	const [userId, setUserId] = useState('');
	//const [a, setA] = useState([]);

	//const [lId, setLId] = useState(0);

	useEffect(()=>{
		const fetch = async()=>{
			let db = firebase.database().ref('groceryA/');
			db.once('value',snapshot=>{
				snapshot.forEach(child=>{
					setGroceryList(list=>[...list,child.val()])
				})
			})
			db = firebase.database().ref('users/');
			db.once('value',snapshot=>{
				setUserList(snapshot.val());
			})
			db = firebase.database().ref('categories')
			db.once('value',snapshot=>{
				setUserTypeList(snapshot.val());
			})
		}
		fetch();
	},[])

	const ChangeUser=(x)=>{
		setUserId(x);
		setListId('');
	}
	const GetUserList=()=>{
		setUserGroceryList([]);
				groceryList.forEach(gl=>parseInt(gl.userId)===parseInt(userId)?setUserGroceryList(list=>[...list,gl]):(null))	 	 
	}
	const ChangeList=(x)=>{
		setListId(x);
	}
	const GetItemList=()=>{
		setUserItemList([])
		console.log('groceryList');
		userGroceryList.forEach(ul=>{
			if(ul.listId===listId){
				if(ul.items!==undefined) {
						Object.values(ul.items).map(child=>setUserItemList(list=>[...list,child]))
					} else {
						console.log(null)}
				} else {
				console.log(null)
			}
		})

	}
	
	const Updater=(pr,qu,ut,index)=>{
		console.log('update')
		const itemIndex = userItemList.findIndex(u=>{
			return u.listItemId === index})
		console.log(itemIndex);
		console.log(pr)
		const item = {...userItemList[itemIndex]}
		console.log(item);
		const items = [...userItemList]
		item.product = pr;
		item.quantity = qu;
		item.unit = ut;
		items[itemIndex] = item;
		firebase.database().ref('groceryA/'+listId+'/items/'+index).update(item)
		setUserItemList(items);
	}
	const GetList = () => {
		setUserItemList([])
		let db = firebase.database().ref('groceryA/'+listId+'/items');
		db.once('value',snapshot=>{
			snapshot.forEach(item=>{
				setUserItemList(list=>[...list,item.val()])
			})
		})
	}
	const WriteItem = (p,c,q,t) => {
		let db = firebase.database().ref('groceryA/'+listId+'/items/');
		let key = db.push().key;
		let item = {cart:false,category:c,listItemId:key,product:p,quantity:q,unit:t}
		setUserItemList(list=>[...list,item])
		let entry = db+key;
		console.log(item)
		firebase.database().ref('groceryA/'+listId+'/items/'+key).update(item);
	}
	const WriteList = (x) => {
		console.log(x);
		console.log(userId);
		let db = firebase.database().ref('groceryA');
		let key = db.push().key;
		console.log(key)
		const list = {items:[],title:x,listId:key,userId:userId};
		(userId!=='')?
			(x!=='')?
				firebase.database().ref('groceryA/'+key).update(list):
				console.log('enter a list')
			:console.log('choose a person')
	}
	const Delete = (x) => {
		const itemIndex = userItemList.findIndex(u=>{
			return u.listItemId === x})
		const items = [...userItemList]
		items.splice(itemIndex,1);
		firebase.database().ref('groceryA/'+listId+'/items/'+x).remove();
		setUserItemList(items);
	}

	return( 
		<DataContext.Provider value={{groceryList,userList,userGroceryList,userItemList,listId,userId,userTypeList,
			setGroceryList,setUserList,setListId,setUserId,setUserTypeList,
			ChangeUser,GetUserList,ChangeList,GetItemList,Updater,WriteItem,WriteList,GetList,Delete}}>
			{props.children}
		</DataContext.Provider>
	)
}