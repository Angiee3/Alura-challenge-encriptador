function validarTexto() {
    const texto = document.getElementById('inputTexto').value.trim();
    const errores = [];

    // Expresiones regulares
    const regex = {
        contieneMayusculas: /[A-Z]/,  // Detecta cualquier letra mayúscula
        contieneNumeros: /\d/,        // Detecta cualquier dígito
        contieneCaracteresEspeciales: /[!@#$%^&*()_+={}\[\]|\\:;'"<>,.?/~`]/,  // Detecta caracteres especiales
        contieneTildes: /[áéíóúÁÉÍÓÚüÜñÑ]/  // Detecta caracteres con tildes y acentos
    };

    if (texto === "") {
        alert("El campo no puede estar vacío.");
        return false;
    }
    // Validar el texto contra todas las condiciones
    for (const clave in regex) {
        switch (true) {
            case regex[clave].test(texto):
                switch (clave) {
                    case 'contieneMayusculas':
                        errores.push("Recuerda que no puede contener mayúsculas.");
                        break;
                    case 'contieneNumeros':
                        errores.push("Recuerda que no puede contener números.");
                        break;
                    case 'contieneCaracteresEspeciales':
                        errores.push("Recuerda que no puede tener caracteres especiales.");
                        break;
                    case 'contieneTildes':
                        errores.push("Recuerda que no puede contener caracteres con tilde.");
                        break;
                }
                break;
        }
    }

    const mensajeElement = document.getElementById('mensaje');
    if (errores.length > 0) {
        mensajeElement.innerHTML = errores.join("<br>"); // Usar <br> para saltos de línea
        return false;
    } else {
        mensajeElement.innerHTML = "El texto es válido.";
        return true;
    }

}

function encriptarTexto() {
    if (!validarTexto()) return; // Verificar validez del texto

    const texto = document.getElementById('inputTexto').value;
    // Reemplazar las vocales usando una sola función de reemplazo
    const resultado = texto
        .replace(/a/g, 'ai')
        .replace(/e/g, 'enter')
        .replace(/i/g, 'imes')
        .replace(/o/g, 'ober')
        .replace(/u/g, 'ufat');

    // Mostrar el resultado en el div
    document.getElementById('mensaje').innerHTML = `Texto encriptado: <br>${resultado}`;
}

function desencriptarTexto() {
    if (!validarTexto()) return; // Verificar validez del texto

    const texto = document.getElementById('inputTexto').value;
    // Reemplazar las secuencias en orden inverso para desencriptar
    const resultado = texto
        .replace(/ufat/g, 'u')
        .replace(/ober/g, 'o')
        .replace(/imes/g, 'i')
        .replace(/enter/g, 'e')
        .replace(/ai/g, 'a');

    // Mostrar el resultado en el div
    document.getElementById('mensaje').innerHTML = `Texto desencriptado: <br>${resultado}`;
}

function borrarTexto() {
    document.getElementById('inputTexto').value = '';
    document.getElementById('mensaje').textContent = '';
}

function copiarTexto() {
    const mensajeElement = document.getElementById('mensaje');
    const textoParaCopiar = mensajeElement.innerText || mensajeElement.textContent;

    if (textoParaCopiar.trim() === "" || textoParaCopiar === "El campo no puede estar vacío.") {
        alert("No hay texto para copiar.");
        return;
    }

    // Usar la API de portapapeles para copiar el texto
    navigator.clipboard.writeText(textoParaCopiar)
        .then(() => {
            alert("Texto copiado al portapapeles.");
        })
        .catch(err => {
            alert("Error al copiar al portapapeles: " + err);
        });
}