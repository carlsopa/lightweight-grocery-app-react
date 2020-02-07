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
	const [a, setA] = useState([]);

	const [lId, setLId] = useState(0);

	useEffect(()=>{
		const fetch = async()=>{
			let db = firebase.database().ref('groceryA/');
			db.on('value',snapshot=>{
				snapshot.forEach(child=>{
					setGroceryList(list=>[...list,child.val()])
				})
			})
			db = firebase.database().ref('users/');
			db.on('value',snapshot=>{
				setUserList(snapshot.val());
			})
			db = firebase.database().ref('categories')
			db.on('value',snapshot=>{
				setUserTypeList(snapshot.val());
			})
		}
		fetch();
	},[])

	const ChangeUser=(x)=>{
		setUserId(x);
		WriteData();
		setListId('');
	}
	const GetUserList=()=>{
		setUserGroceryList([]);
				groceryList.forEach(gl=>parseInt(gl.userId)===parseInt(userId)?setUserGroceryList(list=>[...list,gl]):(null))	 	 
	}
	const ChangeList=(x)=>{
		setListId(x);
		WriteData();
	}
	const GetItemList=()=>{
		setUserItemList([])
		userGroceryList.forEach(ul=>ul.listId===parseInt(listId)?
			(ul.items!=undefined?(ul.items.forEach(product=>setUserItemList(list=>[...list,product]))):null):null);

	}
	
	const Updater=(pr,qu,index)=>{
		const itemIndex = userItemList.findIndex(u=>{
			return u.listItemId === parseInt(index)})
		const item = {...userItemList[itemIndex]}
		const items = [...userItemList]
		item.product = pr;
		item.quantity = qu;
		items[itemIndex] = item;
		setUserItemList(items);
	}
	const WriteData= ()=>{
		console.log('write');
		let list='';
		userGroceryList.forEach(ul=>ul.listId===parseInt(listId)?
			(list=ul,
			ul.items=userItemList):null);
		// const groceryIndex = groceryList.findIndex(g=>{
		// 	return g.listId === parseInt(listId);
		// })
		// let db = firebase.database().ref('grocery/'+groceryIndex);
		// (groceryIndex!=-1)?db.set(list):console.log('not found')	
	}
	const WriteItem = (p,c,q,t) => {
		console.log(lId);
		console.log(p);
		console.log(c);
		console.log(q);
		console.log(t);
		console.log(listId);
		let item = {cart:false,category:c,listItemId:32,product:p,quantity:q,unit:t}
		console.log(item)
		console.log(userItemList);
		setUserItemList(userItemList.concat(item))
		WriteData();
		// const index = groceryList.findIndex(g=>{
		// 	return g.listId === parseInt(listId);
		// })
		// console.log(index);
		// // console.log(groceryIndex);
		// let db = firebase.database().ref('grocery/'+index+'/items');
		// (index!=-1)?db.push(item):console.log('error');

	}
	const WriteList = (x) => {
		console.log(x);
		console.log(userId);
		let db = firebase.database().ref('groceryA');
		let key = db.push().key;
		console.log(key)
		const list = {items:[],title:x,listId:key,userId:userId};
		(userId!='')?
			(x!='')?
				firebase.database().ref('groceryA/'+key).update(list):
				console.log('enter a list')
			:console.log('choose a person')
	}

	return( 
		<DataContext.Provider value={{groceryList,userList,userGroceryList,userItemList,listId,userId,userTypeList,lId,
			setGroceryList,setUserList,setListId,setUserId,setUserTypeList,
			ChangeUser,GetUserList,ChangeList,GetItemList,Updater,WriteData,WriteItem,WriteList}}>
			{props.children}
		</DataContext.Provider>
	)
}