import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher/Dispatcher';
import Constants from '../constants/Constants';

    const GET = "GET"
    const CHANGE = "CHANGE";
    const COMMENT_RESPONSE_CHANGE= "COMMENT_RESPONSE_CHANGE"
    const NW_CHANGER = "NW_CHANGER"

    var _comments = [];
    var _responses = [];
    var _comment_response = [];
    function setComments(comments){
       _comments = comments
    }

    function addNewComment(responses){
       _responses = responses
    }

    function addCommentResponse(response){
       _comment_response = response
    }


class CommentStore extends EventEmitter{

    constructor(){
        super();
        Dispatcher.register(this._registerToAction.bind(this));
    }

    _registerToAction(action){
        switch (action.actionType) {
              case Constants.GET_ALL_COMMENTS:
                setComments(action.payload);
                this.emit(GET)
                break;

              case Constants.ADD_NEW_COMMENT:
                addNewComment(action.payload)
                this.emit(CHANGE)
                this.emit(GET)
                break;

              case Constants.ADD_COMMENT_RESPONSE:
                addCommentResponse(action.payload)
                this.emit(COMMENT_RESPONSE_CHANGE)
                this.emit(NW_CHANGER)
                this.emit(GET)
                break;


            default:
                return true;
                break;
        }

        
    }

    getComments() {
        return _comments;
    }

    getResponses(){
        return _responses;
    }

    getCommentResponse(){
        return _comment_response;
    }
    
    addChangeListener(callback){
        this.on(GET,callback)
    }

    removeChangeListener(callback){
        this.removeListener(GET,callback)
    }

    addCommentAddListener(callback){
        this.on(CHANGE,callback)
    }

    addCommentResponseListener(callback){
        this.on(COMMENT_RESPONSE_CHANGE,callback)
    }

    addNwChanger(callback){
         this.on(NW_CHANGER,callback)
    }
    


}

export default new CommentStore();