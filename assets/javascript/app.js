const topics =["Game Boy", "Nintendo", "Dungeons and Dragons","He-Man", "GI Joe",'Pearl Jam','Thunder Cats', 'Teenage Mutant Ninja Turtles','Nirvana']


renderButtons();

function search(item){
    const apiKey = '4RVECha85B9XgKqImgh8uzjqSj9NcdL6';
    let apiURL;
    let censodred = $('#pmrc').attr('class')
    if(censodred==='naughty')
        {
        apiURL =  'https://api.giphy.com/v1/gifs/search?api_key='+apiKey+'&q='+item+'&limit=10';
    }

    else{
        apiURL =  'https://api.giphy.com/v1/gifs/search?api_key='+apiKey+'&q='+item+'&limit=10&rating=pg';
    }
    
    $.ajax(
    {url:apiURL,
        method: 'GET'
    }
).done(function(response){

    displayGifs(response);
});
}


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

$(document).on('click', '.topic-button', function(event){
    searchTerm = $(this).attr('data-search');
    search(searchTerm);

});

$('.submit-button').on('click', function(event){
    event.preventDefault();
    if($('#search-box').val()&&!topics.includes($('#search-box').val())){
    let gif = $('#search-box').val();
    topics.push(gif);
    renderButtons();
    $('#search-box').val("");
    }
});

$(document).on('click','.pic', function(event){
    let state = $(this).attr('data-state');
    if(state==='still'){
        $(this).attr('src',$(this).attr('data-moving'));
        $(this).attr('data-state', 'moving');
    }
    else{
        $(this).attr('src',$(this).attr('data-still'));
        $(this).attr('data-state', 'still');
    }

});

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