import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import CommentStore from "../store/CommentStore";
import CommentActions from "../actions/CommentActions";
import CommentResponse from  "../index/CommentResponse";

class ShowComment extends Component {

    constructor(props) {
        super(props);
        this.state = {
        	comments:[],
        	article_id:0
        }

        this._onChange = this._onChange.bind(this)
    }

    _onChange(){
		this.setState({
	      comments: CommentStore.getComments()
	    });
	}

	UNSAFE_componentWillMount(){
		CommentStore.addChangeListener(this._onChange)


		var current_url = window.location.href;
		var arr = current_url.split("/")
		var len = arr.length -1
		var id = arr[len]
		this.setState({
			article_id:id
		})
	}

	componentDidMount(){
		CommentActions.getAllComments(this.state.article_id)
	}


	ComponentWillUnmount(){
			CommentStore.removeChangeListener(this._onChange)
	}


    render() {
        return (
        	<div className="all_comments">
	            <h1>Comments</h1>
	            	{this.state.comments?this.state.comments.map((item,index) =>(
	            		<div key={index} className="one_commment_div">
			        	 		<div key={index} className="one_commment">
			        	 			<div className="comment_header">
			        	 				<p>{item.author}</p>
			        	 				<span>{item.created_at}</span>
			        	 			</div>

			        	 			<div className="comment_body">
			        	 				<p>{item.text}</p>
			        	 			</div>

			        	 			<div className="comment_response">
			        	 				<CommentResponse comment_id={item.id} author_id={item.author_id} />
			        	 			</div>
			        	 		</div>
			        	 		{item.responses?item.responses.map((item2,index2) =>(
				        	 		<div key={index2} className="comment_responses">
				        	 			<div className="response_author">
				        	 				<p>{item2.author}</p>
				        	 				<span>{item2.created_at}</span>
				        	 			</div>
				        	 			<div className="response_body">
				        	 				<p>{item2.text}</p>
				        	 			</div>

				        	 		</div>
				        	 	)):null}
		        	 </div>
	        		)):"Нет комментариев"}

        	</div>
        );
    }
}

export default ShowComment;

if(document.getElementById("show-comment")){
	ReactDOM.render(<ShowComment/>,document.getElementById("show-comment"));
}