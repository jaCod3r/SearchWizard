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
    $('#buttons').html('');

    q = $('#query').val();

    $.get (
        "https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet, id',
            q: q,
            type: 'video',
            key: 'AIzaSyBK0fYb4GuMAcO5qZRyTiQCP66Wvrd_3i0'},

        function (data) {
            var nextPageToken = data.nextPageToken;
            var prevPageToken = data.prevPageToken;

            console.log(data);

            $.each(data.items, function (i, item) {
                //get results
                var output = getOutput(item);
                
                //dislay results
                $('#results').append(output);
            });

            var buttons = getButtons(prevPageToken, nextPageToken);

				// Display Buttons
			$('#buttons').append(buttons);
            
        
        }
    );
}

function nextPage () {
    var token = $('#next-button').data('token');
    var query = $('#next-button').data('query');


    $('#results').html('');
    $('#buttons').html('');

    q = $('#query').val();

    $.get (
        "https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet, id',
            q: q,
            pageToken: token,
            type: 'video',
            key: 'AIzaSyBK0fYb4GuMAcO5qZRyTiQCP66Wvrd_3i0'},

        function (data) {
            var nextPageToken = data.nextPageToken;
            var prevPageToken = data.prevPageToken;

            console.log(data);

            $.each(data.items, function (i, item) {
                //get results
                var output = getOutput(item);
                
                //dislay results
                $('#results').append(output);
            });

            var buttons = getButtons(prevPageToken, nextPageToken);

				// Display Buttons
			$('#buttons').append(buttons);
            
        
        }
    );
}

function prevPage () {
    var token = $('#prev-button').data('token');
    var query = $('#prev-button').data('query');


    $('#results').html('');
    $('#buttons').html('');

    q = $('#query').val();

    $.get (
        "https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet, id',
            q: q,
            pageToken: token,
            type: 'video',
            key: 'AIzaSyBK0fYb4GuMAcO5qZRyTiQCP66Wvrd_3i0'},

        function (data) {
            var nextPageToken = data.nextPageToken;
            var prevPageToken = data.prevPageToken;

            console.log(data);

            $.each(data.items, function (i, item) {
                //get results
                var output = getOutput(item);
                
                //dislay results
                $('#results').append(output);
            });

            var buttons = getButtons(prevPageToken, nextPageToken);

				// Display Buttons
			$('#buttons').append(buttons);
            
        
        }
    );
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
    '<h3><a class="fancybox fancybox.iframe" href="http://www.youtube.com/embed/'+videoId+'">'+title+'</h3>' +
    '<small>By <span class="cTitle"> '+channelTitle+' </span> on '+videoDate+'</small>' +
    '<p>'+description+'</p>' + 
    '</div>' +
    '</li>' +
    '<div class="clearfix"> </div>' +
    '';

    return output;


}


function getButtons (prevPageToken, nextPageToken) {
    if(!prevPageToken) {
        var btnoutput = '<div class="button-container">' +
                        '<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'"' +
                        'onclick="nextPage();">Next Page</button></div>';
    } else {
        var btnoutput = '<div class="button-container">' +
        '<button id="prev-button" class="paging-button" data-token="'+prevPageToken+'" data-query="'+q+'"' +
        'onclick="prevPage();">Previous Page</button>' +
                        '<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'"' +
                        'onclick="nextPage();">Next Page</button></div>';

    }

    return btnoutput;
}

