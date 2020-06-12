import React from 'react';
import s from '../ItemList.module.css'; 
import {Link} from 'react-router-dom'; 
import Preloader from '../Preloader/Preloader';
import Tag from '../Elems/Tag';
let RecItem = (props) => {
	if(!props.haveUsers) {
		return <Preloader />
	}
	return 	<div>
				<Link to={'/search/users'} className={s.itemTitle}>{props.name}</Link>
				<hr />
				<div className={s.itemTags}>
					{props.tags.map((t,num) => <Tag link={'/search/users?'+t} text={t} />)}
				</div>
				<div className={s.itemElems}>
					{props.items.map((u, index) => {
						if(index<5) {
							return <div className={s.itemElem} key={u.id+'user'}>
								<Link to={"/user/"+u.id}><img className={s.elemAvatar} src={u.avatar} alt={u.name} /></Link>
								<div className={s.elemDes}>
									<Link to={"/user/"+u.id} className={s.elemName}>{u.name}</Link> <br/>
									<p>{u.friends.length} friends</p>
								</div>
							</div>
						}
					})}
				</div>
			</div>
}
export default RecItem;