import React from 'react';
import s from './User.module.css';
import Item from '../SearchPage/Item';
import Preloader from '../common/Preloader/Preloader';

let UserFriends = (props) => {
	if (!props.user) return <Preloader />
	let users =  props.items.filter(u => props.user.friends.some( num => num===u.id));
	return  <section className={s.friendSec}>
				{users.length > 0 ? users.map((u,index) => <Item 
					myArr={props.myFriends} 
					me={props.me} 
					u={u} 
					type="user" 
					key={'usersUser'+index} />) : <div className={s.not}>There are not friends</div>}
			</section>
}

export default UserFriends;