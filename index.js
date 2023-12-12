/**
 * Abre el Modal con los datos al darle al botón Submit
 */
$('#modalForm').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
})

/**
 * Evento submit que valida el formulario
 */
document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault();
    validateForm();
});

/**
 * Abre el Date Picker
 */
function showDatePicker() {
    const datePickerContainer = document.getElementById("datepicker-container");
    datePickerContainer.style.display = "block";
}

/**
 * Cierra el Date Picker
 */
function hideDatePicker() {
    const datePickerContainer = document.getElementById("datepicker-container");
    datePickerContainer.style.display = "none";
}

/**
 * Resetea el formulario
 */
function resetForm() {
    document.getElementById("form").reset();
}

/**
 * Valida un campo
 * @param {*} fieldId Id del campo 
 * @param {*} errorId Id del error
 * @param {*} errorCondition Condición de error
 * @returns ¿Validado?
 */
function validateField(fieldId, errorId, errorCondition) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);

    if (field.disabled) {
        errorCondition = false;
    }

    if (errorCondition) {
        error.style.display = "block";
        field.classList.add("error-input");
        field.classList.add("is-invalid");
        field.classList.remove("is-valid");
        return false;
    } else {
        error.style.display = "none";
        field.classList.remove("error-input");
        field.classList.remove("is-invalid");
        field.classList.add("is-valid");
        return true;
    }
}

/**
 * Comprueba que al menos un checkbox está seleccionado
 * @param {*} container contenedor en el que se va a realizar la comprobación
 * @returns ¿Hay al menos un checkbox seleccionado?
 */
function checkboxIsAlmostOneSelected(container) {
    for (let i = 0; i < container.options.length; i++) {
        if (container.options[i].selected) {
            return true;
        }
    }
    return false;
}

/**
 * Dado un código postal español, retorna la provincia
 * @param {*} cp Código Postal
 * @returns nombre de la provincia
 */
function provinceReturnSpain(cp) {
    let cp_provinces = {
        1: "\u00C1lava", 2: "Albacete", 3: "Alicante", 4: "Almer\u00EDa", 5: "\u00C1vila",
        6: "Badajoz", 7: "Baleares", 8: "Barcelona", 9: "Burgos", 10: "C\u00E1ceres",
        11: "C\u00E1diz", 12: "Castell\u00F3n", 13: "Ciudad Real", 14: "C\u00F3rdoba", 15: "A Coruña",
        16: "Cuenca", 17: "Girona", 18: "Granada", 19: "Guadalajara", 20: "Gipuzkoa",
        21: "Huelva", 22: "Huesca", 23: "Ja\u00E9n", 24: "Le\u00F3n", 25: "Lleida",
        26: "La Rioja", 27: "Lugo", 28: "Madrid", 29: "M\u00E1laga", 30: "Murcia",
        31: "Navarra", 32: "Ourense", 33: "Asturias", 34: "Palencia", 35: "Las Palmas",
        36: "Pontevedra", 37: "Salamanca", 38: "Santa Cruz de Tenerife", 39: "Cantabria", 40: "Segovia",
        41: "Sevilla", 42: "Soria", 43: "Tarragona", 44: "Teruel", 45: "Toledo",
        46: "Valencia", 47: "Valladolid", 48: "Bizkaia", 49: "Zamora", 50: "Zaragoza",
        51: "Ceuta", 52: "Melilla"
    };

    let firstTwoDigits = cp.value.substring(0, 2);
    let provinceName = cp_provinces[firstTwoDigits];

    return provinceName || "-";
}

/**
 * Función que se ejecuta al cambiar el input
 * @param {*} fieldId Id del campo
 * @param {*} errorId Id del error
 */
function inputOnChange(fieldId, errorId) {
    if (document.getElementById(errorId).style.display != 'none') {
        validateFieldByType(fieldId, errorId);
    }
}

/**
 * Abre el Modal de Bootstrap con los campos rellenados del formulario en el caso de que el formulario sea válido
 * @param {*} isValid ¿Formulario válido?
 * @param {*} formData Datos del formulario en formato String
 */
function openModalWithFormData(isValid, formData) {
    let modalMessage = '';
    if (isValid) {
        modalMessage = '<p>Formulario válido. ¡Enviado con éxito!</p><p>' + formData + '</p>';
    } else {
        modalMessage = 'Datos inválidos. Por favor, corrige los errores.';
    }
    document.getElementById('modal-message').innerHTML = modalMessage;
    $('#modalForm').modal('show'); // Abre el modal
}

/**
 * Obtiene todos los ID de un grupo de Radio Button y los retorna
 * @param {*} containerId ID del contenedor del grupo de radio buttons
 * @returns Todos los ID de los Radio Button del grupo
 */
function getIdsByRadioButtonGroupContainer(containerId) {
    let container = document.getElementById(containerId);
    let formCheckElements = container.querySelectorAll('.form-check');
    let ids = [];
    formCheckElements.forEach(function (formCheck) {
        let inputInsideFormCheck = formCheck.querySelector('input');
        if (inputInsideFormCheck) {
            ids.push(inputInsideFormCheck.id);
        }
    });
    return ids;
}

/**
 * Parsea un String de fecha en formato española (dd/mm/aaaa) a Date
 * @param {*} date fecha en formato (dd/mm/aaaa)
 * @returns Date
 */
function parseSpainDateStrToDate(date) {
    let [day, month, year] = date.split('/').map(Number);
    return new Date(year, month - 1, day);
}

/**
 * Comprueba si hay un archivo subido y la extensión está entre las permitidas
 * @param {*} inputFile archivo subido
 * @param {*} allowedExtensions array de las extensiones permitidas
 * @returns ¿Archivo subido?
 */
function isFileUploadedAndValid(inputFile, allowedExtensions) {
    if (inputFile.files.length > 0) {
        let fileExtension = inputFile.files[0].name.split('.').pop().toLowerCase();
        return allowedExtensions.includes(fileExtension);
    } else {
        return false;
    }
}
/**
 * Comprueba si el elemento select tiene seleccionado el valor none
 * @param {*} element elemento
 * @returns ¿none seleccionado?
 */
function selectIsNotSelectedNone(element) {
    return element.options[element.selectedIndex].value !== "none";
}

/**
 * Calcula el peso volumétrico dado el alto, ancho y longitud
 * @param {*} volumeFactor factor de volumen
 */
function calculateVolumetricWeight(volumeFactor) {
    let height = document.getElementById("heightAmount").value;
    let width = document.getElementById("widthAmount").value;
    let length = document.getElementById("lengthAmount").value;
    let volumetricWeight = (length * width * height) / volumeFactor;
    document.getElementById("volumetricWeight").value = volumetricWeight.toFixed(2);
}

/**
 * Habilitar/Deshabilitar el check de reembolso
 * Esto habilitará las opciones de reembolso en el formulario
 */
function refundCheck() {
    let checkRefund = document.getElementById("checkRefund");
    let refundAmount = document.getElementById("refundAmount");
    let accountNumIban = document.getElementById("accountNumIban");
    let errorAccountNumIban = document.getElementById("error-accountNumIban");

    refundAmount.disabled = !checkRefund.checked;
    errorAccountNumIban.disabled = !checkRefund.checked;
    accountNumIban.disabled = !checkRefund.checked;
}

/**
 * Validación por tipo
 * @param {*} fieldId ID del campo
 * @param {*} errorId ID del error
 * @returns ¿validado?
 */
function validateFieldByType(fieldId, errorId) {
    const element = document.getElementById(fieldId);
    switch (fieldId) {
        // validación de campos
        case 'username':
            return validateField(fieldId, errorId, element.value.length < 3);
        case 'password':
            return validateField(fieldId, errorId, !isValidPassword(element.value, "error-" + fieldId));
        case 'confirm-password':
            return validateField(fieldId, errorId, element.value !== document.getElementById('password').value);
        case 'name':
            return validateField(fieldId, errorId, element.value.length < 2 || element.value.length > 100);
        case 'surname':
            return validateField(fieldId, errorId, element.value.length < 2 || element.value.length > 80);
        case 'currentSituation':
            return validateField(fieldId, errorId, !selectIsNotSelectedNone(element));
        case 'comments':
            return validateField(fieldId, errorId, element.value.length > 250 || element.value.length < 1);
        case 'email':
            return validateField(fieldId, errorId, !isValidMail(element.value));
        case 'phone':
            return validateField(fieldId, errorId, !isValidPhone(element.value));
        case 'zipcode':
            return validateField(fieldId, errorId, !validateZipCode(element));
        case 'dni':
            return validateField(fieldId, errorId, !isValidDNI(element.value));
        case 'uploadDNI':
            return validateField(fieldId, errorId, !isFileUploadedAndValid(element, ['jpg', 'jpeg', 'png']));
        case 'future_date':
            return validateField(fieldId, errorId, !isValidDateAfterToday(element.value));
        case 'dob':
            return validateField(fieldId, errorId, !isValidDateBeforeToday(parseSpainDateStrToDate(element.value)) || !isValidSpainDateFormat(element.value));
        case 'glassType':
            return validateField(fieldId, errorId, getIdsByRadioButtonGroupContainer(fieldId).every(function (option) { return !document.getElementById(option).checked; }));
        case 'interestsContainer':
            return validateField(fieldId, errorId, !checkboxIsAlmostOneSelected(element));    
        case 'accountNumIban':
            return validateField(fieldId, errorId, !isValidIBAN(element.value));
        case 'acceptTerms':
            return validateField(fieldId, errorId, !element.checked);
        default:
            return true;
    }
}

/**
 * Valida el formulario
 * @returns Validación
 */
function validateForm() {
    const fields = [
        'username',
        'password',
        'confirm-password',
        'name',
        'surname',
        'currentSituation',
        'comments',
        'email',
        'phone',
        'zipcode',
        'dob',
        'future_date',
        'dni',
        'uploadDNI',
        'glassType',
        'interestsContainer',
        'accountNumIban',
        'acceptTerms'
    ];

    let isValid = true;
    let formData = " | Datos: ";

    fields.forEach(fieldId => {
        isValid = validateFieldByType(fieldId, `error-${fieldId}`) && isValid;
        if (isValid) {
            switch (fieldId) {
                case 'glassType':
                    formData = formData + '  || Tipo de visión: ';
                    if (document.getElementById('glasses').checked) {
                        formData = formData + 'gafas';
                    } else if (document.getElementById('lenses').checked) {
                        formData = formData + 'lentes';
                    }
                    break;
                case 'interestsContainer':
                    let opts = document.getElementById(fieldId).selectedOptions;
                    formData = formData + '  ||  Intereses: [';
                    for (let i = 0; i < opts.length; i++) {
                        if (opts[i].value) {
                            formData = formData + ' ' + opts[i].value + ' ';
                        }
                    }
                    formData = formData + ']';
                    break;
                default:
                    formData = formData + '  ||  ' + fieldId + ': ' + document.getElementById(fieldId).value;
            }
        }
    });

    let province = document.getElementById('province').value;

    if (province) {
        formData += '  ||  Provincia: ' + province;
    }

    openModalWithFormData(isValid, formData);
    return isValid;
}