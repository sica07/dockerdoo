$(document).ready(function(){
    $(".slide-down-button").click(function(){
        console.log($(this).siblings('.slide-down-button'))
        $(this).siblings('.slide-down').toggle();
    });

})
