<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;


    public function getCreatedAtAttribute($value)
    {
    	 return date('m/d/Y H:i', strtotime($value));
    }

    public function user(){
    	return $this->belongsTo(User::class);
    }

    public function responses(){
    	return $this->hasMany(Response::class);
    }
}
