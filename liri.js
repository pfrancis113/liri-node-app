var keys = require('./keys.js');

var Twitter = require('twitter');

var spotify = require('spotify');

var getMyTweets = function() {

    var client = new Twitter(keys.twitter);

    var params = {screen_name: 'Benev0lentRonin'};

	//call the get method on our client variable twitter instance
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
	        for (i=0; i<tweets.length; i++){
                console.log(tweets[i].created_at);
                console.log(' ');
                console.log(tweets[i].text);
            } 
        }
    });
}

var Spotify = new Spotify(keys.Spotify);

var getArtistName = function(artist) {
    return artist.name;
}

var getSpotify = function (songName) {

    spotify.search({ type: 'track', query: songName}, function(err, data){
        if ( err ) {
            console.log('Error occurred: ' + err);
            return;
        }

        var songs =data.tracks.items;
        for (var i=0; i<songs.length; i++){
            console.log(i);
            console.log('artist(s): ' + songs[i].artists.map(
                getArtistNames));
            console.log('song name: ' + songs[i].name);
            console.log('preview song: ' + songs[i].preview_url);
            console.log('album: ' + songs[i].album.name);
            console.log('-----------------------------------------');
        }
    });
}

var getMovie = function(movieName) {

     request('http://www.omdbapi.com/?t=' + movieName + '&plot=short&tomatoes=true',
            function (error, response, body){
          if(!error && response.statusCode == 200){
            var body = JSON.parse(body);
      
            console.log("Title: " + body.Title);
            console.log("Release Year: " + body.Year);
            console.log("IMDB Rating: " + body.imdbRating);
            console.log("Country: " + body.Country);
            console.log("Language: " + body.Language);
            console.log("Plot: " + body.Plot);
            console.log("Actors: " + body.Actors);
            console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
            console.log("Rotten Tomatoes URL: " + body.tomatoURL);
    } else{
        console.log('Error occurred.')
      }
      if(movieName === "Mr. Nobody"){
        console.log("-----------------------");
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        console.log("It's on Netflix!");
  
        //adds text to log.txt
        fs.appendFile('log.txt', "-----------------------");
        fs.appendFile('log.txt', "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        fs.appendFile('log.txt', "It's on Netflix!");
      }
    });

var doWhatItSays = function() {
    fs.readFile('random.txt', 'utf8', function (err, data){
        if (err) throw err;
        var dataArr = data.split(',');

        if (dataArr.length ==2) {
            pick(dataArr[0].dataArr[1]);
        } else if (dataArr.length ==1) {
            pick(dataArr[0]);
        }
        
    });
}

var pick = function(caseData, functionData) {
    switch(caseData) {
        case 'my-tweets':
            getMyTweets();
            break;
        case 'spotify-this-song':
            getSpotify(functionData);
            break;
        case "movie-this":
            getMovie(functionData);
        case 'do-what-it-says':
            doWhatItSays();
            break;
        default:
        console.log('LIRI does not know that')

    }
}

var runThis = function(argOne, argTwo) {
    pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);}
