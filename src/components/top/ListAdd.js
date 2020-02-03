import React from 'react';

export const ListAdd = () => {
	return(
		<div>
		<form>
		<input type="text" defaultValue={"food"}/>
		<select>
		<option>{'Item 1'}</option>
		<option>{'Item 2'}</option>
		</select><br/>
		<input type="number" defaultValue={0}/>
		<select>
		<option>{'Item 1'}</option>
		<option>{'Item 2'}</option>
		</select><br/>
		<button type="submit">Add</button>
		</form>
		</div>)
}