@extends("layouts/layout1")

@section('content')


<div class="posts">
	@foreach($posts as $post)
	<a href="{{route('post',$post->id)}}">
		<div class="post">
			<div class="post-image">
				<img src="{{ url('storage/images/'.$post->image) }}" alt="image" title="image" />
			</div>
			<div class="post-title">
				<p>{{$post->title}}</p>
			</div>

			<div class="post-desc">
				<p>{{$post->desc}}</p>
			</div>
		</div>
	</a>
	@endforeach
</div>
@endsection