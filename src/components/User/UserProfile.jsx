import React from 'react';
import s from './User.module.css';
import Tag from '../common/Elems/Tag';
let UserProfile = ({user, users}) => {
	if(!user) return <p>null</p>
	let arr = [];
	let count = 0;
	for (let key in user.data) {
		if(user.data[key]) {
			if(typeof user.data[key] === 'object') {
				if(user.data[key].length>0) {
					if(key === 'family') {
						arr.push(<tr><td>{key}:</td><td>{users.filter(u => user.data[key].some(item => item === u.id)).map( u => <Tag link="#" text={u.name} />)}</td></tr>)
					} else {
						arr.push(<tr><td>{key}:</td><td>{user.data[key].map( i => <Tag link="#" text={i} />)}</td></tr>)
					}
				} else {
					count += 1;
				}
			} else {
				arr.push(<tr><td>{key}:</td><td>{user.data[key]}</td></tr>)
			}
		}else {
			count += 1
		} 
	}
	return  <section className={s.profileSec}>
				{typeof user.data === 'object' && Object.keys(user.data).length === count ? 
					<div className={s.not}>Нет данных</div> : 
					<table>{arr}</table>}
			</section>
}

export default UserProfile;