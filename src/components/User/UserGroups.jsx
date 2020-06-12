import React from 'react';
import s from './User.module.css';
import Item from '../SearchPage/Item';
import Preloader from '../common/Preloader/Preloader';

let UserGroups = (props) => {
	if (!props.user) return <Preloader />
	let groups = props.items.filter(g => props.user.follow.some( num => num===g.id));
	return  <section className={s.friendSec}>
				{groups.length>0 ? groups.map((u,index) => <Item 
					myArr={props.myGroups} 
					me={props.me} 
					u={u} 
					type="group" 
					key={'usersUser'+index} />): <div className={s.not}>Нет подписок</div>}
			</section>
}

export default UserGroups;