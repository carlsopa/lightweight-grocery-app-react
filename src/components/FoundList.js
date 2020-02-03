import React from 'react'

export const Found = () => {
	return(
		<div>
			<div>
				<input type="checkbox"/>
			</div>
			<div>
				<span className='product'></span>
				<span className='quantityValue'></span>
				<span className='quantityType'></span>
			</div>
			<div>
				<button type='button'>Edit Item</button>
				<button type='button'>Delete Item</button>
			</div>
		</div>)
}