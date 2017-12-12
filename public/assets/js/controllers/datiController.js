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

var datiInFormazioni = {
    'username' : ''
};

var datiFotoIntervento = {
    'username' : '',
    'intervento': ''
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
    var k =new Date(indice2.malaria_inizio);
    var y =new Date(indice2.malaria_fine);
    indice2.malaria_inizio = formatDate(k);
    indice2.malaria_fine = formatDate(y);
    document.getElementById('fotoProfilo').src = indice2.foto_paziente.replace(/"/g, '');
    document.getElementById('cartellaClinica').value = indice2.cartella;
    document.getElementById('numeroCartella').value = indice2.numero_cartella;
    document.getElementById('anni').value = indice2.anni;
    document.getElementById('sesso').value = indice2.sesso;
    document.getElementById('peso').value = indice2.peso;
    document.getElementById('madre').value = indice2.madre;
    document.getElementById('padre').value = indice2.padre;
    document.getElementById('telefono').value = indice2.telefono;
    document.getElementById('malaria').value = indice2.malaria;
    document.getElementById('dalGiorno').value = indice2.malaria_inizio;
    document.getElementById('alGiorno').value = indice2.malaria_fine;

    datiInFormazioni.username = indice2._id;
    $.ajax({
        url: '/getInformazioni',
        type: 'POST',
        data: JSON.stringify(datiInFormazioni),
        cache: false,
        contentType: 'application/json',
        success: function(data) {

            var informazioni = data;
            for(var i =0; i<informazioni.length; i++){
                if(informazioni[i].data_ricovero){

                    var d =new Date(informazioni[i].data_ricovero);
                    var x =new Date(informazioni[i].data_dimissione);

                    informazioni[i].data_ricovero = d;
                    informazioni[i].data_dimissione = x;

                }
                informazioni[i].data_ricovero = formatDate(informazioni[i].data_ricovero);
                informazioni[i].data_dimissione = formatDate(informazioni[i].data_dimissione);
            }
            document.getElementById('dataRicovero').value = informazioni[0].data_ricovero;
            document.getElementById('dataDimissione').value = informazioni[0].data_dimissione;
            document.getElementById('diagnosi').value = informazioni[0].diagnosi;
            document.getElementById('anamnesi').value = informazioni[0].anamnesi;
            document.getElementById('consulenzaChirurgica').value = informazioni[0].consulenza_chiurugica;
            document.getElementById('consulenzaAnestesiologica').value = informazioni[0].consulenza_anestesiologica;
        },
        faliure: function(data) {
        }
    });

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
            var option = document.createElement("option");
            option.text = " ";
            select.add(option);
            intervento = combointervento;
            for(index in combointervento) {
                select.options[select.options.length] = new Option(combointervento[index].descrizione_intervento + " " + combointervento[index].data_intervento	, JSON.stringify(combointervento[index]));
            }

        },
        faliure: function(data) {
        }
    });
}

function changeSelectIntervento(){

    var indice = $('#intervento').val();
    var indice2 = JSON.parse(indice);
    var indice1 = $('#paziente').val();
    var indice3 = JSON.parse(indice);

    document.getElementById('dataIntervento').value = indice2.data_intervento;
    document.getElementById('descrizioneIntervento').value = indice2.descrizione_intervento;
    document.getElementById('foglioDiarioClinico').value = indice2.foglio_diario_clinico;
    document.getElementById('complicanze').value = indice2.complicanze;

    datiFotoIntervento.username = indice3._id;
    datiFotoIntervento.intervento = indice2._id;
    $.ajax({
        url: '/getFotoIntervento',
        type: 'POST',
        data: JSON.stringify(datiFotoIntervento),
        cache: false,
        contentType: 'application/json',
        success: function(data) {

            fotoIntervento = data;
            var numeroImmaginiDaQuery = fotoIntervento.length;
            var codiceGeneratoHTML = [];
            var div = document.getElementById('fotoIntervento');
            var i = 0;
            for (i = 0; i < numeroImmaginiDaQuery; i++) {
                var elem = document.createElement("img");
                elem.setAttribute("src", fotoIntervento[i].foto_intervento);
                elem.setAttribute("id", "thumbImage" + i);
                elem.setAttribute("data-toggle", "modal");
                elem.setAttribute("data-target", "#myModal");
                elem.setAttribute("height", "100px");
                elem.setAttribute("width", "100px");
                elem.style.border = "3px solid #43ACDC";
                elem.style.margin = "3px 3px 3px 3px";
                document.getElementById("fotoIntervento").appendChild(elem);
            }

            $(document).ready(function () {
                $('img').on('click', function () {
                    var image = $(this).attr('src');
                    //alert(image);
                    $('#myModal').on('show.bs.modal', function () {
                        $(".showimage").attr("src", image);
                    });
                });
            });


        },
        faliure: function(data) {
        }
    });


}
