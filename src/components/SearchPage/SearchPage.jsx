import React from 'react';
import { withRouter, Link, Route, Switch} from 'react-router-dom';
import Preloader from '../common/Preloader/Preloader';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {getUsers} from '../../redux/usersReducer';
import {filterUser} from '../../redux/usersReducer';
import {filterGroup} from '../../redux/usersReducer';
import {filterArticle} from '../../redux/articleReducer';
import s from './List.module.css';
import Items from './Items';
import Search from './Search';
import SearchForm from '../common/Form/SearchForm';
import {chooseTags} from '../../redux/globalFunctions';
import LinkBtn from '../common/Elems/LinkBtn';

let SearchPage = (props) => {
    if(!props.users || !props.articles || !props.groups) {
        return <Preloader />
    }
    let filterUsers = (values) => {
        props.filterUser(values.search, props.fullUsersList);
        props.filterGroup(values.search, props.fullGroupsList);
        props.filterArticle(values.search, props.fullArticlesList)
    }
    let locName = props.location.pathname.slice(1);
    
	return  <div className={s.wrapper}>
                <SearchForm onSubmit={filterUsers} onChange={filterUsers} />
                <section className={s.btnSec}>
                    <LinkBtn link="/search/users" name={locName === 'search/users' && 'active'} text="Users" />
                    <LinkBtn link="/search/groups" name={locName === 'search/groups' && 'active'} text="Groups" />
                    <LinkBtn link="/search/articles" name={locName === 'search/articles' && 'active'} text="Articles" />
                    <LinkBtn link="/search" className={locName === 'search' && 'active'} text="All" />
                </section>
                { props.users.concat(props.groups,props.articles).length>0 ? 
                    <Switch>
                        <Route exact path='/search' render={ ()=> 
                            <Search 
                                me={props.me} 
                                users={props.users} 
                                groups={props.groups} 
                                articles={props.articles}
                                myGroups={props.myGroups}
                                myFriends={props.myFriends} /> }/>
                        <Route path='/search/users' render={ ()=> 
                            <Items 
                                me={props.me} 
                                type="user" 
                                locName={props.location.search.slice(1)} 
                                items={props.users} 
                                chooseTags={chooseTags}
                                myArr={props.myFriends}
                                 /> }/>
                        <Route path='/search/groups' render={ ()=> 
                            <Items 
                                me={props.me} 
                                type="group" 
                                locName={props.location.search.slice(1)} 
                                items={props.groups} 
                                chooseTags={chooseTags}
                                myArr={props.myGroups}
                                 /> }/>
                        <Route path='/search/articles' render={ ()=> 
                            <Items 
                                me={props.me} 
                                type="article" 
                                locName={props.location.search.slice(1)} 
                                items={props.articles} 
                                chooseTags={chooseTags} /> }/>  
                    </Switch> :  
                 <p className={s.no}>No matches</p>}
            </div>	        
}
class SearchPageContainer extends React.Component {
    render () {
        if(!this.props.haveUsers || !this.props.haveArticles) {
            return <Preloader />
        }

        return <SearchPage 
            fullUsersList={this.props.fullUsersList} 
            fullGroupsList={this.props.fullGroupsList} 
            users={this.props.users}
            groups={this.props.groups} 
            filterUser={this.props.filterUser} 
            filterGroup={this.props.filterGroup}
            filterArticle={this.props.filterArticle}
            articles={this.props.articles}
            fullArticlesList={this.props.fullArticlesList}
            me={this.props.me} 
            myGroups={this.props.myGroups}
            myFriends={this.props.myFriends}
             />
    }
}
let mapStateToProps = (state) => ({
    users: state.users.filterUsersList,
    fullUsersList: state.users.users,
    groups: state.users.filterGroupsList,
    fullGroupsList: state.users.groups,
    haveUsers: state.users.haveItems,
    articles: state.articles.filterList,
    fullArticlesList: state.articles.list,
    haveArticles: state.articles.haveArticles,
    myFriends: state.meInfo.data.friends,
    myGroups: state.meInfo.data.follow,
    me: state.meInfo.id
})

export default compose(withRouter,connect(mapStateToProps, {
    getUsers, 
    filterUser, 
    filterGroup, 
    filterArticle}))(SearchPage);