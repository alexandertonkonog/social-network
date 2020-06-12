import React from 'react';
import s from './List.module.css';
import {Link} from 'react-router-dom';
import Item from './Item';
import LinkBtn from '../common/Elems/LinkBtn';
let Items = props => {
    return  <>
            <section className={s.btnSec+' '+s.btnSecMin}>
                {props.chooseTags(props.items).map( (t,index) => {
                    return <LinkBtn font='12' pad='7' link={'/search/'+props.type+'s?'+t} text={t} name={props.locName===t && 'active'} />})}
                <LinkBtn font='12' pad='7' link={'/search/'+props.type+'s'} text="All" name={!props.locName && 'active'} />
            </section>
            <section className={s.list}>
                <div>
                    <h2 className={s.h2} >{props.type+'s'}</h2>
				    {
                        props.locName ? 
                        props.items
                            .filter(u => u.tag.includes(props.locName))
                            .map((u,index) => <Item 
                                myArr={props.myArr} 
                                me={props.me} 
                                u={u} 
                                type={props.type} 
                                key={'usersUser'+index}
                                 /> ) : 
                        props.items.map((u,index) => <Item 
                            myArr={props.myArr}
                             
                            me={props.me} 
                            u={u} 
                            type={props.type} 
                            key={'usersUser'+index} /> )
                    }
                </div>
			</section>
            </>
}
export default Items;