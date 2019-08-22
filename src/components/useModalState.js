import { useState } from 'react';

export default initialValue => {
const [dialoglist, setDialog] = useState(initialValue)
return {
	dialoglist,
	addDialog: (id, text, src) => {
		let newId = Object.assign({}, dialoglist.id, {[id]:id})
		let newItem = {id: id, text:text, src:src, isOpen:true};
		setDialog( Object.assign({}, {id:newId}, {opts:[...dialoglist.opts, newItem]}) );
	},
	toggleDialog: (id) => {
		const updDialogs = dialoglist.opts.map(item => {
			if (item.id === id) {
				item.isOpen=!item.isOpen
			}
			return item
		});
		setDialog( Object.assign({}, {id:dialoglist.id}, {opts:updDialogs}) );
	},
	removeDialog: () => {
		setDialog({id:{},opts:[]})
	}
}
}
