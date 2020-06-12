import React from 'react';
import s from '../Feed.module.css';
import {Link} from 'react-router-dom';
let Features = (props) => {
    return  <div>
                <h2 className={s.title}>The Features</h2>
                <div className={s.features}>
                    {props.features.map((f,index) => {
                        return <div className={s.feature} key={'feature'+index}>
                                    <Link to={'/feature/'+f.id}><img className={s.featureImg} src={f.img} alt={f.name} /></Link>
                                    <Link className={s.featureTitle} to={'/feature/'+f.id}>{f.name}</Link>
                                </div>
                    })}
                </div>
            </div>
}
export default Features;