import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {postArticle} from '../../redux/articleReducer';
import Preloader from '../common/Preloader/Preloader';
import {connect} from 'react-redux';
import s from './Article.module.css';
import FileInput from '../common/Form/FileInput';
import Input from '../common/Form/Input';
import TextArea from '../common/Form/TextAreaSimple';
import Button from '../common/Elems/Button';
import Tag from '../common/Elems/Tag';
import logo from '../../images/article.png';
let CreateArticle = ({me, postArticle}) => {
    let [name, setName] = useState('');
    let [img, setImg] = useState(null);
    let [tagsField, setTagsField] = useState('');
    let [tags, setTags] = useState([]);
    let [text, setText] = useState('');
    let [info, setInfo] = useState(false);
    let createArticle = () => { 
        if (name && img && text) {
            let formData = new FormData();
            formData.append('file', img, img.name);
            formData.append('id', me);
            formData.append('name', name);
            formData.append('type', 'article');
            formData.append('tags', tags);
            formData.append('text', text);
            postArticle(formData);
            setInfo(true)
            setName('');
            setImg(null);
            setTagsField('');
            setText('');
            setTags([]);
        }
    }
    let addItem = (fun, item, arr, fun2) => {
        if(item) {fun([...arr, item])}
        fun2('');
    }
    let removeItem = (fun, item, arr) => {
        fun(arr.filter(elem => elem!==item));
    }
	return  <div className={s.articleWrapper+' '+s.createArticleWrapper}>
                <form onSubmit={(e)=> {e.preventDefault(); createArticle()}} >
    				<img className={s.titleImg} src={img ? URL.createObjectURL(img): logo} alt={'article image'} />
                    <FileInput img={img} fun={setImg} />
                    <div className={s.mainContent+' '+s.createMainContent}>
                        <div>
                            <Input fun={setName} required={true} placeholder="Article's name" value={name} />
                        </div>
                        <div className={s.tagsWrapper} >
                            <Input fun={setTagsField} placeholder="Article's tags" value={tagsField} />
                            {tagsField && <Button fun={()=>{addItem(setTags, tagsField, tags, setTagsField)}} font="12" pad="7" type="button" text="Add" />}
                            <div className={s.array}>
                                {tags.map( i => <section>
                                    <Tag link="#" text={i} />
                                    <button onClick={()=>{removeItem(setTags, tagsField, tags)}} type="button" className={s.icon}>×</button>
                                    </section> )}

                            </div>
                        </div>
                        <div className={s.textZone + ' '+ s.createTextZone}>
                            <TextArea fun={setText} placeholder="Text" value={text} />
                        </div>
                        <div>
                            <Button type="submit" text='Create' />
                        </div>
                        {info && <p className={s.info}>Article {name} has created</p>}
                    </div>
                </form>
            </div>	        
}
class CreateArticleContainer extends React.Component  {
    componentDidMount () {
        
    }
    render () {
  
        return <CreateArticle 
            me={this.props.me.id}
            postArticle={this.props.postArticle} />
    }
}
let mapStateToProps = (state) => ({
    me: state.meInfo.data
})

export default connect(mapStateToProps, {postArticle})(CreateArticleContainer);