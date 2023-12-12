/**
 * Comprueba que la fecha sea superior al día de hoy
 * @param {*} date fecha
 * @returns ¿Fecha superior al día de hoy?
 */
function isValidDateAfterToday(date) {
    const currentDate = new Date();
    const checkDate = new Date(date);
    if (isNaN(checkDate.getTime())) {
        return false;
    }
    currentDate.setDate(currentDate.getDate() + 1);
    currentDate.setHours(0, 0, 0, 0);
    return checkDate > currentDate;
}

/**
 * Comprueba que la fecha sea inferior al día de hoy
 * @param {*} date fecha
 * @returns ¿Fecha inferior al día de hoy?
 */
function isValidDateBeforeToday(date) {
    const currentDate = new Date();
    const checkDate = new Date(date);
    if (isNaN(checkDate.getTime())) {
        return false;
    }
    return checkDate < currentDate;
}

/**
 * Comprueba que el formato sea del formato tipo fecha de España válido
 * formato: (dd/mm/aaaa)
 * Primero comprueba que el patrón sea el adecuado. Después se extrae el día, el mes y el año y se comprueba que sean válidos
 * @param {*} date fecha 
 * @returns ¿fecha española válida?
 */
function isValidSpainDateFormat(date) {
    if (!date.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
        return false;
    }
    let [day, month, year] = date.split('/').map(Number);
    let isValidDate = (year > 0 && month > 0 && month <= 12 && day > 0 && day <= new Date(year, month, 0).getDate());
    return isValidDate;
}

/**
 * Comprueba que sea un teléfono válido
 * @param {*} data datos a comprobar
 * @returns ¿Teléfono válido?
 */
function isValidPhone(data) {
    return data.match(/^(34|0034)?[6789]\d{8}$/) || data === '';
}

/**
 * Validación de correo válido y que no sea superior a 100 caracteres
 * @param {*} email email
 * @returns ¿Correo válido?
 */
function isValidMail(email) {
    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (regex.test(email) && email.length <= 100) {
        return true;
    } else {
        return false;
    }
}

/**
 * Maneja la validación de la contraseña y edita el mensaje de error según el tipo de error de validación
 * @param {*} password contraseña
 * @param {*} errorNameId nombre de la ID del elemento que se va a modificar para cambiar el nombre del error
 * @returns ¿contraseña válida?
 */
function isValidPassword(password, errorMsgNameId) {
    let passwordError = document.getElementById(errorMsgNameId);
    let isValid = true;

    if (password.length < 8) {
        passwordError.innerHTML = 'La contraseña debe tener al menos 8 caracteres.';
        isValid = false;
    }

    if (!password.match(/[A-Z]/)) {
        passwordError.innerHTML = 'La contraseña debe contener al menos una letra mayúscula.';
        isValid = false;
    }

    if (!password.match(/[a-z]/)) {
        passwordError.innerHTML = 'La contraseña debe contener al menos una letra minúscula.';
        isValid = false;
    }

    if (!password.match(/\d/)) {
        passwordError.innerHTML = 'La contraseña debe contener al menos un número.';
        isValid = false;
    }

    return isValid;
}

/**
 * Valida el código postal
 * @param {*} element elemento
 * @returns ¿es válido?
 */
function validateZipCode(element) {
    if (!element.value.match(/^\d{5}$/)) {
        return false;
    }
    document.getElementById('province').value = provinceReturnSpain(element);
    if (document.getElementById('province').value == "-") {
        return false;
    }
    return true;
}

/**
 * Comprueba si es un DNI válido
 * @param {*} dni DNI
 * @returns ¿DNI válido?
 */
function isValidDNI(dni) {
    if (!dni.match(/^\d{8}[A-HJ-NP-TV-Z]$/)) {
        return false;
    }
    let validLetters = 'TRWAGMYFPDXBNJZSQVHLCKE';
    let num = parseInt(dni.substr(0, 8), 10);
    let letter = dni.charAt(8).toUpperCase();
    let validLetter = validLetters.charAt(num % 23);
    return letter === validLetter;
}

/**
 * Comprueba si un IBAN es válido
 * @param {*} iban IBAN a validar
 * @returns ¿IBAN válido?
 */
function isValidIBAN(iban){
    return /[a-zA-Z]{2}[0-9]{20}$/g.test(iban);
}