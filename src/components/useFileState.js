import { useState } from 'react';
import axios from "axios"

export default initialValue => {
const [filelist, setData] = useState(initialValue)
const [msg, setMsg] = useState({})
return {
	filelist,
	setData,
	addFiles: files => {
		const newFilelist = Array.from(new Set([...filelist,...files]));
		setData(newFilelist)
	},
	toggleSelect: actRow => {
		filelist[actRow].isSelect=!filelist[actRow].isSelect
		setData(filelist)
	},
	fileRemove: (url, actRow, fn, rd) => {
		if(window.confirm('Файл будет удален!')){
			let formData = new FormData();
			formData.append("delFile", filelist[actRow-1].name);
			axios.post(url, formData, {headers: {'Content-Type':'multipart/form-data'}}).then(res => {
				if(res.data.del){
					filelist.splice(actRow-1,1)
					setData([...filelist]);
					let newMsg={hidden:false, text:res.data.msg}
					if(res.data.err==="1"){ newMsg.class="error" }
					if(res.data.err==="0"){ newMsg.class="success" }
					if(res.data.err==="-1"){ newMsg.class="warning" }
					setMsg(newMsg);
					fn(false); rd()
				}
			})
		}
	},
	msg,
	setMsg
}
}
