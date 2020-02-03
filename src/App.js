import React from 'react';
import './App.css';
import './list.css';

import {GroceryListProvider} from './context/ListContext';
import {GroceryUserProvider} from './context/UserContext';
import {GroceryDataProvider} from './context/DataContext';
import {Header} from './components/top/header';
import {List} from './components/list';

function App() {
  return (
    <div className="GroceryList">
        <GroceryDataProvider>
        <GroceryUserProvider>
        <GroceryListProvider>
        <Header/>
        <List/>
        </GroceryListProvider>
        </GroceryUserProvider>
        </GroceryDataProvider>
    </div>

  );
}

export default App;
