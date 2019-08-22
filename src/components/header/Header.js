import React from "react"
import "./Header.css"
import Icon from "../icons/Icon"

function Header(props){
	return (
		<header>FileManager
			<div id="preloader" hidden={!props.vLoader}><Icon name="svgloader"/></div>
		</header>
	)
}

export default Header
