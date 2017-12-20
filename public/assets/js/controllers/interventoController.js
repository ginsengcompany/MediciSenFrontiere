var pazienti, cartellaClinica, indicePaziente, indicePazienteJSON, indiceNumeroCartella, indiceCartella;

var datiIntervento = {
    'dataIntervento' : '',
    'descrizioneIntervento' : '',
    'foglioDiarioClinico' : '',
    'complicanze' : '',
    'id_cartella' : ''
};

var idCartella = {
    'id_cartella' : undefined
}


document.getElementById("formCartellaClinica").readOnly = true;

$(function() {
    $('#datetimepickerDataIntervento').datetimepicker();
});

$.ajax({
    url: '/getPaziente',
    type: 'GET',
    contentType: 'application/json',
    success: function(data) {
        var combopazienti = data;
        var select = document.getElementById("paziente");
        pazienti = combopazienti;
        document.getElementById("formCartellaClinica").readOnly = false;
        for(index in combopazienti) {
            select.options[select.options.length] = new Option(combopazienti[index].cognome + " " + combopazienti[index].nome, JSON.stringify(combopazienti[index]));
        }
    },
    faliure: function(data) {
        indicePazienteJSON = "";
    }
});

function changeSelectPaziente(){
    if ($('#paziente').val() === '' || $('#paziente').val() === undefined || $('#paziente').val() === "")
    {
        document.getElementById('fotoProfilo').style.display = 'none';
        return;
    }
    else
    {
        document.getElementById('cartellaClinica').options.length = 0;
        document.getElementById('numeroCartellaClinica').options.length = 0;
        document.getElementById('fotoProfilo').style.display = 'none';
        indicePaziente = $('#paziente').val();
        indicePazienteJSON = JSON.parse(indicePaziente);

        $.ajax({
            url: '/getCartellaPaziente',
            type: 'POST',
            data: JSON.stringify(indicePazienteJSON),
            contentType: 'application/json',
            success: function (data) {
                var comboCartella = data;
                console.log(comboCartella);
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
    $('#numeroCartellaClinica').val('');
    indiceCartella = JSON.parse($('#cartellaClinica').val());

    if ($('#numeroCartellaClinica').val() === ''){
        return;
    }else{
        indiceNumeroCartella = JSON.parse($('#numeroCartellaClinica').val());
        idCartella.id_cartella = indiceCartella.id_cartella;

        $.ajax({
            url: '/getNumeroCartella',
            type: 'POST',
            data: JSON.stringify(idCartella),
            contentType: 'application/json',
            success: function(data) {
                document.getElementById('fotoProfilo').style.display = 'block';
                document.getElementById('fotoProfilo').src = data[0].foto_paziente.replace(/"/g, '');
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
}

function changeSelectNumeroCartellaClinica() {
    indiceCartella = JSON.parse($('#cartellaClinica').val());
    document.getElementById('fotoProfilo').style.display = 'block';
    document.getElementById('fotoProfilo').src = indiceCartella.foto_paziente.replace(/"/g, '');
}
function salvaDati() {

    datiIntervento.dataIntervento = $('#datetimepickerDataIntervento').data();
    datiIntervento.descrizioneIntervento = $('#descrizioneIntervento').val();
    datiIntervento.foglioDiarioClinico = $('#foglioDiarioClinico').val();
    datiIntervento.complicanze = $('#complicanze').val();

    if (indicePazienteJSON === '' || indicePazienteJSON === "" || indicePazienteJSON === undefined) {
        alert('Non hai selezionato un paziente!');
    } else if (
        (datiIntervento.dataIntervento === '' || datiIntervento.dataIntervento === "" || datiIntervento.dataIntervento === undefined) ||
        (datiIntervento.descrizioneIntervento === '' || datiIntervento.descrizioneIntervento === "" || datiIntervento.descrizioneIntervento === undefined) ||
        (datiIntervento.foglioDiarioClinico === '' || datiIntervento.foglioDiarioClinico === "" || datiIntervento.foglioDiarioClinico === undefined) ||
        (datiIntervento.complicanze === '' || datiIntervento.complicanze === "" || datiIntervento.complicanze === undefined)
    ) {
        alert('Inserire tutti i CAMPI!');
    }
    else {
        var id_cartella = JSON.parse($('#cartellaClinica').val()).id_cartella;
        datiIntervento.id_cartella = id_cartella;
        $.ajax({
            url: '/salvaIntervento',
            type: 'POST',
            data: JSON.stringify(datiIntervento),
            cache: false,
            contentType: 'application/json',
            success: function (data) {
                alert('Inserimento effettuato con Successo!');
                datiIntervento.descrizioneIntervento = $('#descrizioneIntervento').val('');
                datiIntervento.foglioDiarioClinico = $('#foglioDiarioClinico').val('');
                datiIntervento.complicanze = $('#complicanze').val('');
                $('#datetimepickerDataIntervento').data("DateTimePicker").clear();
                datiIntervento.id_cartella = id_cartella;
            },
            faliure: function (data) {
                alert('Inserire tutti i CAMPI!');
            }
        });
    }
}