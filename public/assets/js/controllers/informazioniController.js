$(function() {
    $('#inizioRicovero').datetimepicker();
    $('#fineRicovero').datetimepicker();
});

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

function changeSelectPaziente(){
    document.getElementById('fotoProfilo').style.display = 'block';
    var indice = $('#paziente').val();
    var indice2 = JSON.parse(indice);
    document.getElementById('fotoProfilo').src = indice2.foto_paziente.replace(/"/g, '');
}

var datiInformazioni = {
    'data_ricovero' : '',
    'data_dimissione' : '',
    'diagnosi' : '',
    'anamnesi' : '',
    'consulenza_chiurugica' : '',
    'consulenza_anestesiologica' : '',
    'id_paziente' : ''
};

function salvaDati(){

    datiInformazioni.data_ricovero = $('#inizioRicovero').data();
    datiInformazioni.data_dimissione = $('#fineRicovero').data();
    datiInformazioni.diagnosi = $('#diagnosi').val();
    datiInformazioni.anamnesi = $('#anamnesi').val();
    datiInformazioni.consulenza_chiurugica = $('#consulenzaChirurgica').val();
    datiInformazioni.consulenza_anestesiologica = $('#consulenzaAnestesiologica').val();
    datiInformazioni.id_paziente = $('#paziente').val();


    $.ajax({
        url: '/salvaInformazioni',
        type: 'POST',
        data: JSON.stringify(datiInformazioni),
        cache: false,
        contentType: 'application/json',
        success: function(data) {
            alert('Inserimento effettuato con Successo!');
            datiInformazioni.diagnosi = $('#diagnosi').val('');
            datiInformazioni.anamnesi = $('#anamnesi').val('');
            datiInformazioni.consulenza_chiurugica = $('#consulenzaChirurgica').val('');
            datiInformazioni.consulenza_anestesiologica = $('#consulenzaAnestesiologica').val('');
            datiInformazioni.id_paziente = $('#paziente').val('');
        },
        faliure: function(data) {
            alert('Inserire tutti i CAMPI!');
        }
    });


}