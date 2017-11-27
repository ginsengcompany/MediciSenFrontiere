var pazienti;

$.ajax({
    url: '/getPaziente',
    type: 'GET',
    contentType: 'application/json',
    success: function(data) {

        var combopazienti = data;
        var select = document.getElementById("paziente");
        pazienti = combopazienti;
        for(index in combopazienti) {
            select.options[select.options.length] = new Option(combopazienti[index].cognome + " " + combopazienti[index].nome, JSON.stringify(combopazienti[index]));
        }

    },
    faliure: function(data) {

    }
});

$(document).ready(function() {
    init();
    $('a#avviaCam,a#arrestaCam,a#catturaFoto').click(function(e) {
        e.preventDefault();
        return false;
    });
});

navigator.getUserMedia = ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

var datiIntervento = {
    'username' : ''
};

function changeSelectPaziente(){
    document.getElementById('fotoProfilo').style.display = 'block';
    document.getElementById("intervento").options.length=0;
    var indice = $('#paziente').val();
    var indice2 = JSON.parse(indice);
    document.getElementById('fotoProfilo').src = indice2.foto_paziente.replace(/"/g, '');
    datiIntervento.username = indice2.id;
    $.ajax({
        url: '/getIntervento',
        type: 'POST',
        data: JSON.stringify(datiIntervento),
        cache: false,
        contentType: 'application/json',
        success: function(data) {

            var combointervento = data;
            var select = document.getElementById("intervento");
            intervento = combointervento;
            for(index in combointervento) {
                select.options[select.options.length] = new Option(combointervento[index].descrizione_intervento + " " + combointervento[index].data_intervento	, JSON.stringify(combointervento[index]));
            }

        },
        faliure: function(data) {
        }
    });
}

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

var datiFoto = {
    'paziente' : '',
    'intervento' : '',
    'foto' : ''
};

function snapshot() {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    var imageURL = canvas.toDataURL();
    datiFoto.foto = imageURL;
}

function salvaDati(){

    var indice = $('#paziente').val();
    var indice2 = JSON.parse(indice);

    var indice1 = $('#intervento').val();
    var indice3 = JSON.parse(indice1);

    datiFoto.paziente=indice2.id;
    datiFoto.intervento=indice3.id;

    $.ajax({
        url: '/inserisciFoto',
        type: 'POST',
        data: JSON.stringify(datiFoto),
        cache: false,
        contentType: 'application/json',
        success: function(data) {


        },
        faliure: function(data) {
        }
    });

}