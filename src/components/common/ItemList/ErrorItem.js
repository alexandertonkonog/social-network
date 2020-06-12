import React from 'react';
import s from '../ItemList.module.css'; 
import { faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


let ErrorItem = (props) => {
	return <div>
				<FontAwesomeIcon className={s.errorSVG} icon={faExclamationTriangle} />
				<div className={s.error}>Error</div>
			</div>
}
export default ErrorItem;