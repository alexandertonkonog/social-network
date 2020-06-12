import React from 'react';
import s from './Group.module.css';
import Item from '../SearchPage/Item';
import Preloader from '../common/Preloader/Preloader';

let GroupMember = (props) => {
	if (!props.group) return <Preloader />
	let users =  props.items.filter(u => props.group.friends.some( num => num===u.id));
	return  <section className={s.friendSec}>
				{users.length > 0 ? users.map((u,index) => <Item 
					
					myArr={props.myFriends} 
					me={props.me} 
					u={u} 
					type="user" 
					key={'usersUser'+index} />) : <div className={s.not}>Нет подписчиков</div>}
			</section>
}

export default GroupMember;