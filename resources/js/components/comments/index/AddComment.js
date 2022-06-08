import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import CommentStore from "../store/CommentStore";
import CommentActions from "../actions/CommentActions";

class AddComment extends Component {

    constructor(props) {
        super(props);

        this.state ={
        	comment_text:"",
        	create_comment_err_status:false,
        	create_comment_suc_status:false,
        	create_comment_response_status:false,
        }
       
        this._onResponseGet = this._onResponseGet.bind(this)
        this._onCommentResponseGet= this._onCommentResponseGet.bind(this)
     
    }



    _onResponseGet(){
	    var responses =  CommentStore.getResponses()
	    console.log(responses);

	    if(responses.errors){
	    	console.log('errors')
   			this.setState({
   				comment_create_error:responses.errors,
   				create_comment_err_status:true,
   				comment_text:"",
   			})

	   		setTimeout(() => {
	   			this.setState({
   					comment_create_error:"",
   					create_comment_err_status:false
   				})
	   		},3000);
   		}
   		if(responses.success){
   			console.log('success')
   			CommentActions.getAllComments(this.state.article_id)
   			this.setState({
   				comment_create_success:responses.success,
   				create_comment_suc_status:true,
   				comment_text:"",
   			})

	   		setTimeout(() => {
	   			this.setState({
   					comment_create_success:"",
   					create_comment_suc_status:false
   				})
	   		},3000);
   		}
	}

	_onCommentResponseGet(){
		var responses =  CommentStore.getCommentResponse()
	 	CommentActions.getAllComments(this.state.article_id)

   			this.setState({
   				comment_response_resp:responses,
   				create_comment_response_status:true,
   			})
	   		setTimeout(() => {
	   			this.setState({
   					comment_response_resp:"",
   					create_comment_response_status:false
   				})
	   		},3000);

	}


	_submitForm(event){
	   	event.preventDefault();

	   	var author_id=document.getElementById("user_email").value;  
	   	
	   	const formdata = new FormData()
	   	formdata.append("text",this.state.comment_text)
	   	formdata.append("post_id",this.state.article_id)
	   	formdata.append("author_id",author_id)


	   	CommentActions.AddComment(formdata)
	}

	UNSAFE_componentWillMount(){
		CommentStore.addCommentAddListener(this._onResponseGet)
		CommentStore.addCommentResponseListener(this._onCommentResponseGet)

		var current_url = window.location.href;
		var arr = current_url.split("/")
		var len = arr.length -1
		var id = arr[len]
		this.setState({
			article_id:id
		})
	}




    render() {
        return (
        	<div className="form_add_comment">

        		{this.state.create_comment_response_status?
		        	<div className={`comment_errors ${this.state.create_comment_response_status?"show block":"hide_block"}` }>
		        		<li>{this.state.comment_response_resp}</li>
		        	</div>
	        	:null}


	        	{this.state.create_comment_err_status?
		        	<div className={` ${this.state.comment_create_error?"hide_block":"show_block comment_errors"}` }>
		        		{this.state.comment_create_error?this.state.comment_create_error.map((error,index) =>(
		        			<li key={index}>{error}</li>
		        		)):"new erroroe"}
		        	</div>
	        	:null}

	        	{this.state.create_comment_suc_status?
		        	<div className={`${this.comment_create_success?"hide_block":"show_block comment_successes"}`}>
		        		{this.state.comment_create_success?this.state.comment_create_success.map((suc,index) =>(
							<li key={index}>{suc}</li>
		        		)):"net succeses"}
		        	</div>
	        	:null}



	        	<form onSubmit={this._submitForm.bind(this)} id="form_for_comment">
	        		<textarea type="text" required="required" value={this.state.comment_text}  name="comment_text" 
	        		placeholder="Enter comment" onChange={(e) =>this.setState({comment_text:e.target.value})}/>
	        		<button type="submit">Add Comment</button>
	       		</form>
        
       		 </div>


        );
    }
}

export default AddComment;
