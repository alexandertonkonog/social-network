export let mainSearch = (text, list) => {
	let str = new RegExp(text.trim(), "i");
	let arr = list.filter(u => str.test(u.name) ? true : false)
	return arr;
}
export let chooseTags = list => {
	let newArr=[];
	if (list) {
		list.forEach(item => {
			item.tag.forEach( tag => {
				if(!newArr.includes(tag)) newArr.push(tag);
			})
			
		})
		return newArr;
	}
	return null;
}