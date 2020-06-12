import React from 'react';
import s from './Group.module.css';
import Tag from '../common/Elems/Tag';

let GroupDes = ({group, creator}) => {
	if(!group || !creator) return <p>null</p> 
	let arr = [];
	let count = 0;
	for (let key in group.data) {
		if(!group.data[key]) count += 1;
	}
	return  <section className={s.profileSec}>
				{Object.keys(group.data).length === count ? 
					<div className={s.not}>Нет данных</div> : 
					<table>
						<tr><td>Creator:</td><td>{creator.name}</td></tr>
						<tr><td>Creation:</td><td>{group.data.creationTime}</td></tr>
						<tr><td>Type:</td><td>{group.data.type.map( i => <Tag link="#" text={i} />)}</td></tr>
					</table>}
			</section>
}

export default GroupDes;