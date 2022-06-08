<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Comment;
use App\Models\Response;
use App\Models\User;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $post = new Comment();
        $post->text = $request->text;
        $post->author_id = $request->author_id;
        $post->post_id = $request->post_id;
        if($post->save()){
            $successes['success'][] = "Comment was created successfully";
            return response()->json($successes);
        }
        else{
             $successes['success'][] = "Error during creating comment";
            return response()->json("Error");
        }

    }
    public function response_store(Request $request){
        // return response()->json($request);
        $comment_res = new Response();
        $comment_res->text = $request->text;
        $comment_res->author_id= $request->author_id;
        $comment_res->comment_id = $request->comment_id;


        if($comment_res->save()){
            return response()->json("Success");
        }
        else{
            return response()->json("Error");
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {       
        $comments = Comment::where("post_id",$id)->get();
        foreach ($comments as $comment) {
            $user = User::find($comment->author_id);
            $comment->author = $user->name;

            if($comment->responses){
                $comment->responses =  $comment->responses;
                foreach ($comment->responses as $response) {
                    $user = User::find($response->author_id);
                    // echo $user->name;
                    $response->author = $user->name;
                }
            }
        }

        return response()->json($comments);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
