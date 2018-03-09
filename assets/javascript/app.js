

const topics =["Game Boy", "Nintendo", "Dungeons and Dragons","He-Man"]


renderButtons();

function search(item){
    const apiKey = '4RVECha85B9XgKqImgh8uzjqSj9NcdL6';
    let apiURL = 'https://api.giphy.com/v1/gifs/search?api_key='+apiKey+'&q='+item+'&limit=10';
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
        btn.addClass('btn btn-light topic-button mx-2');
        btn.attr('data-search',value);
        btn.appendTo('.button-div');
    });


}   

function displayGifs(json){
    console.log(json);
    $('#image-container').empty();
    json.data.forEach(function(value, index){
        $('<p>').text('Rated: '+ value.rating).addClass('img-fluid').appendTo('#image-container');
        $('<img>').attr('src',value.images.fixed_width_small_still.url).addClass('pic').attr('data-still',value.images.fixed_width_small_still.url).attr('data-moving',value.images.fixed_width_small.url).attr('data-state','still').appendTo('#image-container');
    });
}

$(document).on('click', '.topic-button', function(event){
    searchTerm = $(this).attr('data-search');
    search(searchTerm);

});

$('.submit-button').on('click', function(event){
    event.preventDefault();
    let gif = $('#search-box').val().trim();
    topics.push(gif);
    renderButtons();
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