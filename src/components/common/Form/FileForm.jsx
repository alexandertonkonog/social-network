import React, {useState} from 'react';
import s from './Form.module.css';
import FileInput from './FileInput';
import Button from '../Elems/Button';

let FileForm = (props) => {
	let [img, setImg] = useState(null);
	let sendImg = () => {
		let formData = new FormData();
		formData.append('file', img, img.name);
		formData.append('id', props.me);
		formData.append('type', 'img');
		props.changeAvatar(formData);
		props.setActiveModal(false);
		setImg(null);
		props.setStatus(true);
	}
	return  <form className={s.formFile}>
				<div className={s.fileForm}> 
					<FileInput fun={setImg} img={img} />
					<Button fun={sendImg} disabled={img===null} name="blue" pad="7" type="button" text="Add" />
				</div>
			</form>
}
export default FileForm;