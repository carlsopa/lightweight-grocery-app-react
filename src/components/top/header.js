import React from 'react';

import {ListAdd} from './ListAdd';
import {Select} from './ListSelect';
import {HeaderBar} from './ListHeader';

export const Header = () => {
	return(
		<div>

		<HeaderBar/>
		<Select/>
		<ListAdd/>

		</div>)
}