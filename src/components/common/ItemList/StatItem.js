import React from 'react';
import s from '../ItemList.module.css';  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt,faComments,faUser,faUsers} from '@fortawesome/free-solid-svg-icons';
import Preloader from '../Preloader/Preloader';

let StatItem = (props) => {
	if(!props.articles) {
		return <Preloader />
	}
	let articles = props.articles.filter(a => a.autor.id === props.me.id).length
	return 	<div>
				<span to={'/'+props.name} className={s.itemTitle}>{props.name}</span>
				<hr />
				<div className={s.itemStatistics}>
					<div className={s.stItem} >
						<div className={s.icon} ><FontAwesomeIcon icon={faPencilAlt} /></div>
						<div className={s.stName} >Articles</div>
						<div className={s.stNum} >{articles}</div>
					</div>
					<div className={s.stItem} >
						<div className={s.icon} ><FontAwesomeIcon icon={faComments} /></div>
						<div className={s.stName} >Comments</div>
						<div className={s.stNum} >0</div>
					</div>
					<div className={s.stItem} >
						<div className={s.icon} ><FontAwesomeIcon icon={faUser} /></div>
						<div className={s.stName} >Friends</div>
						<div className={s.stNum} >{props.me.friends.length}</div>
					</div>
					<div className={s.stItem} >
						<div className={s.icon} ><FontAwesomeIcon icon={faUsers} /></div>
						<div className={s.stName} >Groups</div>
						<div className={s.stNum} >{props.me.follow.length}</div>
					</div>
				</div>
			</div>
}
export default StatItem;