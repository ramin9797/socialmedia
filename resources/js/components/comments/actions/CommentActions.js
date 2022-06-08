import Dispatcher from '../dispatcher/Dispatcher';
import Constants from '../constants/Constants';
import axios from 'axios';


class CommentActions{


	getAllComments(article_id){
		axios.get('/api/comment/show/'+article_id).then(response => {
			Dispatcher.dispatch({
				actionType:Constants.GET_ALL_COMMENTS,
				payload:response.data
			})
		}).catch(error => {
			console.log(error)
		})
	}

	AddComment(formdata){
		axios.post("/api/comment/store",formdata,{
			headers: {
     		   'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
   			 }
		}).then(response => {
			Dispatcher.dispatch({
				actionType:Constants.ADD_NEW_COMMENT,
				payload:response.data
			})
		}).catch(error => {
			console.log(error)
		})
	}

	AddCommentResponse(formdata){
		axios.post("/api/comment/response",formdata,{
			headers: {
     		   'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
   			 }
		}).then(response => {
			Dispatcher.dispatch({
				actionType:Constants.ADD_COMMENT_RESPONSE,
				payload:response.data
			})
		}).catch(error => {
			console.log(error)
		})
	}

	

}

export default new CommentActions();