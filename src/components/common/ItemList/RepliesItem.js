import React from 'react';
import s from '../ItemList.module.css'; 
import {Link} from 'react-router-dom'; 
import Preloader from '../Preloader/Preloader';

let RepliesItem = (props) => {
	if (!props.haveActions) {
        return <Preloader />
    }
	
	return 	<div>

				<span to={'/'+props.name} className={s.itemTitle}>{props.name}</span>
				<hr />
				<div className={s.itemArticles}>
					{props.articles.map((p,index) => {
						if(index<4) return <div className={s.itemArticle} key={p.user.id+'text'}>
							<p className={s.mainAP}>
								<Link to={'/user/'+p.user.id} className={s.articleLink}>{p.postText.length>70 ? p.postText.slice(0,70)+'...' : p.postText}</Link>
							</p>
							<p className={s.secondAP}>{p.date}</p>
						</div> 
					})}
				</div>

			</div>
}
export default RepliesItem;