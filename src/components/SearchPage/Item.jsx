import React from 'react';
import {Link} from 'react-router-dom';
import s from './List.module.css';
import Button from '../common/Elems/Button';
import LinkBtn from '../common/Elems/LinkBtn';
import {connect} from 'react-redux';
import {addGroup, addFriend, removeFriend, removeGroup} from '../../redux/meInfoReducer';

let Item = ({u, me, type, myArr, addGroup, addFriend, removeFriend, removeGroup, loading}) => {
	return  <div className={s.user} >
                <div className={s.userInfo}>
                    <Link to={'/'+type+'/'+u.id}> 
                        {type === 'article' ? 
                            <img className={s.imgArticle} src={u.img} alt={u.name} /> : 
                            <img className={s.img} src={u.avatar} alt={u.name} />}
                    </Link>
                    <div className={s.userInfoText}>
                        <Link to={'/'+type+'/'+u.id} className={s.userName}>{u.name}</Link>
                        {type === 'user' && <p className={s.userFriends}>{u.friends.length} friends</p>}
                        {type === 'group' && <p className={s.userFriends}>{u.friends.length} followers</p>}
                        {type === 'article' && <p className={s.userFriends}>by <Link to={'/user/'+u.autor.id}>{u.autor.name}</Link></p>}
                    </div>
                </div>
                {u.id === me && type === 'user' ?<div className={s.userFollow}>
                                <LinkBtn name="blue" link={'/user/'+me} text="It's me" />
                            </div> : 
                            <div className={s.userFollow}>
                                {type === 'user' ? (myArr.some(f => f===u.id) ? 
                                    <Button fun={()=>removeFriend(me, u.id)} disabled={loading.some(item => item===u.id)} className={s.btnFollow} text="Unfollow" /> :
                                    <Button fun={()=>addFriend(me, u.id)} disabled={loading.some(item => item===u.id)} name="blue" text="Follow" />) : null}
                                {type === 'group' ? (myArr.some(f => f===u.id) ? 
                                    <Button fun={()=>removeGroup(me, u.id)} disabled={loading.some(item => item===u.id)} className={s.btnFollow} text="Unfollow" /> :
                                    <Button fun={()=>addGroup(me, u.id)} disabled={loading.some(item => item===u.id)} name="blue" text="Follow" />) : null }
                                {type === 'article' ? <LinkBtn name="blue" link={'/article/'+u.id} text="Read" /> : null}
                            </div>  
                }
            </div>       
}

let mapStateToProps = (state) => ({
    loading: state.meInfo.loading
})

export default connect( mapStateToProps ,{addGroup, addFriend, removeFriend, removeGroup})(Item);
