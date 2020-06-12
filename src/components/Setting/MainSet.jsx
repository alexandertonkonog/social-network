import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import s from './Setting.module.css';
import Input from '../common/Form/Input';
import Button from '../common/Elems/Button';
import Tag from '../common/Elems/Tag';


let MainSet = (props) => {
	let [languageArr, setLanguageArr] = useState(props.user.data.language);
	let [name, setName] = useState(props.user.name);//
	let [city, setCity] = useState(props.user.data.city);//
	let [birthday, setBirthday] = useState(props.user.data.birthday);//
	let [sex, setSex] = useState(props.user.data.sex);
	let [language, setLanguage] = useState('');
	let [familyArr, setFamilyArr] = useState(props.user.data.family);
	let [education, setEducation] = useState('');
	let [educationArr, setEducationArr] = useState(props.user.data.education);
	let [listStatus, setListStatus] = useState(0);
	let [info, setInfo] = useState(0);
	useEffect(()=>{
		setSex(props.user.data.sex);
		setLanguageArr(props.user.data.language);
		setFamilyArr(props.user.data.family);
		setEducationArr(props.user.data.education);
		setName(props.user.name);
		setBirthday(props.user.data.birthday);
		setCity(props.user.data.city);
	}, [props.user])
	let addItem = (fun, item, arr) => {
		if(item) fun([...arr, item])
	}
	let removeItem = (fun, item, arr) => {
		fun(arr.filter(elem => elem!==item));
	}
	let changeListStatus = () => {
		listStatus===0 ? setListStatus(1) : setListStatus(0)
	}
	let addFamilyMember = (id) => {
		setFamilyArr([...familyArr, id]);
		setListStatus(0);
	}
	let sendSetting = () => {
		let data = {
			id: props.user.id,
			type: 'setting',
			name: name,
			data: {
				city: city,
				birthday: birthday,
				sex: sex,
				language: languageArr,
				family: familyArr,
				education: educationArr
			}
		}
		props.sendSetting(data);
		setInfo(1);
	}
	let friendsNotMembers = props.users.filter(u => familyArr.every(num => num!== u.id))  
	if (!props.user) return <p>null</p>;
	return <form className={s.dataFormWrapper}>
				<div className={s.dataForm}>
					<table className={s.table}>
						<tbody>
							<tr className={s.inputPlace} >
								<td className={s.inputLabel}>Name:</td>
								<td>
									<div className={s.inputField}>
										<Input placeholder="name" required onChange={setName} value={name} name={'name'} />
									</div>
								</td>
							</tr>
							<tr className={s.inputPlace} >
								<td className={s.inputLabel}>Language:</td>
								<td>
									<div className={s.inputField}>
										<Input placeholder="language" fun={setLanguage} value={language} name={'language'} />
										{language && <Button fun={()=>{addItem(setLanguageArr, language, languageArr); setLanguage('') }} font="12" pad="7" type="button" text="Add" />}
									</div>
									<div className={s.array}>
										{languageArr.map( i => <div>
											<Tag link="#" text={i} />
											<button onClick={()=>removeItem(setLanguageArr, i, languageArr)} type="button" className={s.icon}>×</button>
											</div> )}

									</div>
								</td>
							</tr>
							<tr className={s.inputPlace} >
								<td className={s.inputLabel}>Family:</td>
								<td><div className={s.inputField}>
										<ul name="family" className={listStatus===1 ? s.select+' '+s.active : s.select} >
											<li onClick={changeListStatus} className={s.titleSelect}><span>{listStatus===0 && 'family'}</span><span>&#9660;</span></li>
											{friendsNotMembers.map(u => <li onClick={()=>{addFamilyMember(u.id)}} className={s.userSelect}>{u.name}</li>)}
										</ul>
									</div>
									<div className={s.array}>
										{props.users.filter(u => familyArr.some(num => u.id === num)).map( i => <div>
												<Tag link="#" text={i.name} />
												<button type="button" onClick={()=>removeItem(setFamilyArr, i.id, familyArr)} className={s.icon}>×</button>
											</div> )}
									</div>
								</td>
							</tr>
							<tr className={s.inputPlace} >
								<td className={s.inputLabel}>Birthday:</td>
								<td>
									<div className={s.inputField}>
										<Input placeholder="birthday" fun={setBirthday} value={birthday} name={'birthday'} />
									</div>
								</td>
							</tr>
							<tr className={s.inputPlace} >
								<td className={s.inputLabel}>City:</td>
								<td>
									<div className={s.inputField}>
										<Input placeholder="city" fun={setCity} value={city} name={'city'} />
									</div>
								</td>
							</tr>
							<tr className={s.inputPlace} >
								<td className={s.inputLabel}>Education:</td>
								<td>
									<div className={s.inputField}>
										<Input placeholder="education" fun={setEducation} value={education} name={'education'} />
										{education && <Button fun={()=>{addItem(setEducationArr, education, educationArr); setEducation('')}} font="12" pad="7" type="button" text="Add" />}
									</div>
									<div className={s.array}>
										{educationArr.map( i => <div>
												<Tag link="#" text={i} />
												<button type="button" onClick={()=>removeItem(setEducationArr, i, educationArr)} className={s.icon}>×</button>
											</div> )}
									</div>
								</td>
							</tr>
							<tr className={s.inputPlace} >
								<td className={s.inputLabel}>Sex:</td>
								<td>
									<div className={s.array}>
										<div><Tag link="#" text={'male'} name={sex==='male' && 'blue'} fun={()=>setSex('male')} /> </div>
										<div><Tag fun={()=>setSex('female')} link="#" name={sex==='female' && 'blue'} text={'female'} /></div>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
					{!name && <p className={s.error}>Field "Name" is required</p>}
					{info === 1 && <p className={s.info}>Settings have changed</p>}
					<Button fun={sendSetting} name="blue" type="button" text="Save" />
				</div>
			</form>
} 

export default MainSet;