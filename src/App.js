import React, { useState }  from "react"
import "./App.css"

import Sprite from "./components/icons/sprite"
import Header from "./components/header/Header"
import MainContent from "./components/MainContent"
import Footer from "./components/footer/Footer"

function App(){
	const [isLoading, setIsLoading] = useState(false);
	const vLoader = (v) => {setIsLoading(v)}
	return (
		<div className="page-wrap">
			<Sprite/>
			<Header vLoader={isLoading}/>
			<MainContent vLoader={vLoader}/>
			<Footer />
		</div>
	)
}

export default App
