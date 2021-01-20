<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableResponses extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('responses', function (Blueprint $table) {
            $table->id();
            $table->string("text");
            $table->bigInteger("author_id")->unsigned();
            $table->foreign("author_id")->references("id")->on("users")->onDelete("cascade")->onUpdate("cascade");

            $table->bigInteger("comment_id")->unsigned();
            $table->foreign("comment_id")->references("id")->on("comments")->onDelete("restrict")->onUpdate("cascade");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('comment_responses');
    }
}
