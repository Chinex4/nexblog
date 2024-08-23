<?php

namespace App\Http\Controllers;

use App\Models\Reply;
use App\Models\Comment;
use Illuminate\Http\Request;

class ReplyController extends Controller
{
    //
    public function store(Request $request, Comment $comment)
    {
        $validated = $request->validate([
            'bodyy' => 'required|string|max:1000',
        ]);

        $reply = new Reply();
        $reply->bodyy = $validated['bodyy'];
        $reply->user_id = $request->user()->id;
        $reply->comment_id = $comment->id;
        $reply->save();

        // dd($reply);

        // $request->user()->replies()->create([
        //     'body' => $validated['body'],
        //     'comment_id' => $comment->id,
        // ]);

        // dd($request);

        return redirect()->back()->with('message', 'Reply added successfully.');
    }
}
