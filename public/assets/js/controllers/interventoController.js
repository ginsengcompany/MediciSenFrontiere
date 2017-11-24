var pazienti;

$.ajax({
    url: '/getPaziente',
    type: 'GET',
    contentType: 'application/json',
    success: function(data) {

        var combopazienti = data;
        var select = document.getElementById("paziente");
        for(index in combopazienti) {
            select.options[select.options.length] = new Option(combopazienti[index].cognome + " " + combopazienti[index].nome, JSON.stringify(combopazienti[index]));
            pazienti = combopazienti[index];
        }

    },
    faliure: function(data) {

    }
});

$(function() {
    $('#datetimepickerDataIntervento').datetimepicker();
});

function changeSelectPaziente(){
    document.getElementById('fotoProfilo').style.display = 'block';
    var indice = $('#paziente').val();
    var indice2 = JSON.parse(indice);
    document.getElementById('fotoProfilo').src = indice2.foto_paziente.replace(/"/g, '');
}

var datiIntervento = {
    'dataIntervento' : '',
    'descrizioneIntervento' : '',
    'foglioDiarioClinico' : '',
    'complicanze' : '',
    'paziente' : ''
};

function salvaDati(){

    datiIntervento.dataIntervento = $('#dataIntervento').val();
    datiIntervento.descrizioneIntervento = $('#descrizioneIntervento').val();
    datiIntervento.foglioDiarioClinico = $('#foglioDiarioClinico').val();
    datiIntervento.complicanze = $('#complicanze').val();
    datiIntervento.paziente = pazienti.id;

    $.ajax({
        url: '/salvaIntervento',
        type: 'POST',
        data: JSON.stringify(datiIntervento),
        cache: false,
        contentType: 'application/json',
        success: function(data) {
            alert('Inserimento effettuato con Successo!');
            datiIntervento.dataIntervento = $('#dataIntervento').val('');
            datiIntervento.descrizioneIntervento = $('#descrizioneIntervento').val('');
            datiIntervento.foglioDiarioClinico = $('#foglioDiarioClinico').val('');
            datiIntervento.complicanze = $('#complicanze').val('');
            datiIntervento.paziente = $('#paziente').val('');
        },
        faliure: function(data) {
            alert('Inserire tutti i CAMPI!');
        }
    });

}