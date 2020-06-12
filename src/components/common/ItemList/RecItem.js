import React from 'react';
import s from '../ItemList.module.css'; 
import {Link} from 'react-router-dom'; 
import Preloader from '../Preloader/Preloader';

let RecItem = (props) => {
	if(!props.haveUsers) {
		return <Preloader />
	}
	return 	<div>
				<span to={'/'+props.name} className={s.itemTitle}>{props.name}</span>
				<hr />
				<div className={s.itemRecUsers}>
					{props.items.map((u, index) => {
						if(index<12) {
							return <Link key={'link'+u.id} className={s.itemRecUser} to={"/user/"+u.id}><img className={s.elemAvatar} src={u.avatar} alt={u.name} /></Link>
						}
					})}
				</div>
			</div>
}
export default RecItem;