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


function formatDate(date) {
    var monthNames = [
        "Gennaio", "Febbraio", "Marzo",
        "Aprile", "Maggio", "Giugno", "Luglio",
        "Agosto", "Settembre", "Ottobre",
        "Novembre", "Dicembre"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var second = date.getSeconds();

    return day + ' ' + monthNames[monthIndex] + ' ' + year + ' '+hours+':'+minutes+':'+second;
}

function changeSelectPaziente(){
    document.getElementById('fotoProfilo').style.display = 'block';
    document.getElementById("intervento").options.length=0;
    var indice = $('#paziente').val();
    var indice2 = JSON.parse(indice);
    document.getElementById('fotoProfilo').src = indice2.foto_paziente.replace(/"/g, '');
    datiIntervento.username = indice2._id;
    $.ajax({
        url: '/getIntervento',
        type: 'POST',
        data: JSON.stringify(datiIntervento),
        cache: false,
        contentType: 'application/json',
        success: function(data) {

            var combointervento = data;
            for(var i =0; i<combointervento.length; i++){
                if(combointervento[i].data_intervento){

                    var d =new Date(combointervento[i].data_intervento);

                    combointervento[i].data_intervento = d;

                }
                combointervento[i].data_intervento = formatDate(combointervento[i].data_intervento);
            }
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

    datiFollowup.id_paziente=indice2._id;
    datiFollowup.id_intervento=indice3._id;
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
            $('#indaginiRadiografiche').val('');
            $('#indaginiEcografiche').val('');
            $('#indaginiEmatochimiche').val('');
            $('#followUp').val('');
            $('#anniPrecedenti').val('');
            alert('Inserimento effettuato con Successo!');
        },
        faliure: function(data) {
        }
    });

}