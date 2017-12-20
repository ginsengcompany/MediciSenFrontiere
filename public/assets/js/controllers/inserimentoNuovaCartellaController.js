var pazienti, indicePaziente, indicePazienteJSON;
var video, webcamStream;
var canvas, ctx;

var datiCartella = {
    'id_paziente' : undefined,
    'anni' : undefined,
    'peso' : undefined,
    'numero_cartella' : undefined,
    'cartella': undefined
};

$(function() {
    $('#datetimepicker1').datetimepicker();
    $('#datetimepicker2').datetimepicker();
    $('#hiddenrow').hide();
});

$(document).ready(function() {
    init();
    $('a#avviaCam,a#arrestaCam,a#catturaFoto').click(function(e) {
        e.preventDefault();
        return false;
    });
});

navigator.getUserMedia = ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

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
        indicePazienteJSON = "";
    }
});

function changeSelectPaziente(){
    indicePaziente = $('#paziente').val();
    indicePazienteJSON = JSON.parse(indicePaziente);
}

function encodeImageFileAsURL(element) {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
        datiCartella['foto_paziente']= reader.result;
    };
    reader.readAsDataURL(file);
}


function salvaCartella() {

    datiCartella.peso = $('#peso').val();
    datiCartella.anni = $('#anni').val();
    datiCartella.cartella = $('#cartellaClinica').val();
    datiCartella.numero_cartella = $('#numeroCartella').val();

    if(indicePazienteJSON === '' || indicePazienteJSON === "" || indicePazienteJSON === undefined)
    {
        alert('Non sono presenti pazienti a cui aprire una cartela clinica!');
    }
    else if (
        (datiCartella.peso === '' || datiCartella.peso === "" || datiCartella.peso === undefined) ||
        (datiCartella.anni === '' || datiCartella.anni === "" || datiCartella.anni === undefined) ||
        (datiCartella.cartella === '' || datiCartella.cartella === "" || datiCartella.cartella === undefined) ||
        (datiCartella.numero_cartella === '' || datiCartella.numero_cartella === "" || datiCartella.numero_cartella === undefined)
    )
    {
        alert('Inserire tutti i CAMPI!');
    }else
        {
            datiCartella.id_paziente = indicePazienteJSON._id;
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
}