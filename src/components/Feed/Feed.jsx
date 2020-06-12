import React from 'react';
import Slider from './Slider/Slider';
import {connect} from 'react-redux';
import LatestActivity from './LatestActivity/LatestActivity';
import LatestPost from './LatestPost/LatestPost';
import Features from './Features/Features';
import Preloader from '../common/Preloader/Preloader';

let Feed = (props)=> {
    return  <>
                <Slider slider={props.slider} />
                <LatestActivity  actions={props.actions} haveActions={props.haveActions} />  
                <LatestPost articles={props.articles} haveArticles={props.haveArticles} />  
                {/*<Features features={props.features} /> */ }
                            
            </>
}

let mapStateToProps = (state) => ({
    slider: state.sliders.list,
    actions: state.actions.list,
    articles: state.articles.list,
    features: state.features.list,
    haveArticles: state.articles.haveArticles,
    haveActions: state.actions.haveActions,
})

let FeedContainer = (props)=>{
    if(!props.articles) return <Preloader />
    let actions = props.actions//.filter(a => a.id <= 7);
    let articles = props.articles.filter((a,index) => props.articles.length-index < 4 ).reverse();

    return <Feed  haveArticles={props.haveArticles} haveActions={props.haveActions} slider={props.slider} features={props.features} articles={articles} actions={actions}  />
}
export default connect(mapStateToProps, {})(FeedContainer);
