const btnadd = document.getElementById("btnadd");
btnadd.addEventListener("click", () => {
    let nombre = document.getElementById('nombre').value;
    let telefono = document.getElementById('telefono').value;
    let email = document.getElementById('email').value;
    let edad = document.getElementById('edad').value;
    let activo = document.getElementById('activo').value;
    let depende = parseInt(document.getElementById('dependiente').value);
    let dependientes = []
    for (let i = 1; i <= depende; i++) {
        let nomde = document.getElementById('nombre' + i).value;
        let edadde = document.getElementById('edad' + i).value;
        dependientes.push({ nombre: nomde, edad: edadde })
    }
    let resultado = {
        nombre: nombre,
        telefono: telefono,
        email: email,
        edad: edad,
        activo: activo,
        depende: dependientes
    }
    console.log(resultado);
    fetch('http://localhost:3000/api/contactos/', {
            method: 'POST',
            body: JSON.stringify(resultado),
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(resultado => {
            console.log(resultado);
        })
})

const btnDep = document.getElementById('depende');
btnDep.addEventListener('click', () => {
    let input = document.getElementById("divdependes");
    let dependiente = parseInt(document.getElementById("dependiente").value); //4
    let datos = '';
    for (let contador = 1; contador <= dependiente; contador++) {
        datos += `
        <div id="dep${contador}">
        <input type="text" id="nombre${contador}" name="nombre" placeholder="nombre"><input type="number" id="edad${contador}" name="edad" placeholder="edad"><br>
        </div>
        `;
    }
    input.innerHTML = datos;
});