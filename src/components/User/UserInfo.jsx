import React, {useState} from 'react';
import s from './User.module.css';
import {Link} from 'react-router-dom';
import LinkBtn from '../common/Elems/LinkBtn';
import Button from '../common/Elems/Button';
import Tag from '../common/Elems/Tag';
import LiLink from '../common/Elems/LiLink';
import FileForm from '../common/Form/FileForm';

let UserInfo = ({locName, user, id, me, addFriend, removeFriend, changeAvatar}) => {
	let [activeModal, setActiveModal] = useState(false);
	let [status, setStatus] = useState(false);
	if(!user) return <p>null</p>
	return <>
			<div className={s.imgArea} >
				<div className={s.imgAreaPhone}>
					<div className={s.imgAreaPhoneInfo}>
						<img className={s.iapAvatar} src={user.avatar} alt={user.name} / >
						<div className={s.iapText}>
							<h1 className={s.iapName}>@{user.name}</h1>
							<div className={s.iapTimeSec}>
								{me.id === id ? <Tag text="online" link="#" name="blueTag" /> : <Tag link="#" text={'was online '+user.active} name="blueTag" />}
								{user.tag ? user.tag.map(t => <Tag link={'/search/users?'+t} text={t} />): null}
							</div>
							{me.id === id && <Button font="12" name="blue" pad="5" text="change photo" fun={()=>setActiveModal(!activeModal)} />}
						</div>
					</div>
				</div>
			</div>
			{activeModal && <section className={s.changeImgSec}>
							<FileForm 
								me={me.id} 
								setActiveModal={setActiveModal} 
								changeAvatar={changeAvatar}
								setStatus={setStatus}  />
						</section>}
			{status && <section className={s.changeImgSec}>
				<p className={s.info}>Photo is changed</p>
			</section>}
			<div className={s.infoWrite}>
				<ul className={s.infoBlock}>
					<LiLink link={'/user/'+id} name={locName ? null : 'active'} text="Activity" />
					<LiLink link={'/user/'+id+'/profile'} name={locName==='profile' && "active"} text="Profile" />
					<LiLink link={'/user/'+id+'/friends'} name={locName==='friends' && "active"} text="Friends" />
					<LiLink link={'/user/'+id+'/groups'} name={locName==='groups' && "active"} text="Groups" />
				</ul>
				<div className={s.btnZone}>
					{user.id === me.id ? null : me.friends.some(f => f === user.id) ? 
						<Button fun={()=>removeFriend(me.id, user.id)} text="Unfollow" font="13" /> : 
						<Button fun={()=>addFriend(me.id, user.id)} name="blue" text="Follow" font="13" />}
						<LinkBtn link={"/create-article"} text="Create article" font="13" />
						<LinkBtn link={"/dialog/"+id} text="Write" font="13" />
				</div>
			</div>
			
			</>
}

export default UserInfo;	