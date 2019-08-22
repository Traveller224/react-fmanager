import React, { useState } from 'react';
import "./UploadForm.css"

const UploadForm = ({ url, addFiles }) => {
	const [files, setFiles] = useState([]);

	function onChange(e){ setFiles(e.target.files) }
	function upfile(e){
		e.preventDefault();
	let	formData = new FormData(),
		newfiles=[];
	for(let i=0; i<files.length; i++){
		formData.append(i, files[i]);
		let newobj={};
		newobj.name=files[i].name;
		newobj.size=fSize(files[i].size);
		newobj.lastmod=timeConverter(files[i].lastModified);
		newfiles.push(newobj);
	}
	formData.append('file', files)
	fetch(url+'uploadfile.php', {
		method: 'POST',
		body: formData
	})
		.then(data => data.json())
		.then(res => {
			if(res.add){addFiles(newfiles)}
		})
		.catch(() => {})
	}
function fSize(bytes) {
	let sizes = ['Б','КБ','МБ','ГБ','ТБ'];
	if (bytes === 0) return '0 Б';
	let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
	return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

function timeConverter(timestamp){
	let a = new Date(timestamp),
		year = a.getFullYear(),
		month = ('0'+(a.getMonth()+1)).slice(-2),
		date = ('0'+a.getDate()).slice(-2),
		hour = a.getHours(),
		min = a.getMinutes(),
		sec = a.getSeconds(),
		time =  hour + ':' + min + ':' + sec + ' ' + date + '-' + month + '-' + year + ' ';
	return time;
}
	return (
		<form method="post" id="upform" onSubmit={(e)=>upfile(e)} encType="multipart/form-data">
			<input type='file' name='file[]' className='file-drop' id='filedrop' multiple required onChange={onChange}/>
			<input type="submit" value='Добавить'/>
		</form>
	)
}

export default UploadForm;
