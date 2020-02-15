import React from 'react'
import Header from './components/top/header'
import List from './components/list'
import {GroceryDataProvider} from './context/DataContext'

function App() {
	return(
		<div>
			<h1>React Testing App</h1>
			<GroceryDataProvider>
				<Header/>
				<List/>
			
			</GroceryDataProvider>
		</div>)
}
export default App;