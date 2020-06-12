import React from 'react';
import s from './Group.module.css';
import Action from '../common/Action';
import DialogForm from '../common/Form/DialogForm';

let GroupPost = (props) => {
	let sendMessage = ()=>{}
	return <>
			<section className={s.form}>
                <DialogForm onSubmit={sendMessage} />
            </section>
			<div className={s.latestElems}>
                {props.actions.map((a, index)=>{return  <Action action={a} index={props.index} key={'userWallPosts'+index} />})}                 
            </div>
		   </>
}

export default GroupPost;