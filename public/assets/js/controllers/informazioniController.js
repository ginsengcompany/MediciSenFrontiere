var cartellaClinica, indicePaziente, indicePazienteJSON, indiceCartella;

indicePazienteJSON = { "_id":undefined};

document.getElementById("formCartellaClinica").readOnly = true;

var datiInformazioni = {
    'data_ricovero' : undefined,
    'data_dimissione' : undefined,
    'diagnosi' : undefined,
    'anamnesi' : undefined,
    'consulenza_chiurugica' : undefined,
    'consulenza_anestesiologica' : undefined,
    'id_cartella' : ''
};

var idCartella = {
    'id_cartella' : undefined
};

$(function() {
    $('#inizioRicovero').datetimepicker();
    $('#fineRicovero').datetimepicker();
});

function convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat);
    return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
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
                var date = new Date(data);
                var month = date.getMonth() + 1;
                return date.getDate() + "/" + (month.length < 10 ? "0" + month : month) + "/" + date.getFullYear();
            }, "visible": false},
            { "data": "malaria_fine" , "render": function (data) {
                var date = new Date(data);
                var month = date.getMonth() + 1;
                return date.getDate() + "/" + (month.length < 10 ? "0" + month : month) + "/" + date.getFullYear();
            }, "visible": false}
        ]
    } );

    $('#tabellaPazienti tbody').on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
            ids1 = $.map(tabPazienti.rows('.selected').data(), function (item) {
                return item;
            });
            arrayPaziente = ids1;
            changeSelectPaziente(arrayPaziente);
        }
        else {
            tabPazienti.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
            ids1 = $.map(tabPazienti.rows('.selected').data(), function (item) {
                return item;
            });
            arrayPaziente = ids1;
            changeSelectPaziente(arrayPaziente);

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

function changeSelectPaziente(arrayPaziente){
    if (arrayPaziente.length<0)
    {
        document.getElementById('fotoProfilo').style.display = 'none';
        return;
    }
    else
    {
        document.getElementById('cartellaClinica').options.length = 0;
        document.getElementById('numeroCartellaClinica').options.length = 0;
        document.getElementById('fotoProfilo').style.display = 'none';
        indicePaziente = arrayPaziente[0]._id;
        indicePazienteJSON._id = indicePaziente;

        $.ajax({
            url: '/getCartellaPaziente',
            type: 'POST',
            data: JSON.stringify(indicePazienteJSON),
            contentType: 'application/json',
            success: function (data) {
                var comboCartella = data;
                var selectCartella = document.getElementById("cartellaClinica");
                selectCartella.options[selectCartella.options.length] = new Option('');
                cartellaClinica = comboCartella;
                for (index in comboCartella) {
                    selectCartella.options[selectCartella.options.length] = new Option(comboCartella[index].cartella, JSON.stringify(comboCartella[index]));
                }
            },
            faliure: function (data) {
                indicePazienteJSON = "";
                cartellaClinica = "";
                document.getElementById('cartellaClinica').options.length = 0;
            }
        });
    }
}

function changeSelectCartellaClinica() {

    document.getElementById("numeroCartellaClinica").options.length=0;

    document.getElementById('fotoProfilo').style.display = 'none';

    $('#numeroCartellaClinica').val('');
    indiceCartella = JSON.parse($('#cartellaClinica').val());
    idCartella.id_cartella = indiceCartella.id_cartella;

    $.ajax({
        url: '/getNumeroCartella',
        type: 'POST',
        data: JSON.stringify(idCartella),
        contentType: 'application/json',
        success: function(data) {

            var select = document.getElementById("numeroCartellaClinica");
            select.options[select.options.length] = new Option('');
            for(index in data) {
                select.options[select.options.length] = new Option(data[index].numero_cartella, JSON.stringify(data[index]));
            }
        },
        faliure: function(data) {
            display.alert('Errore nel prelievo delle informazioni!');
        }
    });

}

function changeSelectNumeroCartellaClinica() {
    indiceCartella = JSON.parse($('#cartellaClinica').val());
    document.getElementById('fotoProfilo').style.display = 'block';
    document.getElementById('fotoProfilo').src = indiceCartella.foto_paziente.replace(/"/g, '');
}

function salvaDati(){

    datiInformazioni.data_ricovero = $('#inizioRicovero').data();
    datiInformazioni.data_dimissione = $('#fineRicovero').data();
    datiInformazioni.diagnosi = $('#diagnosi').val();
    datiInformazioni.anamnesi = $('#anamnesi').val();
    datiInformazioni.consulenza_chiurugica = $('#consulenzaChirurgica').val();
    datiInformazioni.consulenza_anestesiologica = $('#consulenzaAnestesiologica').val();

    if(indicePazienteJSON === '' || indicePazienteJSON === "" || indicePazienteJSON === undefined)
    {
        alert('Non hai selezionato un paziente!');
    }
    else if (
        (datiInformazioni.data_ricovero              === '' ||  datiInformazioni.data_ricovero              === "" || datiInformazioni.data_ricovero              === undefined)||
        (datiInformazioni.data_dimissione            === '' ||  datiInformazioni.data_dimissione            === "" || datiInformazioni.data_dimissione            === undefined)||
        (datiInformazioni.diagnosi                   === '' ||  datiInformazioni.diagnosi                   === "" || datiInformazioni.diagnosi                   === undefined)||
        (datiInformazioni.anamnesi                   === '' ||  datiInformazioni.anamnesi                   === "" || datiInformazioni.anamnesi                   === undefined)||
        (datiInformazioni.consulenza_chiurugica      === '' ||  datiInformazioni.consulenza_chiurugica      === "" || datiInformazioni.consulenza_chiurugica      === undefined)||
        (datiInformazioni.consulenza_anestesiologica === '' ||  datiInformazioni.consulenza_anestesiologica === "" || datiInformazioni.consulenza_anestesiologica === undefined)
    )
    {
        alert('Inserire tutti i CAMPI!');
    }
    else {
        var id_cartella = JSON.parse($('#cartellaClinica').val()).id_cartella;
        datiInformazioni.id_cartella = id_cartella;
        $.ajax({
            url: '/salvaInformazioni',
            type: 'POST',
            data: JSON.stringify(datiInformazioni),
            cache: false,
            contentType: 'application/json',
            success: function (data) {
                alert('Inserimento effettuato con Successo!');
                datiInformazioni.diagnosi = $('#diagnosi').val('');
                datiInformazioni.anamnesi = $('#anamnesi').val('');
                datiInformazioni.consulenza_chiurugica = $('#consulenzaChirurgica').val('');
                datiInformazioni.consulenza_anestesiologica = $('#consulenzaAnestesiologica').val('');
                $('#inizioRicovero').data("DateTimePicker").clear();
                $('#fineRicovero').data("DateTimePicker").clear();
                datiInformazioni.id_cartella = id_cartella;
            },
            faliure: function (data) {
                alert('Inserire tutti i CAMPI!');
            }
        });
    }
}