import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {commentArticle, getArticle} from '../../redux/articleReducer';
import Preloader from '../common/Preloader/Preloader';
import {connect} from 'react-redux';
import {compose} from 'redux';
import s from './Article.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendar, faFile, faComment} from '@fortawesome/free-solid-svg-icons';
import DialogForm from '../common/Form/DialogForm';

let Article = ({article, me, commentArticle}) => {
    let postComment = (values) => {
        let obj = {
            articleId: article.id,
            myId: me,
            text: values.message
        }
        commentArticle(obj);
    }
	return  <div className={s.articleWrapper}>
				<img className={s.titleImg} src={article.img} alt="" />
                <div className={s.mainContent}>
                    <h1 className={s.titlePost}>{article.name}</h1>
                    <div className={s.iconZone}>
                        <div>
                            <FontAwesomeIcon className={s.iconFont} icon={faUser} /> 
                            <Link to={'/user/'+article.autor.id}>{article.autor.name}</Link>
                        </div>
                        <div>
                            <FontAwesomeIcon className={s.iconFont} icon={faCalendar} />{article.date}
                        </div>
                        <div>
                            <FontAwesomeIcon className={s.iconFont} icon={faFile} />{article.tag.map(cat => <Link className={s.catLink}>{cat}</Link>)}
                        </div>
                        <div>
                            <FontAwesomeIcon className={s.iconFont} icon={faComment} />0
                        </div>
                    </div>
                    <div className={s.textZone}>
                        <p>{article.text}</p>
                    </div>
                    <div className={s.autorZone}>
                        <img className={s.commentImg} src={article.autor.img} alt={article.autor.name}/>
                        <div>
                            <p className={s.autorName}>By <Link to={'/user/'+article.autor.id}>{article.autor.name}</Link></p>
                            <p className={s.autorDes}>Credibly create state of the art experiences rather than long-term high-impact applications. Interactively matrix inexpensive web services rather.</p>
                        </div>
                    </div>
                </div>
                <DialogForm onSubmit={postComment} />
                <div className={s.commentsWrapper}>
                    <h3 className={s.titleComments}>Comments:</h3>
                    <div className={s.commentsList}>
                        {article.comments.length === 0 ? <p className={s.not}>There are no comments</p> : article.comments.map((c, index) => <div className={s.comment} key={'comment'+index}>
                            <Link to={'/user/'+c.autor.id}><img className={s.commentImg} src={c.autor.img} alt={c.autor.name} /></Link>
                            <div className={s.commentDes}>
                                <div className={s.commentTop}>
                                    <Link className={s.commentName} to={'/user/'+c.autor.id}><span>{c.autor.name}</span></Link>
                                    <span className={s.commentTime}>{c.date+' '+c.time}</span>
                                </div>
                                <p className={s.commentText}>{c.text}</p>
                            </div>
                        </div>)}
                    </div>
                </div>
            </div>	        
}
class ArticleContainer extends React.Component  {
    componentDidMount () {
        this.props.getArticle(this.props.match.params.id)
    }
    render () {
        if(!this.props.article) return <Preloader />
        return <Article 
            article={this.props.article}
            me={this.props.me}
            commentArticle={this.props.commentArticle} />
    }
}
let mapStateToProps = (state) => ({
    article: state.articles.article,
    me: state.meInfo.id
})

export default compose(withRouter,connect(mapStateToProps, {commentArticle, getArticle}))(ArticleContainer);