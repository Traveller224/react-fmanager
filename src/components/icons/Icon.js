import React from "react";

export default (props) => (
	<svg className={`svg-icon`} style={{color:props.color}}>
	<use xlinkHref={`#${props.name}`}/></svg>
);
