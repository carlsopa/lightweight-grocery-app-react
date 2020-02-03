import React, {useState, useEffect} from 'react';
import firebase from 'firebase';
import firebaseConfig from '../../initfirebase'
import 'firebase/firestore';
import Card from './card'
 const People = () => {
 	const [people,setPeople] = useState([]);
 	useEffect(()=>{
 		console.log('first')
 		const fetch = async()=>{
			let db = firebase.database().ref('people');
			db.on('value',snapshot=>{
				console.log(snapshot.val())
				setPeople(snapshot.val());
			})
		}
		fetch();

 	},[])
 	const RemovePerson=(x)=>{
 		const newPeople = [...people]
 		newPeople.splice(x,1);
 		setPeople(newPeople)
 	}
 	const Updater=(x, index)=>{
 		const peopleIndex = people.findIndex(p=>{
 			return p.id === index;
 		})
 		//console.log(people[peopleIndex]);
 		const Person = {...people[peopleIndex]}
 		//console.log(Person);
 		Person.name = x;
 		const Persons = [...people];
 		Persons[peopleIndex] = Person;
 		setPeople(Persons);

 	}
	return(
		<div>
			{people.map((person,index)=><Card 
				key={person.id} index={person.id} check={RemovePerson} update={Updater}
				id={index}	name={person.name} 
				age={person.age} occupation={person.occupation}/>)}
		<input type="button" onClick={console.log(people)}/>
		</div>)
}
export default People;