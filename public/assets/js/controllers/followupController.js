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

var datiFollowup = {
    'indagini_radiografiche':'',
    'indagini_ecografiche':'',
    'indegini_ematochimiche':'',
    'follow_up':'',
    'anni_precedenti':'',
    'id_paziente':'',
    'id_intervento':''
};

function salvaDati(){

    var indice = $('#paziente').val();
    var indice2 = JSON.parse(indice);

    var indice1 = $('#intervento').val();
    var indice3 = JSON.parse(indice1);

    datiFollowup.id_paziente=indice2.id;
    datiFollowup.id_intervento=indice3.id;
    datiFollowup.indagini_radiografiche = $('#indaginiRadiografiche').val();
    datiFollowup.indagini_ecografiche = $('#indaginiEcografiche').val();
    datiFollowup.indegini_ematochimiche = $('#indaginiEmatochimiche').val();
    datiFollowup.follow_up = $('#followUp').val();
    datiFollowup.anni_precedenti = $('#anniPrecedenti').val();

    $.ajax({
        url: '/inserisciFollowUp',
        type: 'POST',
        data: JSON.stringify(datiFollowup),
        cache: false,
        contentType: 'application/json',
        success: function(data) {
            alert('Inserimento effettuato con Successo!');
        },
        faliure: function(data) {
        }
    });

}