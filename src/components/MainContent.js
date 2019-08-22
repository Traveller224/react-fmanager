import React, {Fragment, useEffect, useState } from "react"
import axios from "axios"
import gId from "./gFunc"
import "./dataTables.css"
import Modal from "./Modal"
import useFileState from "./useFileState"
import useModalState from "./useModalState"
import UploadForm from "./form/UploadForm"
import MsgBox from "./msgbox/MsgBox"

function MainContent(props){
	//const [filelist, setData] = useState([])
	const { filelist, setData, addFiles, toggleSelect, fileRemove, msg, setMsg} = useFileState([]);
	const { dialoglist, addDialog, toggleDialog, removeDialog} = useModalState({id:{},opts:[]});
	const url = 'http://react-fmanager/public/server/'
	const [actRow, setActRow] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			//props.vLoader(true);
			fadeIn(gId("preloader"))
			const res = await axios(url+'filelist.php');
			setData(res.data);
			//props.vLoader(false);
			fadeOut(gId("preloader"))
		}
		fetchData()
	}, [setData])

	const TableCol = ["name", "size", "lastmod"]
	const vTbody = filelist.map((file, i) =>
		<tr key={i} onClick={e => rowAction(e, i)} className={file.isSelect ? 'actRow': null} >
			{TableCol.map((el, i) =>
			<td key={i}>{file[el]}</td>
		  )}
			<td hidden={!file.isSelect} className="bts"><div className="btn-group">
				<button type="button" onClick={()=>{ fileRemove(url+'filelist.php', actRow, setActRow, removeDialog) }}>
					<span>&times;</span>
				</button>
			</div></td>
		</tr>
	)

	function fadeIn(el){
		el.style.display = 'block';
		el.animate([{opacity:0},{opacity:1}],{duration:300,fill:'forwards'});
	}
	function fadeOut(el){
		let anim=el.animate([{opacity:1},{opacity:0}],{duration:400,fill:'forwards'});
		anim.onfinish = function(e){
			el.style.display = 'none'
			anim.cancel();
		}
	}

	function rowAction(e, i){
		let row=(i+1);
		setActRow(row);
		if(actRow && actRow!==row){
			if(filelist[actRow-1].isSelect){
				toggleSelect(actRow-1)
				toggleDialog(actRow)
			}
		}
		toggleSelect(row-1)
		toggleDialog(row)
		if(!dialoglist.id[row]){
			fetch("/data/"+filelist[row-1].name).then(function(response){
		if(response.headers){
			let contentType = response.headers.get('Content-Type');
			if(!contentType.includes('image')){
				return response.text();
			}
			if(contentType.includes('image')){
				return response.blob();
			}
		}
		})
		.then(function(data){
			if(data instanceof Blob){
				let objectURL = URL.createObjectURL(data);
				addDialog(row, null, objectURL)
			}
			else{
				addDialog(row, data)
			}
		})
		.catch(function(error){console.log(error);});
		}
	}
	const modalItems = dialoglist.opts.map((el, i) => <Modal key={i} el={el} toggleDialog={toggleDialog} toggleSelect={toggleSelect}/>);

	return (
		<Fragment>
		{modalItems}
		<div className="file-list">
			<div className="dataTable-wrapper">
				<table className="dataTable-table" id="table">
					<thead>
						<tr>
							<th style={{width:"40%"}} data-name="name">Имя файла</th>
							<th style={{width:"15%"}} data-name="size">Размер</th>
							<th style={{width:"30%"}} data-name="lastmod">Дата модификации</th>
							<th style={{width:"5%"}}></th>
						</tr>
					</thead>
					<tbody>{vTbody}</tbody>
				</table>
				<UploadForm url={url} addFiles={addFiles}/>
				<MsgBox msg={msg} setMsg={setMsg}/>
			</div>
		</div>
		</Fragment>
	)
}

export default MainContent
