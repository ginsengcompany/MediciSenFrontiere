var pazienti;

$(document).ready(function() {
    init();
    $('a#avviaCam,a#arrestaCam,a#catturaFoto').click(function(e) {
        e.preventDefault();
        return false;
    });
});

$(function() {
    $('#datetimepicker1').datetimepicker();
    $('#datetimepicker2').datetimepicker();
    $('#hiddenrow').hide();
});


navigator.getUserMedia = ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

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

var canvas, ctx;

function init() {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext('2d');
}

function snapshot() {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    var imageURL = canvas.toDataURL();
    datiCartella['foto_paziente']= imageURL;
}

function visualizzaCamera(){
    $('#hiddenrow').show();
}

$.ajax({
    url: '/getPaziente',
    type: 'GET',
    contentType: 'application/json',
    success: function(data) {

        var combopazienti = data;
        var select = document.getElementById("paziente");
        pazienti = combopazienti;
        console.log(pazienti);
        for(index in combopazienti) {
            select.options[select.options.length] = new Option(combopazienti[index].cognome + " " + combopazienti[index].nome, JSON.stringify(combopazienti[index]));
        }
    },
    faliure: function(data) {

    }
});

function changeSelectPaziente(){
    var indice = $('#paziente').val();
    var indice2 = JSON.parse(indice);
}

var datiCartella = {
    'id_paziente' : undefined,
    'anni' : undefined,
    'peso' : undefined,
    'numero_cartella' : undefined,
    'cartella': undefined
};

function encodeImageFileAsURL(element) {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
        //console.log('RESULT', reader.result);
        datiCartella['foto_paziente']= reader.result;
    };
    reader.readAsDataURL(file);
}

function salvaCartella() {

    var indice = $('#paziente').val();
    var indice2 = JSON.parse(indice);

    datiCartella.peso = $('#peso').val();
    datiCartella.anni = $('#anni').val();
    datiCartella.cartella = $('#cartellaClinica').val();
    datiCartella.numero_cartella = $('#numeroCartella').val();
    datiCartella.id_paziente = indice2._id;

    if (
        (datiCartella.peso === '' || datiCartella.peso === "" || datiCartella.peso === undefined) ||
        (datiCartella.anni === '' || datiCartella.anni === "" || datiCartella.anni === undefined) ||
        (datiCartella.cartella === '' || datiCartella.cartella === "" || datiCartella.cartella === undefined) ||
        (datiCartella.numero_cartella === '' || datiCartella.numero_cartella === "" || datiCartella.numero_cartella === undefined)
    ){
        alert('Inserire tutti i CAMPI!');
    }
    else {
        $.ajax({
            url: '/salvaCartella',
            type: 'POST',
            data: JSON.stringify(datiCartella),
            cache: false,
            contentType: 'application/json',
            success: function (data) {
                alert('Inserimento effettuato con Successo!');
                $('#anni').val('');
                $('#peso').val('');
                $('#cartellaClinica').val('');
                $('#numeroCartella').val('');
                $('#hiddenrow').hide();
            },
            faliure: function (data) {
                alert('Errore nella Richiesta.');
            }
        });
    }
}

function salvaDati(){
    salvaCartella();
    location.reload();
}