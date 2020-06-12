import React, { useEffect } from 'react';
import { withRouter, Switch, Route} from 'react-router-dom';
import GroupInfo from './GroupInfo';
import GroupPost from './GroupPost';
import GroupMember from './GroupMember';
import GroupDes from './GroupDes';
import Preloader from '../common/Preloader/Preloader';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {getGroup} from '../../redux/usersReducer';
import {getGroupActions} from '../../redux/actionReducer';
import {addGroup, removeGroup} from '../../redux/meInfoReducer';

let Group = (props) => {
    if (!props.group) return <Preloader />
    let creator = props.users.find(item => item.id == props.group.data.creator); 
	return  <div>
				<GroupInfo 
                    locName={props.locName} 
                    group={props.group} 
                    id={props.id}
                    addGroup={props.addGroup}
                    removeGroup={props.removeGroup}
                    me={props.me} />
                <Switch>
                    <Route exact path={'/group/'+props.id} render={ () => <GroupPost 
                        me={props.me.id} 
                        actions={props.actions}  /> }/>
                    <Route path={'/group/'+props.id+'/members'} render={ () => <GroupMember 
                        me={props.me.id} 
                        group={props.group} 
                        items={props.users}
                        myFriends={props.myFriends} /> }/>
                    <Route path={'/group/'+props.id+'/description'} render={ () => <GroupDes 
                        creator={creator} 
                        group={props.group} /> }/>
                </Switch>
            </div>	        
}
let UserContainer = (props) => {
    let locName = props.location.pathname.split('/')[3];
    useEffect(()=>{
        props.getGroup(props.match.params.id);
        props.getGroupActions(props.match.params.id);
    }, [props.match.params.id]);
    if(props.loading || !props.haveUsers) return <Preloader />
    return <Group 
        locName={locName} 
        me={props.me} 
        group={props.group} 
        users={props.users} 
        id={props.match.params.id} 
        actions={props.actions}
        haveUsers={props.haveUsers}
        myFriends={props.myFriends}
        addGroup={props.addGroup}
        removeGroup={props.removeGroup} />
}
let mapStateToProps = (state) => ({
    group: state.users.group,
    actions: state.actions.groupActions,
    users: state.users.users,
    me: state.meInfo.data,
    myFriends: state.meInfo.data.friends,
    haveUsers: state.users.haveItems
})

export default compose(withRouter,connect(mapStateToProps, {addGroup, removeGroup, getGroup, getGroupActions}))(UserContainer);