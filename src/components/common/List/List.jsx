import React from 'react';
import {Link} from 'react-router-dom';
import s from './List.module.css';
 
let List = ({u, type}) => {
	return  <div className={s.user} >
                <div className={s.userInfo}>
                    <Link to={'/'+type+'/'+u.id}> 
                        <img className={s.img} src={u.avatar} alt={u.name} />
                    </Link>
                    <div className={s.userInfoText}>
                        <Link to={'/'+type+'/'+u.id} className={s.userName}>{u.name}</Link>
                        <p className={s.userFriends}>
                            {u.friends}
                            {type==='group' && ' followers'}
                            {type==='user' && ' friends'}
                        </p>
                    </div>
                </div>
                <div className={s.userFollow}>
                    <button className={s.btnFollow}>Follow</button>
                </div>
            </div>       
}
export default List;
