@extends("layouts/layout1")
@section('content')

<article>
	<div class="article">
		<div class="article-title">
			{{$post->title}}
		</div>

		<div class="article-text">
			{{$post->text}}
		</div>

		<!-- <div class="article-comments">
			<p>Comments</p>
			<div id="comments"></div>
		</div> -->



		<div class="article-comments">	 	 	 
			@guest
			 <a class="nav-link" href="{{ route('login') }}">{{ __('Login') }}</a>
			@else
			<div id="user-add-comment"></div> 	 
			<input type="hidden" id="user_email"  value="{{ Auth::user()->id }}">
			@endguest

		 	 <div id="show-comment"></div>
	 	</div>
	</div>
</article>

@endsection