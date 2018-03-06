


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
        $('<p>').text('Rated: '+ value.rating).addClass('img-fluid').appendTo('#image-container')
        $('<img>').attr('src',value.images.downsized.url).appendTo('#image-container')
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
