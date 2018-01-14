// Searchbar Handler
$(function(){
	var searchField = $('#query');
	var icon = $('#search-btn');
	
	// Focus Event Handler
	$(searchField).on('focus', function(){
		$(this).animate({
			width:'100%'
		},400);
		$(icon).animate({
			right: '10px'
		}, 400);
	});
	
	// Blur Event Handler
	$(searchField).on('blur', function(){
		if(searchField.val() == ''){
			$(searchField).animate({
				width:'45%'
			},400, function(){});
			$(icon).animate({
				right:'360px'
			},400, function(){});
		}
    });
    
    $('#search-form').submit(function(e){
		e.preventDefault();
	});
      
})

function search () {
    $('#results').html('');
    $('#button').html('');

    q = $('#query').val();

    $.get (

        "https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet, id',
            q: q,
            type: 'video',
            key: 'AIzaSyBK0fYb4GuMAcO5qZRyTiQCP66Wvrd_3i0'},

        function (data) {
            var nextPageToken = data.nextPageToken;
            var previousPageToken = data.previousPageToken;

            console.log(data);

            $.each(data, function () {
                //get results
                var output = getOutput(item);
                
                //dislay results
                $('#results').append(output);
            });
    
        }
    )
}

//build output

function getOutput( item) {
    var videoId = item.id.videoId;
    var title = item.snippet.title;
    var description = item.snippet.description;
    var thumb = item.snippet.thumbnails.high.url;
    var channelTitle = item.snippet.channelTitle;
    var videoDate = item.snippet.publishedAt;

    //build output string

    var output = '<li>' + 
    '<div class="list-left">' +
    '<img src="'+thumb+'">' +
    '</div>' +
    '<div class="list-right">'+
    '<h3>'+title+'</h3>'
    '<small>By <span class="cTitle"> '+channelTitle+' </span> on '+videoDate+'</small>' +
    '<p>'+description+'</p>' + 
    '</div>' +
    '</li>' +
    '<div class="clearfix"> </div>' +
    '';

    return output;


}


