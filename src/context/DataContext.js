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
		//WriteData();
		setListId('');
	}
	const GetUserList=()=>{
		setUserGroceryList([]);
				groceryList.forEach(gl=>parseInt(gl.userId)===parseInt(userId)?setUserGroceryList(list=>[...list,gl]):(null))	 	 
	}
	const ChangeList=(x)=>{
		setListId(x);
		//WriteData();
	}
	const GetItemList=()=>{
		setUserItemList([])
		console.log('groceryList');
		//userGroceryList.forEach(ul=>ul.listId===listId?(console.log(ul),console.log(Object.values(ul.items))):console.log(null));
		//userGroceryList.forEach(ul=>ul.listId===listId?(Object.values(ul.items).map(child=>setUserItemList(list=>[...list,child]))):console.log(null));
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
		// userGroceryList.forEach(ul=>ul.listId===parseInt(listId)?
		// 	(ul.items!=undefined?(ul.items.forEach(product=>setUserItemList(list=>[...list,product]))):null):null);

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
		let db = firebase.database().ref('groceryA/'+listId+'/items');
		//console.log(db);
		//console.log(userItemList);
		//db.push(list);
		// const groceryIndex = groceryList.findIndex(g=>{
		// 	return g.listId === parseInt(listId);
		// })
		// let db = firebase.database().ref('grocery/'+groceryIndex);
		// (groceryIndex!=-1)?db.set(list):console.log('not found')	
	}
	const GetList = () => {
		console.log('get list')
		console.log('userItemList');
		setUserItemList([])
		let db = firebase.database().ref('groceryA/'+listId+'/items');
		db.once('value',snapshot=>{
			snapshot.forEach(item=>{
				console.log(snapshot)
				console.log(item.val())
				setUserItemList(list=>[...list,item.val()])
			})
		})
		console.log('here')
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

	return( 
		<DataContext.Provider value={{groceryList,userList,userGroceryList,userItemList,listId,userId,userTypeList,
			setGroceryList,setUserList,setListId,setUserId,setUserTypeList,
			ChangeUser,GetUserList,ChangeList,GetItemList,Updater,WriteData,WriteItem,WriteList,GetList}}>
			{props.children}
		</DataContext.Provider>
	)
}