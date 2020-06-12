import React from 'react';
import s from '../Feed.module.css';
import {Redirect} from 'react-router-dom';
import Preloader from '../../common/Preloader/Preloader';
import Action from '../../common/Action';
let LatestActivity = (props) => {
    if (!props.haveActions) {
        return <Preloader />
    }
    return  <div>
                <h2 className={s.title}>Latest Activity</h2>
                <div className={s.latestElems}>
                    {props.actions.filter((a, index) => index<4).map((a,index)=> <Action action={a} index={index} /> )}
                    <button className={s.loadMore}  >Load More</button>
                </div>
            </div>
}
export default LatestActivity;