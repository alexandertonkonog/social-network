import React, { useEffect } from 'react';
import s from './Footer.module.css';
import logo1 from '../../images/footer-image.png';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getArticles} from '../../redux/articleReducer';
import PreloaderText from '../common/Preloader/PreloaderText';
import Preloader from '../common/Preloader/Preloader';

let Footer = (props) => {
	return  <>
			<footer>
				<div className={s.footer} >
					<div className={s.fooCol} >
						<img src={logo1} alt={logo1} />
					</div>
					{props.isLogin ? <div className={s.fooCol} >
						<h4 className={s.colsName+' '+s.colGreen}>Recent Articles</h4>
						{props.haveArticles? <ul>
							{props.posts
								.filter(p => props.posts.length-p.id<5)
								.map((p, index) => <li key={'foot'+index}>
									<Link  to={'/article/'+p.id}>{p.name}</Link>
									</li>)}</ul> :
							<PreloaderText />					
						}
					</div> : null}
					{/*props.isLogin ? <div className={s.fooCol} >
						<h4 className={s.colsName+' '+s.colPink}>Categories</h4>
						<ul>
							<li><Link to="">Business</Link></li>
							<li><Link to="">Gaming</Link></li>
							<li><Link to="">Media</Link></li>
							<li><Link to="">Movies</Link></li>
							<li><Link to="">Technology</Link></li>
						</ul>
					</div> : null*/}
					
					<div className={s.fooCol} >
						<h4 className={s.colsName+' '+s.colblue}>About Us</h4>
						<p>Collaboratively orchestrate intermandated human capital with cross-platform infrastructures. Appropriately monetize innovative catalysts for change for front-end niches.</p>
					</div>
				</div>
				
			</footer>
			<div className={s.lowFooter} >
				<p>Copyright © 2020 <a href="https://vk.com/thegreatguy">Alexander Tonkonog</a>. All rights reserved.</p>
			</div>
		</>
}

let FooterContainer = (props)=>{
	useEffect(() => {
        props.getArticles();
    }, [props.haveArticles]);
    
	
	return <Footer posts={props.posts} haveArticles={props.haveArticles} isLogin={props.isLogin} />
}
let mapStateToProps = (state)=>({
	posts: state.articles.list,
	haveArticles: state.articles.haveArticles,
	isLogin: state.meInfo.isLogin,
})
export default connect(mapStateToProps, {getArticles})(FooterContainer);