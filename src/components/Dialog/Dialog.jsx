import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import DialogForm from '../common/Form/DialogForm';
import Preloader from  '../common/Preloader/Preloader';
import s from './Dialog.module.css';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {postMessage} from '../../redux/messagesReducer';
import {getMessages} from '../../redux/messagesReducer';
import {getUser} from '../../redux/usersReducer';

let Dialog = (props)=>{	
	let sendMessage = (values) => {
		let message = {
			id: props.me,
			userId: props.userId,
			text: values.message
		}
		props.postMessage(message);
		values.message = '';
	}
	let checkUserImg = (id, dialog) => {
		let img = id === dialog.firstUser.id ? dialog.firstUser.img : dialog.secondUser.img;
		return img;
	}
	let checkUserName = (id, dialog) => {
		let name = id === dialog.firstUser.id ? dialog.firstUser.name : dialog.secondUser.name;
		return name;
	}
	return  <div className={s.messageContainer}>
				{props.user ? <div className={s.titlePage}>
						<Link className={s.back} to="/messages">Back</Link>
						<Link to={"/user/"+props.user.id}><h3 className={s.nameFriend}>{props.user.name}</h3></Link>
						<Link to={"/user/"+props.user.id}><img className={s.friendImg} alt={props.user.name} src={props.user.avatar} /></Link>
					</div> : <div className={s.titlePageEmpty}><p className={s.not}>Нет такого пользователя</p></div>}
				<div className={s.messageList}>
					{typeof props.dialog === 'object' && props.dialog.list.length > 0 ? props.dialog.list.map((m, index) => <div key={'message'+index} className={s.message}>
							<Link to={"/user/"+m.userId} >
								<img alt={checkUserName(m.userId, props.dialog)} className={s.linkImg} src={checkUserImg(m.userId, props.dialog)} />
							</Link>
							<div className={s.textZone}>
								<div className={s.nameZone}>
									<h3><Link to={"/user/"+m.userId} >{checkUserName(m.userId, props.dialog)}</Link><span className={s.time}>{m.date+' '+m.time}</span></h3>
									<p className={s.messageText}>{m.text}</p>
								</div>
								
							</div>
						</div>) : <p className={s.not}>У Вас пока нет сообщений с этим пользователем</p>}
					
				</div>
				<DialogForm onSubmit={sendMessage} />
            </div>
}

class DialogContainer extends React.Component {
	componentDidMount () {
		this.props.getMessages(this.props.me, this.props.match.params.id);
		this.props.getUser(this.props.match.params.id);
	}
	render () {
		if(!this.props.dialog) return <Preloader />
		return <Dialog 
			user={this.props.user} 
			userId={+this.props.match.params.id} 
			postMessage={this.props.postMessage} 
			dialog={this.props.dialog} 
			me={this.props.me} />
	}
}

let mapStateToProps = (state) => ({
	dialog: state.messages.dialog,
	me: state.meInfo.id,
	user: state.users.user
})


export default compose(withRouter, connect(mapStateToProps, {postMessage,getMessages, getUser}))(DialogContainer);