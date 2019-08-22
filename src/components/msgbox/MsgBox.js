import React, { useRef } from 'react';
import "./MsgBox.css"

export default ({ msg, setMsg }) => {
	const msgRef = useRef();
	let msgBoxanim;
	if(msg.class){
		let el=msgRef.current
		msgBoxanim && msgBoxanim.cancel();
		msgBoxanim = el.animate([{opacity:1},{opacity:0}],{delay:3000,duration:1000,fill:'forwards'});
		msgBoxanim.onfinish = function(e){
			msgBoxanim.cancel();
			setMsg({hidden:true})
		}
	}
	return (
		<div hidden={msg.hidden} id='msgBox' className='msgBox' ref={msgRef}>
			<div className={msg.class}>{msg.text}</div>
		</div>
	)
}
