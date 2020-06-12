import React from 'react';
import s from './List.module.css';
import Item from './Item';
let Search = props => {
	return  <section className={s.list}>
                <div>
                    {props.users.length > 0 ? <h2 className={s.h2} >Users</h2> : null}
				    {props.users.map((u,index) => <Item 
                        myArr={props.myFriends}
                         
                        type='user' 
                        me={props.me} 
                        u={u} 
                        key={'usersUser'+index} />)}
                </div>
                <div>
                    {props.groups.length > 0 ? <h2 className={s.h2} >Groups</h2> : null}
                    {props.groups.map((u,index) => <Item 
                        myArr={props.myGroups}
                          
                        type='group' 
                        me={props.me} 
                        u={u} 
                        key={'usersUser'+index} />)}
                </div>
                <div>
                    {props.articles.length > 0 ? <h2 className={s.h2} >Articles</h2> : null}
                    {props.articles.map((u,index) => <Item 
                        type='article'  
                        u={u} 
                        key={'usersUser'+index} />)}
                </div>
			</section>
}
export default Search;