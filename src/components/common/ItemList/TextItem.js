import React from 'react';
import s from '../ItemList.module.css'; 
import {Link} from 'react-router-dom'; 
import Preloader from '../Preloader/Preloader';
import Tag from '../Elems/Tag';
let TextItem = (props) => {
	if (!props.haveArticles) {
        return <Preloader />
    }
	
	return 	<div>
				<Link to={'/search/articles'} className={s.itemTitle}>{props.name}</Link>
				<hr />
				<div className={s.itemTags}>
					{props.tags.map((t,num) => <Tag link={'/search/articles?'+t} text={t} />)}
				</div>
				<div className={s.itemArticles}>
					{props.posts.map((p,index) => {
						if(index<4) return <div className={s.itemArticle} key={p.id+'text'}>
							<p className={s.mainAP}><Link to={'/article/'+p.id} className={s.articleLink}>{p.name}</Link> {p.autor ? 'by' : null} {p.autor ? <Link to={'/user/'+p.autor.id} className={s.articleLink}>{p.autor.name}</Link>: null} </p>
							<p className={s.secondAP}>{p.date}</p>
						</div> 
					})}
				</div>

			</div>
}
export default TextItem;