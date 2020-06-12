import React from 'react';
import s from './User.module.css';
import Action from '../common/Action';
import DialogForm from '../common/Form/DialogForm';

let UserPost = (props) => {
	let sendMessage = ()=>{}
	return <>
			<section className={s.form}>
                <DialogForm onSubmit={sendMessage} />
            </section>
			<div className={s.latestElems}>
                {props.userActions.map((a, index)=>{return  <Action action={a} index={props.index} key={'userWallPosts'+index} />})}                 
            </div>
		   </>
}

export default UserPost;