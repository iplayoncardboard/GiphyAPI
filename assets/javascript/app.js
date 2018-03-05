

const apiKey = '4RVECha85B9XgKqImgh8uzjqSj9NcdL6'
let apiURL = 'https://api.giphy.comGET /v1/gifs/search?api_key:'+apiKey+'&q:';
let topics =["Game Boy", "Nintendo", "Dungeons and Dragons"]


renderButtons();

function search(){$.ajax(
    {url:apiURL,
        method: 'GET'
    }
).done(function(response){

});
}


function renderButtons(){
    $('.button-div').empty();
    topics.forEach(function(value,index){
        let btn = $('<button>');
        btn.text(value);
        btn.addClass('btn btn-light topic-button');
        btn.attr('data-search',value);
        btn.appendTo('.button-div');
    });


}


$(document).on('click', '.topic-button', function(event){
    

});