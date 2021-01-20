import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";

import AddComment from './index/AddComment';
// import ShowComment from './index/ShowComment';


export default class Comment extends React.Component {

	constructor(props){
		super(props)

		this.state = {
		}
	}


	render(){
		return(
			<div>
				 <AddComment />
				{/*<ShowComment id={this.state.article_id}/>*/}
			</div>
		)	
	}


  
}


if(document.getElementById("user-add-comment")){
	ReactDOM.render(<Comment/>,document.getElementById("user-add-comment"));
}