import React from 'react';
import s from '../User/User.module.css';
import {Link} from 'react-router-dom';

let Action = ({action}) => {
    let a = action;
	return <div className={s.latestElem} >           
                {a.actionCode===1 &&  <div><Link to={'/user/'+a.user.id}> <img alt={a.user.name} src={a.user.img} className={s.latestImg} alt={a.user.name}/></Link><div className={s.latestInfo}>
                                        <p className={s.mainText}> 
                                            <Link to={'/user/'+a.user.id}>{a.user.name}</Link> posted  
                                        </p>
                                        <p className={s.lowText}>{a.postText}</p>
                                        <p className={s.date}>{a.date}</p>
                                        </div></div>}
                {a.actionCode===2 && a.followedUser.type==='user' && <div><p className={s.friend}>
                                        <Link to={'/user/'+a.user.id}> <img alt={a.user.name} src={a.user.img} className={s.friendImg} /></Link>
                                        <Link to={'/user/'+a.user.id} className={s.friendName} >{a.user.name}</Link> and 
                                        <Link to={'/user/'+a.followedUser.id}> <img alt={a.user.name} src={a.followedUser.img} className={s.friendImg} /></Link>
                                        <Link to={'/user/'+a.followedUser.id} className={s.friendName} >{a.followedUser.name}</Link> are now friends <br/> <p className={s.date}>{a.date}</p>
                                    </p></div>}
                {a.actionCode===2 && a.followedUser.type==='group' && <div><p className={s.friend}>
                                        <Link to={'/user/'+a.user.id}> <img alt={a.user.name} src={a.user.img} className={s.friendImg} /></Link>
                                        <Link to={'/user/'+a.user.id} className={s.friendName} >{a.user.name}</Link> followed 
                                        <Link to={'/group/'+a.followedUser.id}> <img alt={a.user.name} src={a.followedUser.img} className={s.friendImg} /></Link>
                                        <Link to={'/group/'+a.followedUser.id} className={s.friendName} >{a.followedUser.name}</Link> <br/> <p className={s.date}>{a.date}</p>
                                    </p></div>}                       
                {a.actionCode===3 && <div><Link to={'/user/'+a.user.id}> <img alt={a.user.name} src={a.user.img} className={s.latestImg} alt={a.user.name}/></Link><div className={s.latestInfo}>
                                        <p className={s.mainText}> 
                                            <Link to={'/user/'+a.user.id} className={s.nameUserAction}>{a.user.name}</Link> 
                                             posted in the group
                                            <Link to={'/group/'+a.group.id}>
                                                <img alt={a.user.name} src={a.group.img} className={s.friendImg} />
                                            </Link>
                                            <Link to={'/group/'+a.group.id}>{a.group.name}
                                            </Link> 
                                        </p>
                                        <p className={s.lowText}>{a.postText}</p>
                                        <p className={s.date}>{a.date}</p> 
                                        </div></div>}                        
            </div>
}

export default Action;