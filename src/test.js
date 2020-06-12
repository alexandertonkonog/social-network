const Users = (props)=> {
	let statement = [
		{id: 1, img: '_rvhkpsWXLU.jpg', sex: true, followed: false, name: 'Александр Тонконог', status: 'I am charge', location: {city: 'Краснодар', country: 'Россия'}},
		{id: 2, img: 'iljF9y0ftGE1.jpg', sex: true, followed: true, name: 'Александр Лопарев', status: 'I am лох', location: {city: 'Краснодар', country: 'Россия'}},
		{id: 3, img: 'а.jpg', sex: true, followed: true, name: 'Виктор Жихарь', status: 'I am гей', location: {city: 'Ильский', country: 'Россия'}},
		{id: 4, img: 'в.jpg', sex: false, followed: true, name: 'Алина Бубликова', status: 'I am тлен', location: {city: 'Краснодар', country: 'Россия'}},
	];
	if (props.state.users.length === 0) {
		axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
			response.data.items.forEach( function(item) {
				statement.push(item)
			});
		props.addUsers(statement);		
	})}
			
	
	let usersItems = props.state.users.map( u => 
		<div className={s.userItem} >
			<img src={
				u.img?
				require('../../images/'+u.img):
				require('../../images/swap.jpg')
			} alt={u.name} className={s.userImg} />
			<div className={s.userDes}>
				<NavLink className={s.userName} to={'/users/'+u.id} >{u.name}</NavLink>
				<p>{u.location ? u.location.city : 'Город'}, {u.location ? u.location.country : 'Страна'}</p>
				<p>{u.status ? u.status : 'I am in the it Protection'}</p>
			</div>
			<div className={s.buttonArea}>
				{u.followed ? 
					<button className={s.button} key={u.id} onClick={()=>{props.changeFollow(u.id)}}>Unfollow</button> : 
					<button className={s.activeButton} key={u.id} onClick={()=>{props.changeFollow(u.id)}}>Follow</button>
				}
			</div>
		</div>
	);
	return(
		<div className={s.usersWrapper}>
			{usersItems}
    	</div>
	)
};*/div

u.img?
						require('../../images/'+u.img):
						require('../../images/swap.jpg')