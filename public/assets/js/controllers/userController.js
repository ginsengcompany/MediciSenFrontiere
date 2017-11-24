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
    datiAnagrafica['foto_paziente']= imageURL;
}

function visualizzaCamera(){
    $('#hiddenrow').show();
}

var datiAnagrafica = {
    'nome' : '',
    'cognome' : '',
    'anni' : '',
    'sesso' : '',
    'peso' : '',
    'villaggio' : '',
    'distretto' : '',
    'contea' : '',
    'madre' : '',
    'padre' : '',
    'telefono' : '',
    'malaria' : '',
    'inizio' : '',
    'fine' : '',
    'surgey_children' : '',
    'numero_cartella' : '',
    'cartella': '',
    'st_mary_hospital' : ''
};


function encodeImageFileAsURL(element) {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
        //console.log('RESULT', reader.result);
        datiAnagrafica['foto_paziente']= reader.result;
    };
    reader.readAsDataURL(file);

}

function salvaAnagrafica() {

    datiAnagrafica.nome = $('#nome').val();
    datiAnagrafica.cognome = $('#cognome').val();
    datiAnagrafica.anni = $('#anni').val();
    datiAnagrafica.sesso = $('#sesso').val();
    datiAnagrafica.peso = $('#peso').val();
    datiAnagrafica.villaggio = $('#villaggio').val();
    datiAnagrafica.distretto = $('#distretto').val();
    datiAnagrafica.contea = $('#contea').val();
    datiAnagrafica.madre = $('#madre').val();
    datiAnagrafica.padre = $('#padre').val();
    datiAnagrafica.telefono = $('#telefono').val();
    datiAnagrafica.malaria = $('#malaria').val();
    datiAnagrafica.inizio = $('#datetimepicker1').data();
    datiAnagrafica.fine = $('#datetimepicker2').data();
    datiAnagrafica.surgey_children = $('#surgeyChildren').val();
    datiAnagrafica.st_mary_hospital = $('#stMaryHospital').val();
    datiAnagrafica.cartella = $('#cartellaClinica').val();
    datiAnagrafica.numero_cartella = $('#numeroCartella').val();


    console.log(datiAnagrafica);

    $.ajax({
        url: '/salvaAnagrafica',
        type: 'POST',
        data: JSON.stringify(datiAnagrafica),
        cache: false,
        contentType: 'application/json',
        success: function(data) {
            alert('Inserimento effettuato con Successo!');
            $('#nome').val('');
            $('#cognome').val('');
            $('#anni').val('');
            $('#sesso').val('');
            $('#peso').val('');
            $('#villaggio').val('');
            $('#distretto').val('');
            $('#contea').val('');
            $('#madre').val('');
            $('#padre').val('');
            $('#telefono').val('');
            $('#malaria').val('');
            $('#surgeyChildren').val('');
            $('#stMaryHospital').val('');
            $('#cartellaClinica').val('');
            $('#numeroCartella').val('');
            $('#hiddenrow').hide();
        },
        faliure: function(data) {
            alert('Inserire tutti i CAMPI!');
        }
    });
}

function salvaDati(){
    salvaAnagrafica();
}