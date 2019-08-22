import React from 'react';

const Modal = ({ el, toggleDialog, toggleSelect }) => {
	return (
		<div className="modal md-effect-1" hidden={!el.isOpen}>
			<div className="mclose" onClick={() => {toggleDialog(el.id); toggleSelect(el.id-1)}}></div>
			<div style={{maxHeight:"700px", overflowY:"auto"}}>{el.text}</div>
			<img style={{width:"380px"}} src={el.src} alt=""/>
		</div>
	);
}

export default Modal
