import React, {useContext} from 'react';
import s from './Group.module.css';
import {Link} from 'react-router-dom';
import LinkBtn from '../common/Elems/LinkBtn';
import Tag from '../common/Elems/Tag';
import Button from '../common/Elems/Button';

let GroupInfo = ({group, id, locName, addGroup, removeGroup, me}) => {
	return <>
			<div className={s.imgArea} >
				<div className={s.imgAreaPhone} style={{ backgroundImage: 'url('+group.avatar+')'}}>
					<div className={s.imgAreaPhoneInfo}>
						<img className={s.iapAvatar} src={group.avatar} alt={group.name} / >
						<div className={s.iapText}>
							<h1 className={s.iapName}>@{group.name}</h1>
							<Tag link="#" text={'online'} name="blueTag" />
							{group.tag ? group.tag.map(t => <Tag link={'/search/users?'+t} text={t} />): null}
						</div>
					</div>
				</div>
			</div>
			<div className={s.infoWrite}>
				<ul className={s.infoBlock}>
					<Link to={'/group/'+id}><li className={locName ? null : s.active}>Home</li></Link>
					<Link to={'/group/'+id+'/members'}><li className={locName==='members' ? s.active : null}>Members</li></Link>
					<Link to={'/group/'+id+'/description'}><li className={locName==='description' ? s.active : null}>Description</li></Link>
				</ul>
				<div className={s.btnZone}>
				{me.follow.some(f => f === group.id) ? 
					<Button fun={()=>removeGroup(me.id, group.id)} text="Unfollow" font="13" /> : 
					<Button fun={()=>addGroup(me.id, group.id)} name="blue" text="Follow" font="13" />}
					<LinkBtn link={"/group/"+id} text="Post" />
				</div>
			</div>
			</>
}

export default GroupInfo;