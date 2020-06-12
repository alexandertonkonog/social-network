import React, { useEffect } from 'react';
import s from './Sidebar.module.css';
import SearchAside from '../common/SearchAside.js';
import {connect} from 'react-redux';
import {compose} from 'redux';
import { withRouter} from 'react-router-dom';
import UserItem from '../common/ItemList/UserItem.js';
import GroupItem from '../common/ItemList/GroupItem.js';
import RecItem from '../common/ItemList/RecItem.js';
import {getUsers} from '../../redux/usersReducer';
import {getGroups} from '../../redux/usersReducer';
import {chooseTags} from '../../redux/globalFunctions';
let SidebarLeft = (props) => {
	return  <aside className={s.sidebar}>
				<SearchAside />
				<UserItem haveUsers={props.haveUsers} name="users" items={props.users} tags={props.tagsUser} />
				<GroupItem haveUsers={props.haveUsers} name="groups" items={props.groups} tags={props.tagsGroup} />
				<RecItem haveUsers={props.haveUsers} name="recently active users" items={props.users} />
			</aside>
}

let SidebarLeftContainer = (props) => {
	useEffect(() => {
		props.getUsers();
		props.getGroups();
	}, [props.haveUsers, props.haveChanged]);
	
	return <SidebarLeft  
				location={props.location.pathname} 
				tagsUser={chooseTags(props.users)} 
				tagsGroup={chooseTags(props.groups)} 
				getUsers={props.getUsers}
				getGroups={props.getGroups}
				haveUsers={props.haveUsers} 
				isLogin={props.isLogin} 
				users={props.users} 
				groups={props.groups} />
}

let mapStateToProps = (state) => {
	return {
		users: state.users.users,
		groups: state.users.groups,
		isLogin: state.meInfo.isLogin,
		haveUsers: state.users.haveItems,
		haveChanged: state.meInfo.haveChanged
	}
}

export default compose(withRouter, connect(mapStateToProps, {getUsers, getGroups}))(SidebarLeftContainer);