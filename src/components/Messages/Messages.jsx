import React from 'react';
import {Link} from 'react-router-dom';
import s from './Messages.module.css';
import {connect} from 'react-redux';
import {getDialogs} from '../../redux/messagesReducer';
import Preloader from  '../common/Preloader/Preloader';

let Messages = (props)=>{
	
	return  <div className={s.messageContainer}>
				{props.list.length>0 ? props.list.map((d,index) => <Link key={'d'+index} to={"/dialog/"+d.user.id} className={s.messageItem}>
					<img className={s.linkImg} src={d.user.img} alt="" />
					<div className={s.textZone}>
						<div className={s.nameZone}>
							<h3>{d.user.name}</h3>
							<p className={d.adresant === props.me ? s.adresant : ''}>
								{d.adresant === props.me ? <span className={s.youSpan} >Вы: </span> : ''} 
								{d.lastMessage && d.lastMessage.length>47 ? d.lastMessage.slice(0,47)+'...' : d.lastMessage}
							</p>
						</div>
						<div className={s.time}>{d.date+' '+d.time}</div>
					</div>
				</Link>) : <div className={s.not}>У Вас пока нет диалогов</div>}
				
				
            </div>
}


class MessagesContainer extends React.Component {
	componentDidMount () {
		this.props.getDialogs(this.props.me);
	}
	render () {
		if(!this.props.list) return <Preloader />
		return <Messages list={this.props.list} me={this.props.me} />
	}
}

let mapStateToProps = (state) => ({
	list: state.messages.dialogsList,
	me: state.meInfo.id
})


export default connect(mapStateToProps, {getDialogs})(MessagesContainer);