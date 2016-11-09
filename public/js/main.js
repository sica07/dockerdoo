$(document).ready(function(){
    setActiveMenu();
    $(".slide-down-button").click(function(){
        console.log($(this).siblings('.slide-down-button'))
        $(this).siblings('.slide-down').toggle();
    });
    $("#compose-stop").click(function(){
        $("#terminal").html('<pre>Stopping the services...</pre>');
        $.ajax({
            url:'/compose/stop',
            type: 'POST',
            success: function(data){
                notify('Service is successfuly stopped<br/>', 1);
                $("#terminal").html('<pre>'+data+'</pre>');
                getComposeStatus();
            },
            error: function(err){
                notify('An error occured. Please try again.', 0);
            }

        })
    })

    $("#compose-start").click(function(){
        $("#terminal").html('<pre>Starting the services...</pre>');
        $.ajax({
            url:'/compose/start',
            type: 'POST',
            success: function(data){
                notify('Service is successfuly started<br/>'+data, 1);
                $("#terminal").html('<pre>'+data+'</pre>');
                getComposeStatus();
            },
            error: function(err){
                notify('An error occured. Please try again.', 0);
            }

        })
    })
    $("#compose-restart").click(function(){
        $("#terminal").html('<pre>restarting the services...</pre>');
        $.ajax({
            url:'/compose/restart',
            type: 'POST',
            success: function(data){
                notify('Service is successfuly restarted<br/>'+data, 1);
                $("#terminal").html('<pre>'+data+'</pre>');
                getComposeStatus();
            },
            error: function(err){
                notify('An error occured. Please try again.', 0);
            }

        })
    })
    $("#compose-pause").click(function(){
        $("#terminal").html('<pre>Pauseing the services...</pre>');
        $.ajax({
            url:'/compose/pause',
            type: 'POST',
            success: function(data){
                notify('Service is successfuly paused<br/>'+data, 1);
                $("#terminal").html('<pre>'+data+'</pre>');
                getComposeStatus();
            },
            error: function(err){
                notify('An error occured. Please try again.', 0);
            }

        })
    })
    $("#compose-unpause").click(function(){
        $("#terminal").html('<pre>Unpauseing the services...</pre>');
        $.ajax({
            url:'/compose/unpause',
            type: 'POST',
            success: function(data){
                notify('Service is successfuly unpaused<br/>'+data, 1);
                $("#terminal").html('<pre>'+data+'</pre>');
                getComposeStatus();
            },
            error: function(err){
                notify('An error occured. Please try again.', 0);
            }

        })
    })



})
function setActiveMenu(){
    var path = window.location.pathname.split('/');
    $(".primary-submenu.active").removeClass('active')
    $("#menu-"+path[1]).addClass('active');
    switch (path[1]) {
        case 'compose':
            $("")

            break;

        default:

    }
}
function getComposeStatus(){
        $.ajax({
            url:'/compose/ps',
            type: 'POST',
            success: function(data){
                setTimeout(function(){
                    $("#terminal").html('<pre>'+data+'</pre>');
                }, 2000)
            },
            error: function(err){
                notify('An error occured. Please try again.', 0);
            }

        })
}
function notify(txt,type) {
    switch (type) {
        case 1:
            classType = 'alert-success';
            iconType = '<span class="fa-stack fa-lg m-r-1"> <i class="fa fa-circle-thin fa-stack-2x text-success"></i> <i class="fa fa-check fa-stack-1x text-success"></i> </span>'
            break;
        case 0:
            classType = 'alert-danger';
            iconType = '<span class="fa-stack fa-lg m-r-1"> <i class="fa fa-circle-thin fa-stack-2x text-danger"></i> <i class="fa fa-close fa-stack-1x text-danger"></i> </span>'
            break;

        default:
            classType = 'alert-info';
            iconType = '<span class="fa-stack fa-lg m-r-1"> <i class="fa fa-circle-thin fa-stack-2x text-primary"></i> <i class="fa fa-info fa-stack-1x text-primary"></i> </span>'

    }
    var html='<div class="alert'+classType+'" role="alert" id="notify">';
    html += '<button type="button" onclick="javascript:$(\"#notify\#).remove()" class="close text-gray-darker" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>';
    html += iconType;
    html += txt + '</div>';
    $("body")
}
