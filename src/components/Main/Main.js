import Login from '../LoginSign/Login';
import SignUp from '../LoginSign/SignUp';
import React from 'react';
import {Route, withRouter, Switch} from 'react-router-dom';
import SidebarLeft from '../Sidebars/SidebarLeft';
import SidebarRight from '../Sidebars/SidebarRight';
import Feed from '../Feed/Feed';
import User from '../User/User';
import SearchPage from '../SearchPage/SearchPage';
import Group from '../Group/Group';
import CreateArticle from '../Article/CreateArticle';
import Article from '../Article/Article';
import Dialog from '../Dialog/Dialog';
import Setting from '../Setting/Setting';
import Messages from '../Messages/Messages';
import s from './Main.module.css';
import {connect} from 'react-redux';
import {compose} from 'redux';

let Main = (props) => {
	//feed
	return  <main className={s.main}>
				{props.isLogin ? <SidebarLeft /> : null}
				<div className="middleModule">
					{props.isLogin ? <Switch>
										<Route exact path='/' component={Feed} />
										<Route path='/feed' component={Feed} />
										<Route path='/search' component={SearchPage} />
										<Route path='/messages' component={Messages} />
										<Route path='/setting' component={Setting} />
										<Route path='/dialog/:id?' component={Dialog} />
										<Route path='/group/:id?' component={Group} />
										<Route path='/article/:id?' component={Article} />
										<Route path='/create-article' component={CreateArticle} />
										<Route path='/user/:id?' render={ ()=> <User /> }/>
										<Route component={Feed} />
									</Switch> : 
									<Switch> 
										<Route path='/login' component={Login} />
										<Route path='/signup' component={SignUp} />
										<Route component={Login} />
									</Switch>}

				</div>
				{props.isLogin ? <SidebarRight /> : null}
			</main>
}

let mapStateToProps = (state) => {
	return {
		isLogin: state.meInfo.isLogin,
	}
}
class MainContainer extends React.Component {
	render () {
		return <Main isLogin={this.props.isLogin} />
	}	
}
export default compose(withRouter,connect(mapStateToProps, {}))(MainContainer);