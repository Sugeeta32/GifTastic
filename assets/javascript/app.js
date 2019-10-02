
var sports = ["sridevi","swimming", "basketball", "cricket"]
var sportList = JSON.parse((localStorage.getItem("mySports")));
//if sportList is not an array yet i.e. it is null, therefore, assign it sports
if (!Array.isArray(sportList)) {
    console.log('i got refreshed');
    sportList = sports;
}


function renderButtons(soprtsArr) {
    debugger;
    $("#buttons-view").empty();
    for (var i = 0; i < soprtsArr.length; i++) {
        var a = $("<button>");
        // Adding a class of sport-btn to our button
        a.addClass("sport-btn");
        // Adding a data-attribute
        a.attr("data-sport", soprtsArr[i]);
        // Providing the initial button text
        a.text(soprtsArr[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

//console.log(aSport);
$(document).on("click", ".sport-btn", displaySport);
function displaySport() {
    var sport = $(this).attr("data-sport");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sport + "&api_key=z4KVMqoKBy4RxXsuE22ikVoCFJLRddKo&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // Storing the rating data
        // console.log(response.data[i].images.original.url);
        // Displaying the rating
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            var sportDiv = $("<div class ='sport'>");
            var p = $("<p>");
            p.text("Rating: " + results[i].rating);
            // sportDiv.append(p);
            // for animation and still the gifs
            var animated = results[i].images.fixed_height.url;
            var still = results[i].images.fixed_height_still.url;
            var sportImage = $("<img>");
            sportImage.attr("src", still);
            sportImage.attr("data-still", still);
            // console.log("data-still",still);
            sportImage.attr("data-animated", animated);
            // console.log("data-animated",animated)
            sportImage.attr("data-state", "still");
            sportImage.addClass("sportsImage");
            // sportImage.attr("src",results[i].images.fixed_height.url);
            sportDiv.append(sportImage);
            $("#sports-view").prepend(sportDiv);
        }
    });
};

//renderButtons(JSON.parse((localStorage.getItem("mySports"))));
// $("#buttons-view").text(sessionStorage.getItem("sport"));

$(document).on("click", ".sportsImage", function () {
    var state = $(this).attr("data-state");
    if (state == "still") {
        $(this).attr("src", $(this).data("animated"));
        $(this).attr("data-state", "animated");
    } else {
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
    }

});


$("#add-sports").on("click", function (event) {
    event.preventDefault();
    debugger;
    // This line grabs the input from the textbox
    var sport = $("#sport-input").val().trim();
    // check of sportList is not null i.e it has value from previous
    if (Array.isArray(sportList)) {
        console.log('i got refreshed');
        sports = sportList;
        sports.push(sport);
    }else {
        sports.push(sport); 
    }
    
   // renderButtons(sports);
    localStorage.setItem("mySports", JSON.stringify(sports));
    renderButtons(JSON.parse((localStorage.getItem("mySports"))));
});
renderButtons(sportList);





