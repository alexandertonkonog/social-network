import React from 'react';
import s from './Form.module.css';
let FileInput = ({fun, img, width, required}) => {
	
	return  <div style={{width: width+'px'}} className={s.fileInput}>
				<div className={s.fileUpload}>
				    <label >
						<input 
							accept='.jpg, .png, .jpeg' 
							type="file" 
							name="file" 
							onChange={(e) => {fun(e.target.files[0])}} />
						<span>Choose image</span>
					</label>
				</div>
				{img && <div className={s.nameFile} >File: {img.name}</div>}
			</div>
	}
export default FileInput;