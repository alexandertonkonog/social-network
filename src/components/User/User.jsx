import React, { useEffect, useState } from 'react';
import { withRouter, Route, Switch} from 'react-router-dom';
import UserInfo from './UserInfo';
import Preloader from '../common/Preloader/Preloader';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {getUser} from '../../redux/usersReducer';
import {getUserActions} from '../../redux/actionReducer';
import UserPost from './UserPost';
import UserProfile from './UserProfile';
import UserFriends from './UserFriends';
import UserGroups from './UserGroups';
import {addFriend, removeFriend, changeAvatar} from '../../redux/meInfoReducer'; 

let User = (props) => {
    
	return  <div>
				<UserInfo 
                    locName={props.locName} 
                    me={props.me} 
                    user={props.user} 
                    id={props.id}
                    addFriend={props.addFriend}
                    removeFriend={props.removeFriend}
                    changeAvatar={props.changeAvatar} />
                <Switch>
                    <Route exact path={'/user/'+props.id} render={ () => <UserPost 
                        me={props.me.id} 
                        userActions={props.userActions} /> }/>
                    <Route path={'/user/'+props.id+'/profile'} render={ () => <UserProfile 
                        me={props.me.id} 
                        user={props.user}
                        users={props.users} /> }/>
                    <Route path={'/user/'+props.id+'/friends'} render={ () => <UserFriends 
                        myFriends={props.myFriends} 
                        me={props.me.id} 
                        user={props.user} 
                        items={props.users}
                         /> }/>
                    <Route path={'/user/'+props.id+'/groups'} render={ () => <UserGroups 
                        myGroups={props.myGroups} 
                        me={props.me.id} 
                        user={props.user} 
                        items={props.groups}
                         /> }/>
                </Switch>
            </div>	        
}
let UserContainer = (props) => {
    let locName = props.location.pathname.split('/')[3];
    
    useEffect(()=>{
        let id = props.match.params.id;
        props.getUser(id);
        props.getUserActions(id);
    }, [props.haveChanged, props.match.params.id]);

    if(props.loading || !props.haveUsers) return <Preloader />

    
    return <User 
                locName={locName} 
                me={props.me} 
                user={props.me.id === props.match.params.id ? props.data : props.user} 
                userActions={props.userActions} 
                id={+props.match.params.id}
                users={props.users}
                groups={props.groups}
                myGroups={props.myGroups}
                myFriends={props.myFriends} 
                addFriend={props.addFriend}
                removeFriend={props.removeFriend}
                changeAvatar={props.changeAvatar} />
}
let mapStateToProps = (state) => ({
    user: state.users.user,
    loading: state.users.loading,
    userActions: state.actions.userActions,
    me: state.meInfo.data,
    myFriends: state.meInfo.data.friends,
    myGroups: state.meInfo.data.follow,
    users: state.users.users,
    groups: state.users.groups,
    haveUsers: state.users.haveItems,
    haveChanged: state.meInfo.haveChanged
})

export default compose(withRouter,connect(mapStateToProps, {changeAvatar, addFriend, removeFriend, getUser,getUserActions}))(UserContainer);