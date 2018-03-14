//Array to pre-generate buttons / hold new buttons.
const topics =["Game Boy", "Nintendo", "Dungeons and Dragons","He-Man", "GI Joe",'Pearl Jam','Thunder Cats', 'Teenage Mutant Ninja Turtles','Nirvana']

//Renders the buttons!
renderButtons();

//Search the Giphy API. Accepts a string to seach
function search(item){
    const apiKey = '4RVECha85B9XgKqImgh8uzjqSj9NcdL6';
    let apiURL;
    //Search results can be censored. This checks the state of the class to determine if the search should display PG13 and R
    let censodred = $('#pmrc').attr('class')
    //Unrated Serach String
    if(censodred==='naughty')
        {
        apiURL =  'https://api.giphy.com/v1/gifs/search?api_key='+apiKey+'&q='+item+'&limit=10';
    }
    //Censored search string
    else{
        apiURL =  'https://api.giphy.com/v1/gifs/search?api_key='+apiKey+'&q='+item+'&limit=10&rating=pg';
    }
    
    $.ajax(
    {url:apiURL,
        method: 'GET'
    }
).done(function(response){
    //calls display gifs function (which display's gifs) and passes the object returned by the API as an argument. 
    displayGifs(response);
});
}

//Renders buttons based on items in topics array. 
function renderButtons(){
    $('.button-div').empty();
    topics.forEach(function(value,index){
        let btn = $('<button>');
        btn.text(value);
        btn.addClass('btn btn-light topic-button mx-2 my-1');
        btn.attr('data-search',value);
        btn.appendTo('.button-div');
    });


}   

//Displays gifs. Takes a JSON object from the Giphy API as an arugment.
function displayGifs(json){
    console.log(json);
    $('#image-container').empty();
        json.data.forEach(function(value, index){
            
            let frame = $("<div>").addClass('col-4');
            $('<p>').text('Rated: '+ value.rating).addClass('img-fluid my-2').appendTo(frame);
            $('<img>').attr('src',value.images.fixed_width_still.url).addClass('pic').attr('data-still',value.images.fixed_width_still.url).attr('data-moving',value.images.fixed_width.url).attr('data-state','still').appendTo(frame);
            frame.appendTo('#image-container');
        });
}

//Event listener for topic buttons. When a button is clicked it will pas the value in the data-search parapater to the search function.
$(document).on('click', '.topic-button', function(event){
    searchTerm = $(this).attr('data-search');
    search(searchTerm);

});

//Event listener for submit button to add a new topic / generate a new button.
$('.submit-button').on('click', function(event){
    event.preventDefault();
    //Ensures the box contains a value and the value is not one present in the array.
    if($('#search-box').val()&&!topics.includes($('#search-box').val())){
    let gif = $('#search-box').val();
    topics.push(gif);
    //Calls the render buttons function to display the new button
    renderButtons();
    //empties the search box
    $('#search-box').val("");
    }
});

//Event listener for gifs. When clicked they are motionless
$(document).on('click','.pic', function(event){
    let state = $(this).attr('data-state');
    //If they are still animate them 
    if(state==='still'){
        $(this).attr('src',$(this).attr('data-moving'));
        $(this).attr('data-state', 'moving');
    }
    //or else turn off animations
    else{
        $(this).attr('src',$(this).attr('data-still'));
        $(this).attr('data-state', 'still');
    }

});
//Event listener for cencorship fenctionality
$('#pmrc').on('click', function(){
    if($(this).attr('class')==='naughty'){
    //change image to tipper gore.
        $(this).attr('src', './assets/images/tipper.jpg');
        //change class to nice.
        $(this).toggleClass('naughty');
      
    }
    else{
        // change img src to pwec,
        $(this).attr('src', './assets/images/pwec.png');
         //set class to naughty
        $(this).toggleClass('naughty');
    }
    });