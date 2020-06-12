import React, { useEffect } from 'react';
import {withRouter, Route, Switch} from 'react-router-dom';
import LiLink from '../common/Elems/LiLink';
import s from './Setting.module.css';
import Preloader from '../common/Preloader/Preloader'; 
import {connect} from 'react-redux';
import {compose} from 'redux';
import MainSet from './MainSet';
import {getUser} from '../../redux/usersReducer';
import {sendSetting} from '../../redux/meInfoReducer';

let Setting = (props) => {
    let users = props.users.filter(u => props.user.friends.some( num => num === u.id));
	return  <div className={s.setting} >
				<ul className={s.settingLinks}>
					<LiLink link={'/setting'} name={'active'} text="Main" />
				</ul>
				<Switch>
	            	<Route exact path="/setting" render={ () => <MainSet 
                        sendSetting={props.sendSetting} 
                        users={users} 
                        user={props.user} /> } />
	            </Switch>
            </div>

}

class SettingContainer extends React.Component {
    render () {
        if(!this.props.user || !this.props.users) return <Preloader /> 
        return <Setting 
            users={this.props.users} 
            me={this.props.me} 
            user={this.props.user}
            sendSetting={this.props.sendSetting} />
    }
}

let mapStateToProps = (state) => ({
    user: state.meInfo.data,
    users: state.users.users,
})

export default compose(withRouter, connect(mapStateToProps, {getUser, sendSetting}))(SettingContainer);