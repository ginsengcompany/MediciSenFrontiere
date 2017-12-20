var datiAnagrafica = {
    'nome' : undefined,
    'cognome' : undefined,
    'sesso' : undefined,
    'villaggio' : undefined,
    'distretto' : undefined,
    'contea' : undefined,
    'madre' : undefined,
    'padre' : undefined,
    'telefono' : undefined,
    'malaria' : undefined,
    'inizio' : undefined,
    'fine' : undefined,
    'surgey_children' : undefined,
    'st_mary_hospital' : undefined
};

document.getElementById('fine').disabled = true;
document.getElementById("inizio").disabled = true;

$(function() {
    $('#datetimepicker1').datetimepicker();
    $('#datetimepicker2').datetimepicker();
    $('#hiddenrow').hide();
});

function salvaAnagrafica() {

    datiAnagrafica.nome = $('#nome').val();
    datiAnagrafica.cognome = $('#cognome').val();
    datiAnagrafica.sesso = $('#sesso').val();
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

    if (
        (datiAnagrafica.nome === '' || datiAnagrafica.nome === "" || datiAnagrafica.nome === undefined) ||
        (datiAnagrafica.cognome === '' || datiAnagrafica.cognome === "" || datiAnagrafica.cognome === undefined) ||
        (datiAnagrafica.sesso === '' || datiAnagrafica.sesso === "" || datiAnagrafica.sesso === undefined) ||
        (datiAnagrafica.villaggio === '' || datiAnagrafica.villaggio === "" || datiAnagrafica.villaggio === undefined) ||
        (datiAnagrafica.distretto === '' || datiAnagrafica.distretto === "" || datiAnagrafica.distretto === undefined) ||
        (datiAnagrafica.contea === '' || datiAnagrafica.contea === "" || datiAnagrafica.contea === undefined) ||
        (datiAnagrafica.madre === '' || datiAnagrafica.madre === "" || datiAnagrafica.madre === undefined) ||
        (datiAnagrafica.padre === '' || datiAnagrafica.padre === "" || datiAnagrafica.padre === undefined) ||
        (datiAnagrafica.telefono === '' || datiAnagrafica.telefono === "" || datiAnagrafica.telefono === undefined) ||
        (datiAnagrafica.malaria === '' || datiAnagrafica.malaria === "" || datiAnagrafica.malaria === undefined) ||
        (datiAnagrafica.inizio === '' || datiAnagrafica.inizio === "" || datiAnagrafica.inizio === undefined) ||
        (datiAnagrafica.fine === '' || datiAnagrafica.fine === "" || datiAnagrafica.fine === undefined) ||
        (datiAnagrafica.surgey_children === '' || datiAnagrafica.surgey_children === "" || datiAnagrafica.surgey_children === undefined) ||
        (datiAnagrafica.st_mary_hospital === '' || datiAnagrafica.st_mary_hospital === "" || datiAnagrafica.st_mary_hospital === undefined)
    ) {
        alert('Inserire tutti i Campi!');
    }
    else{

        $.ajax({
            url: '/salvaAnagrafica',
            type: 'POST',
            data: JSON.stringify(datiAnagrafica),
            cache: false,
            contentType: 'application/json',
            success: function (data) {
                alert('Inserimento effettuato con Successo!');
                $('#nome').val('');
                $('#cognome').val('');
                $('#sesso').val('');
                $('#villaggio').val('');
                $('#distretto').val('');
                $('#datetimepicker1').data("DateTimePicker").clear();
                $('#datetimepicker2').data("DateTimePicker").clear();
                $('#contea').val('');
                $('#madre').val('');
                $('#padre').val('');
                $('#telefono').val('');
                $('#malaria').val('');
                $('#surgeyChildren').val('');
                $('#stMaryHospital').val('');
                $('#hiddenrow').hide();
            },
            faliure: function (data) {
                alert('Errore di salvataggio. Riprovare.');
            }
        });
    }
}

function changeSelectMalaria() {
    if ($('#malaria').val() === 'Si')
    {
        document.getElementById("fine").disabled = false;
        document.getElementById("inizio").disabled = false;
    }
    else
    {
        document.getElementById('fine').disabled = true;
        document.getElementById("inizio").disabled = true;
    }
}


function salvaDati(){
    salvaAnagrafica();
}