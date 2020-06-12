import React, {useEffect} from 'react';
import s from './Sidebar.module.css';
import {connect} from 'react-redux';
import StatItem from '../common/ItemList/StatItem.js';
import TextItem from '../common/ItemList/TextItem.js';
import RepliesItem from '../common/ItemList/RepliesItem.js';
import {getActions} from '../../redux/actionReducer';
import {chooseTags} from '../../redux/globalFunctions';


let SidebarRight = (props) => {
	return  <aside className={s.sidebar}>
				<StatItem name="statistics" articles={props.posts} me={props.me} />
				<TextItem  haveArticles={props.haveArticles} name="recent articles" posts={props.posts} tags={props.tags} />
				<RepliesItem haveActions={props.haveActions}  name="recent replies" articles={props.actions}  />
			</aside>
}

let SidebarRightContainer = (props) => {
	useEffect(() => {
        props.getActions();
    }, [props.haveActions]);
	let actions = props.actions.filter( a => a.actionCode===1 || a.actionCode===3);
	return <SidebarRight 
		actions={actions} 
		haveActions={props.haveActions} 
		 
		posts={props.posts} 
		tags={chooseTags(props.posts)} 
		haveArticles={props.haveArticles}
		me={props.me} />
}

let mapStateToProps = (state) => {
	return {
		posts: state.articles.list,
		me: state.meInfo.data,
		haveArticles: state.articles.haveArticles,
		haveActions: state.actions.haveActions,
		actions: state.actions.list
	}
}

export default connect(mapStateToProps, {getActions})(SidebarRightContainer);