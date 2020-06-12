import React from 'react';
import SearchForm from '../common/Form/SearchForm';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {compose} from 'redux';
import {filterUser} from '../../redux/usersReducer';
import {filterGroup} from '../../redux/usersReducer';
import {filterArticle} from '../../redux/articleReducer'

let SearchAside = (props) => {
	let search = (values) => {
		props.history.push('/search');
		props.filterUser(values.search, props.fullUsersList);
        props.filterGroup(values.search, props.fullGroupsList);
        props.filterArticle(values.search, props.fullArticlesList)
	}
	return  <div>
				<SearchForm onSubmit={search} />	
			</div>
}
let mapStateToProps = (state) => {
	return {
		fullUsersList: state.users.users,
		fullGroupsList: state.users.groups,
		fullArticlesList: state.articles.list,
	}
}
export default compose(withRouter, connect(mapStateToProps, {filterUser, filterGroup, filterArticle}))(SearchAside);