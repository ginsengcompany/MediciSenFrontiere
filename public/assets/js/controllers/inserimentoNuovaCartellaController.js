var indicePaziente, indicePazienteJSON;
var video, webcamStream;
var canvas, ctx;

var datiCartella = {
    'id_paziente' : undefined,
    'anni' : undefined,
    'peso' : undefined,
    'numero_cartella' : undefined,
    'cartella': undefined,
    'tipo': undefined
};

$(function() {
    var today = new Date();
    var yyyy = today.getFullYear();
    var mm = today.getMonth()+1; //January is 0!
    var valueMonth=yyyy+'-'+mm;
    $('#datetimepicker1').datetimepicker();
    $('#datetimepicker2').datetimepicker();
    $('#hiddenrow').hide();
    $('#cartellaClinica').val(valueMonth);
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
	startWebcam();
}

function convertDate(inputFormat) {
    if(inputFormat !== null){
        function pad(s) { return (s < 10) ? '0' + s : s; }
        var d = new Date(inputFormat);
        return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
    }
    else{
        var label = "-";
        return label;
    }

}

function format ( d ) {
    // `d` is the original data object for the row
    return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
        '<tr>'+
        '<td>Surgey Children:</td>'+
        '<td>'+d.surgey_children+'</td>'+
        '</tr>'+
        '<tr>'+
        '<td>St Mary Hospital:</td>'+
        '<td>'+d.st_mary_hospital+'</td>'+
        '</tr>'+
        '<tr>'+
        '<td>Villaggio:</td>'+
        '<td>'+d.villaggio+'</td>'+
        '</tr>'+
        '<tr>'+
        '<td>Distretto:</td>'+
        '<td>'+d.distretto+'</td>'+
        '</tr>'+
        '<tr>'+
        '<td>Contea:</td>'+
        '<td>'+d.contea+'</td>'+
        '</tr>'+
        '<tr>'+
        '<td>madre:</td>'+
        '<td>'+d.madre+'</td>'+
        '</tr>'+
        '<tr>'+
        '<td>Padre:</td>'+
        '<td>'+d.padre+'</td>'+
        '</tr>'+
        '<tr>'+
        '<td>Telefono:</td>'+
        '<td>'+d.telefono+'</td>'+
        '</tr>'+
        '<tr>'+
        '<td>Malaria:</td>'+
        '<td>'+d.malaria+'</td>'+
        '</tr>'+
        '<tr>'+
        '<td>Data Inizio Malaria:</td>'+
        '<td>'+convertDate(d.malaria_inizio)+'</td>'+
        '</tr>'+
        '<tr>'+
        '<td>Data Fine Malaria:</td>'+
        '<td>'+convertDate(d.malaria_fine)+'</td>'+
        '</tr>'+
        '</table>';
}

$(document).ready(function() {

    tabPazienti = $('#tabellaPazienti').DataTable( {
        ajax: "/getPaziente",
        responsive: true,
        ajaxSettings: {
            method: "GET",
            cache: false
        },
        columns: [
            {
                "className":      'details-control',
                "orderable":      false,
                "data":           null,
                "defaultContent": ''
            },
            { "data": "cognome" },
            { "data": "nome" },
            { "data": "sesso"},
            { "data": "surgey_children", "visible": false },
            { "data": "st_mary_hospital", "visible": false },
            { "data": "villaggio", "visible": false },
            { "data": "distretto", "visible": false },
            { "data": "contea", "visible": false },
            { "data": "madre", "visible": false },
            { "data": "padre", "visible": false },
            { "data": "telefono", "visible": false },
            { "data": "malaria", "visible": false },
            { "data": "malaria_inizio" , "render": function (data) {
                if(data !== null){
                    var date = new Date(data);
                    var month = date.getMonth() + 1;
                    return date.getDate() + "/" + (month.length < 10 ? "0" + month : month) + "/" + date.getFullYear();
                }
                else{
                    var label = "-";
                    return label;
                }

            }, "visible": false},
            { "data": "malaria_fine" , "render": function (data) {
                if(data !== null){
                    var date = new Date(data);
                    var month = date.getMonth() + 1;
                    return date.getDate() + "/" + (month.length < 10 ? "0" + month : month) + "/" + date.getFullYear();
                }
                else{
                    var label = "-";
                    return label;
                }
            }, "visible": false}
        ]
    } );

    $('#tabellaPazienti tbody').on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            tabPazienti.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    } );

    $('#tabellaPazienti tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = tabPazienti.row( tr );

        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child( format(row.data()) ).show();
            tr.addClass('shown');
        }
    } );

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

    var ids1 = $.map(tabPazienti.rows('.selected').data(), function (item) {
        return item;
    });
    arrayPaziente = ids1;

    datiCartella.peso = $('#peso').val();
    datiCartella.anni = $('#anni').val();
    datiCartella.cartella = $('#cartellaClinica').val();
    datiCartella.numero_cartella = $('#numeroCartella').val();
    datiCartella.tipo = $('#tipoEta').val();

    if(arrayPaziente.length<0)
    {
        alert('Non sono presenti pazienti a cui aprire una cartela clinica!');
    }
    else if (
        (datiCartella.peso === '' || datiCartella.peso === "" || datiCartella.peso === undefined) ||
        (datiCartella.anni === '' || datiCartella.anni === "" || datiCartella.anni === undefined) ||
        (datiCartella.cartella === '' || datiCartella.cartella === "" || datiCartella.cartella === undefined) ||
        (datiCartella.tipo === '' || datiCartella.tipo === "" || datiCartella.tipo === undefined) ||
        (datiCartella.numero_cartella === '' || datiCartella.numero_cartella === "" || datiCartella.numero_cartella === undefined)
    )
    {
        alert('Inserire tutti i CAMPI!');
    }else
        {
            datiCartella.id_paziente = arrayPaziente[0]._id;
            $.ajax({
                url: '/salvaCartella',
                type: 'POST',
                data: JSON.stringify(datiCartella),
                cache: false,
                contentType: 'application/json',
                success: function (data) {
                    if(data.errore){
                        alert(data.errore);
                    }
                    else alert('Inserimento effettuato con Successo!');
                    $('#anni').val('');
                    $('#peso').val('');
                    $('#cartellaClinica').val('');
                    $('#numeroCartella').val('');
                    $('#tipoEta').val('');
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

$(function() {
    var today = new Date();
    var yyyy = today.getFullYear();
    var mm = today.getMonth()+1; //January is 0!
    var valueMonth=yyyy+'-'+mm;
    $('#searchcartellaClinica').val(valueMonth);
});

function searchTable(){

    var datiSearch = {
        "cartella": "",
        "numero_cartella": ""
    };

    if(($('#searchcartellaClinica').val() !== '' || $('#searchcartellaClinica').val() !== null) && ($('#searchnumeroCartella').val() !== '' || $('#searchnumeroCartella').val() !== null)){

        datiSearch.cartella = $('#searchcartellaClinica').val();
        datiSearch.numero_cartella = $('#searchnumeroCartella').val();

        $.ajax({
            url: '/searchTable',
            type: 'POST',
            data: JSON.stringify(datiSearch),
            contentType: 'application/json',
            success: function(data) {
                console.log(data[0]);
                tabPazienti.search( data[0].cognome +" "+ data[0].nome).draw();
            },
            faliure: function(data) {

            }
        });

    }

}