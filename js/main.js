//Variable global para llevar control del numero de numeros visibles
var number_count = 1;

//Cuando esta listo el DOM de elementos
$(function () {

    //Manejo de eventos de boton "mas numeros" el cual agregara mas numeros en la interfaz
    $('#btn-more').click(function (e) {
        addNumberInput();
    });

    //Manejo de cambios en INPUT de numeros
    $(document).on('keyup change', '.number-input', function (e) {
        checkNumbers($(this));
    })

});

//Funcion para añadir plantilla para un nuevo numero
function addNumberInput() {
    var template_begin = '<input class="number-input" type="number" name="number[]" id="input-';
    var template_last = '" min="0">';

    //Añade al final del elemento seleccionado la plantilla con un ID unico basado en la variable number_count
    $('#dynamic-number-wrapper').append(template_begin + number_count + template_last);

    //Forzar foco en nuevo input
    $('#input-' + number_count).focus();

    //actualiza contandor de numeros
    number_count++;
}

//Funcion para verificar que los numeros no estan repetidos, recibe el elemento que inicio el evento
function checkNumbers($elem) {
    var numbers = [];
    var $numberInput = $('.number-input');

    //Añadiendo numeros a un array para procesarlos
    $numberInput.each(function (i) {
        var valToComp = $(this).val();
        var duplicated = false;

        //Verificando repetidos
        $numberInput.each(function (j) {

            //Si los indices son distintos y el valor a comparar es igual al actual, existe un duplicado
            if (i != j && valToComp != '' && valToComp == $(this).val())
                duplicated = true;
        });

        //Deplicado encontrado
        if (duplicated)
            $elem.val('');

        //Sin duplicados
        if ($(this).val() != '')
            numbers.push($(this).val());
    });

    //Limpiando resultados anteriores
    $('#original-wrapper,#result-wrapper').html('');

    var numbers_last_index = numbers.length - 1;

    ///Array original
    $.each(numbers, function (index, value) {
        var separator = numbers_last_index == index ? '.' : ',';
        var $wrapper = $('#original-wrapper');
        if (index == 0) $wrapper.append('<h5>Original</h5>');
        $wrapper.append('<b>' + value + separator + '</b>');
    });

    //Array ordenado (esta funcion anonima soluciona el problema de ordenamiento,
    //pues JS trata esto como String o Mixto, mas no Integer
    numbers.sort(function (a, b) {
        return a - b
    });

    $.each(numbers, function (index, value) {
        var separator = numbers_last_index == index ? '.' : ',';
        var $wrapper = $('#result-wrapper');
        if (index == 0) $wrapper.append('<h5>Ordenado</h5>');
        $wrapper.append('<b>' + value + separator + '</b>');
    });
}