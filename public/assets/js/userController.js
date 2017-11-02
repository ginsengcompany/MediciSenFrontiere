$(document).ready(function() {
    init();
    $('a#avviaCam,a#arrestaCam,a#catturaFoto').click(function(e) {
        e.preventDefault();
        return false;
    });
});
$(".input-file").before(
    function() {
        if (!$(this).prev().hasClass('input-ghost')) {
            var element = $("<input type='file' class='input-ghost' style='visibility:hidden; height:0'>");
            element.attr("name",$(this).attr("name"));
            element.change(function(){
                element.next(element).find('input').val((element.val()).split('\\').pop());
            });
            $(this).find("button.btn-choose").click(function(){
                element.click();
            });
            $(this).find("button.btn-reset").click(function(){
                element.val(null);
                $(this).parents(".input-file").find('input').val('');
            });
            $(this).find('input').css("cursor","pointer");
            $(this).find('input').mousedown(function() {
                $(this).parents('.input-file').prev().click();
                return false;
            });
            return element;
        }
    }
);
$(function() {
    bs_input_file();
});
$(function() {
    $('#datetimepicker1').datetimepicker();
    $('#datetimepicker2').datetimepicker();
    $('#inizioRicovero').datetimepicker();
    $('#fineRicovero').datetimepicker();
    $('#datetimepickerDataIntervento').datetimepicker();
});
navigator.getUserMedia = ( navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia);
var video;
var webcamStream;
function startWebcam() {
    if (navigator.getUserMedia) {
        navigator.getUserMedia (
            // constraints
            {
                video: true,
                audio: false
            },
            // successCallback
            function(localMediaStream) {
                video = document.querySelector('video');
                video.src = window.URL.createObjectURL(localMediaStream);
                webcamStream = localMediaStream;
            },
            // errorCallback
            function(err) {
                console.log("The following error occured: " + err);
            }
        );
    } else {
        console.log("getUserMedia not supported");
    }
}
function stopWebcam() {
    webcamStream.stop();
}
//---------------------
// TAKE A SNAPSHOT CODE
//---------------------
var canvas, ctx;
function init() {
    // Get the canvas and obtain a context for
    // drawing in it
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext('2d');
}
function snapshot() {
    // Draws current image from the video element into the canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
}