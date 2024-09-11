// ---------------------------- agregar ----------------------------------

export function formAgregarOdontologo(){
    document.querySelector('main').innerHTML = `
        <div class="card">
            <h1>Agregar Odontólogo</h1>
            <form id="agregar-odontologo-form">
                <div>
                    <label for="apellido">Apellido:</label>
                    <input type="text" id="apellido" name="apellido" required pattern="[A-Za-zÁÉÍÓÚáéíóúñÑ\\s]+">
                    <small>Solo se permiten letras y espacios.</small>
                </div>
                <div>
                    <label for="nombre">Nombre:</label>
                    <input type="text" id="nombre" name="nombre" required pattern="[A-Za-zÁÉÍÓÚáéíóúñÑ\\s]+">
                    <small>Solo se permiten letras y espacios.</small>
                </div>
                <div>
                    <label for="matricula">Matrícula:</label>
                    <input type="text" id="matricula" name="matricula" required>
                </div>
                <div>
                    <button type="submit">Agregar</button>
                </div>
            </form>
            <div id="response" style="display:none; margin-top:10px"></div>
        </div>
    `;
}


export function logicaAgregarOdontologo(){
    document.getElementById('agregar-odontologo').addEventListener('click', function () {
            formAgregarOdontologo();

            document.getElementById("agregar-odontologo-form").onsubmit = function (e) {
                e.preventDefault();
                agregarOdontologo();
            };

            function agregarOdontologo() {
                const formData = {
                    nombre: document.querySelector('#nombre').value,
                    apellido: document.querySelector('#apellido').value,
                    matricula: document.querySelector('#matricula').value,
                };

                const url = '/odontologos';
                const settings = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                }

                fetch(url, settings)
                        .then(response => response.json())
                        .then(data => {
                            let successAlert = '<div class="alert alert-success alert-dismissible" style="background:rgba(0, 255, 0, 0.2);padding:.5em 1em;color: green; margin: .5em 0; padding: 10px; border-radius: 5px;">' +
                                    '<p>Odontólogo agregado</p></div>';

                            document.querySelector('#response').innerHTML = successAlert;
                            document.querySelector('#response').style.display = "block";
                            resetUploadForm();

                            setTimeout(() => {
                                document.querySelector('#response').style.display = "none";
                            }, 4000);
                        })
                        .catch(error => {
                            let errorAlert = '<div class="alert alert-danger alert-dismissible" style="background:rgba(255, 0, 0, 0.2);padding:.5em 1em;color: red;margin: .5em 0; padding: 10px; border-radius: 5px;">' +
                                '<p>Error, intente nuevamente</p></div>';

                            document.querySelector('#response').innerHTML = errorAlert;
                            document.querySelector('#response').style.display = "block";
                            resetUploadForm();

                            setTimeout(() => {
                                document.querySelector('#response').style.display = "none";
                            }, 4000);
                        });
            }

            function resetUploadForm() {
                document.querySelector('#nombre').value = "";
                document.querySelector('#apellido').value = "";
                document.querySelector('#matricula').value = "";
            }
        });
    }

// ---------------------------- eliminar ----------------------------------

export function formEliminarOdontologo() {
    document.querySelector('main').innerHTML = `
        <div class="card">
            <h1>Eliminar Odontólogo</h1>
            <form id="eliminar-odontologo-form">
                <div>
                    <label for="id">ID:</label>
                    <input type="text" id="id" name="id" required>
                </div>
                <div>
                    <button type="submit">Eliminar</button>
                </div>
            </form>
            <div id="response" style="display:none; margin-top:10px"></div>
        </div>
    `;
}

export function logicaEliminarOdontologo() {

    const eliminarButton = document.getElementById('eliminar-odontologo');
    if (eliminarButton) {
        eliminarButton.addEventListener('click', function () {
            formEliminarOdontologo();

            document.getElementById("eliminar-odontologo-form").onsubmit = function (e) {
                e.preventDefault();
                eliminarOdontologo();
            };

            function eliminarOdontologo() {
                const id = document.querySelector('#id').value;

                // Verifica que el id no esté vacío
                if (!id) {
                    console.error('ID is required');
                    return;
                }

                const url = `/odontologos/${id}`;
                const settings = {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                };

                fetch(url, settings)
                    .then(response => {
                        if (response.ok) {
                            let successAlert = '<div class="alert alert-success alert-dismissible" style="background:rgba(0, 255, 0, 0.2);padding:.5em 1em;color: green; margin: .5em 0; padding: 10px; border-radius: 5px;">' +
                                '<p>Odontólogo eliminado exitosamente</p></div>';

                            document.querySelector('#response').innerHTML = successAlert;
                            document.querySelector('#response').style.display = "block";
                            resetEliminarForm();

                            setTimeout(() => {
                                document.querySelector('#response').style.display = "none";
                            }, 4000);
                        } else {
                            throw new Error('Error en la eliminación');
                        }
                    })
                    .catch(error => {
                        let errorAlert = '<div class="alert alert-danger alert-dismissible" style="background:rgba(255, 0, 0, 0.2);padding:.5em 1em;color: red;margin: .5em 0; padding: 10px; border-radius: 5px;">' +
                            '<p>Error al eliminar, intente nuevamente</p></div>';

                        document.querySelector('#response').innerHTML = errorAlert;
                        document.querySelector('#response').style.display = "block";
                        resetEliminarForm();

                        setTimeout(() => {
                            document.querySelector('#response').style.display = "none";
                        }, 4000);
                    });
            }

            function resetEliminarForm() {
                document.querySelector('#id').value = "";
            }
        });
    } else {
        console.error('Element with id "eliminar-odontologo" not found');
    }
}


//-----------------------------------Modificar----------------------------------------------------------------

export function formModificarOdontologo() {
    document.querySelector('main').innerHTML = `
        <div class="card">
            <h1>Modificar Odontólogo</h1>
            <form id="modificar-odontologo-form">
                <div>
                    <label for="id">ID:</label>
                    <input type="text" id="id" name="id">
                </div>
                <div id="datos-odontologo" style="display:none;">
                    <div>
                        <label for="nombre">Nombre:</label>
                        <input type="text" id="nombre" name="nombre" pattern="[A-Za-zÁÉÍÓÚáéíóúñÑ\\s]+">
                        <small>Solo se permiten letras y espacios.</small>
                    </div>
                    <div>
                        <label for="apellido">Apellido:</label>
                        <input type="text" id="apellido" name="apellido" pattern="[A-Za-zÁÉÍÓÚáéíóúñÑ\\s]+">
                        <small>Solo se permiten letras y espacios.</small>
                    </div>
                    <div>
                        <label for="matricula">Matrícula:</label>
                        <input type="text" id="matricula" name="matricula">
                    </div>
                </div>
                <div>
                    <button type="submit">Modificar</button>
                </div>
            </form>
            <div id="response" style="display:none; margin-top:10px"></div>
        </div>
    `;
}


export function logicaModificarOdontologo() {
    document.getElementById('modificar-odontologo').addEventListener('click', function () {
        formModificarOdontologo();

        document.getElementById("modificar-odontologo-form").onsubmit = function (e) {
            e.preventDefault();
            const id = document.querySelector('#id').value.trim();

            if (!document.querySelector('#datos-odontologo').style.display || document.querySelector('#datos-odontologo').style.display === 'none') {
                buscarOdontologo(id);
            } else {
                modificarOdontologo(id);
            }
        };

        function buscarOdontologo(id) {
            if (!id) {
                console.error('ID is required');
                return;
            }

            const url = `/odontologos/${id}`;
            const settings = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            };

            fetch(url, settings)
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        document.querySelector('#nombre').value = data.nombre || "";
                        document.querySelector('#apellido').value = data.apellido || "";
                        document.querySelector('#matricula').value = data.matricula || "";

                        // Hacer el campo id solo lectura
                        document.querySelector('#id').setAttribute('readonly', true);

                        document.querySelector('#datos-odontologo').style.display = 'block';
                    } else {
                        throw new Error('Odontólogo no encontrado');
                    }
                })
                .catch(error => {
                    mostrarError('Error al buscar odontólogo, intente nuevamente');
                });
        }

        function modificarOdontologo(id) {
            const formData = {};

            const nombre = document.querySelector('#nombre').value.trim();
            const apellido = document.querySelector('#apellido').value.trim();
            const matricula = document.querySelector('#matricula').value.trim();

            if (nombre) formData.nombre = nombre;
            if (apellido) formData.apellido = apellido;
            if (matricula) formData.matricula = matricula;
             if (!nombre || !apellido || !matricula) {
                            mostrarError('Todos los campos son requeridos');
                            return;
                        }

            if (Object.keys(formData).length === 0) {
                mostrarError('No hay cambios para modificar');
                return;
            }

            const url = `/odontologos/${id}`;
            const settings = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            };

            fetch(url, settings)
                .then(response => {
                    if (!response.ok) {
                        return response.json().then(data => {
                            throw new Error(data.message || 'Error desconocido');
                        });
                    }
                    return response.json();
                })
                .then(data => {
                    mostrarExito('Odontólogo modificado con éxito');
                    resetModifyForm();
                })
                .catch(error => {
                    mostrarError(`Error al modificar: ${error.message}`);
                    resetModifyForm();
                });
        }

        function resetModifyForm() {
            document.querySelector('#id').value = "";
            document.querySelector('#nombre').value = "";
            document.querySelector('#apellido').value = "";
            document.querySelector('#matricula').value = "";
            document.querySelector('#datos-odontologo').style.display = 'none';

            document.querySelector('#id').removeAttribute('readonly');
        }

        function mostrarError(mensaje) {
            document.querySelector('#response').innerHTML = `<div class="alert alert-danger alert-dismissible" style="background:rgba(255, 0, 0, 0.2);padding:.5em 1em;color: red;margin: .5em 0; border-radius: 5px;">
                <p>${mensaje}</p></div>`;
            document.querySelector('#response').style.display = "block";
            setTimeout(() => {
                document.querySelector('#response').style.display = "none";
            }, 4000);
        }

        function mostrarExito(mensaje) {
            document.querySelector('#response').innerHTML = `<div class="alert alert-success alert-dismissible" style="background:rgba(0, 255, 0, 0.2);padding:.5em 1em;color: green; margin: .5em 0; padding: 10px; border-radius: 5px;">
                <p>${mensaje}</p></div>`;
            document.querySelector('#response').style.display = "block";
            setTimeout(() => {
                document.querySelector('#response').style.display = "none";
            }, 4000);
        }
    });
}



//-------------------------------------------------Listar------------------------------------------------------------------------

export function formListarOdontologos() {
    document.querySelector('main').innerHTML = `
        <div class="card">
            <h1>Listado de Odontólogos</h1>
            <div id="lista-odontologos"></div>
            <div id="response" style="display:none; margin-top:10px"></div>
        </div>
    `;
}

export function logicaListarOdontologos() {
    document.getElementById('listar-odontologos').addEventListener('click', function () {
        formListarOdontologos();
        listarOdontologos();
    });

    function listarOdontologos() {
        const url = '/odontologos';
        const settings = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        };

        fetch(url, settings)
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                    let odontologosHTML = '<ul>';

                    data.forEach(odontologo => {
                        odontologosHTML += `
                            <li>
                                <strong>ID:</strong> ${odontologo.id} <br>
                                <strong>Nombre:</strong> ${odontologo.nombre} <br>
                                <strong>Apellido:</strong> ${odontologo.apellido} <br>
                                <strong>Matrícula:</strong> ${odontologo.matricula}
                            </li><hr>`;
                    });

                    odontologosHTML += '</ul>';
                    document.querySelector('#lista-odontologos').innerHTML = odontologosHTML;
                } else {
                    document.querySelector('#lista-odontologos').innerHTML = '<p>No hay odontólogos registrados</p>';
                }
            })
            .catch(error => {
                let errorAlert = '<div class="alert alert-danger alert-dismissible" style="background:rgba(255, 0, 0, 0.2);padding:.5em 1em;color: red;margin: .5em 0; padding: 10px; border-radius: 5px;">' +
                    '<p>Error al listar, intente nuevamente</p></div>';

                document.querySelector('#response').innerHTML = errorAlert;
                document.querySelector('#response').style.display = "block";

                setTimeout(() => {
                    document.querySelector('#response').style.display = "none";
                }, 4000);
            });
    }
}
