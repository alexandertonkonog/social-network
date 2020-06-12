import React from 'react';
import s from '../Feed.module.css';
import {Link} from 'react-router-dom';
import Preloader from '../../common/Preloader/Preloader';
let LatestPost = (props) => {
    if (!props.haveArticles) {
        return <Preloader />
    }
    return  <div>
                <h2 className={s.title}>Latest Posts</h2>
                <div className={s.latestElems}>
                    {props.articles.map((a,index) => {
                        return <div className={s.latestPost} key={'lastPost'+index}>
                                    <Link to={'/article/'+a.id}><img className={s.lpImg} src={a.img} alt={a.name} /></Link>
                                    <div className={s.lpInfo}>
                                        <h3 className={s.titlePost}><Link to={'/article/'+a.id}>{a.name}</Link></h3>
                                        <p className={s.lowText}> {a.text.slice(0,190)}... <Link className={s.readMore} to={'/article/'+a.id}>»</Link></p>
                                    </div>
                                </div>
                    })}
                    
                    <button className={s.loadMore}>Load More</button>
                </div>
            </div>
}
export default LatestPost;