<?php

namespace Database\Factories;

use App\Models\Post;
use Illuminate\Database\Eloquent\Factories\Factory;

class PostFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Post::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            //
        'title'=> $this->faker->sentence(5),
        'desc'=>$this->faker->text(300),
        'text'=> $this->faker->text(15000),
        'image'=> $this->faker->image('public/storage/images',400,300,null,false),
        ];
    }
}
