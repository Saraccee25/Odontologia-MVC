// ---------------------------- agregar ----------------------------------

export function formAgregarPaciente() {
    document.querySelector('main').innerHTML = `
        <div class="card">
            <h1>Agregar Paciente</h1>
            <form id="agregar-paciente-form">
                <div>
                    <label for="nombre">Nombre:</label>
                    <input type="text" id="nombre" name="nombre" required pattern="[A-Za-zÁÉÍÓÚáéíóúñÑ\\s]+">
                    <small>Solo se permiten letras y espacios.</small>
                </div>
                <div>
                    <label for="apellido">Apellido:</label>
                    <input type="text" id="apellido" name="apellido" required pattern="[A-Za-zÁÉÍÓÚáéíóúñÑ\\s]+">
                    <small>Solo se permiten letras y espacios.</small>
                </div>
                <div>
                    <label for="dni">DNI:</label>
                    <input type="text" id="dni" name="dni" required pattern="\\d+">
                    <small>Solo se permiten números.</small>
                </div>
                <div>
                    <label for="domicilio">Domicilio:</label>
                </div>
                <fieldset>
                    <div>
                        <label for="calle">Calle:</label>
                        <input type="text" id="calle" name="calle" required>
                    </div>
                    <div>
                        <label for="numero">Número:</label>
                        <input type="number" id="numero" name="numero" required>
                    </div>
                    <div>
                        <label for="localidad">Localidad:</label>
                        <input type="text" id="localidad" name="localidad" required pattern="[A-Za-zÁÉÍÓÚáéíóúñÑ\\s]+">
                        <small>Solo se permiten letras y espacios.</small>
                    </div>
                    <div>
                        <label for="provincia">Provincia:</label>
                        <input type="text" id="provincia" name="provincia" required pattern="[A-Za-zÁÉÍÓÚáéíóúñÑ\\s]+">
                        <small>Solo se permiten letras y espacios.</small>
                    </div>
                </fieldset>
                <div>
                    <label for="fecha-alta">Fecha de Alta:</label>
                    <input type="date" id="fecha-alta" name="fecha-alta" required>
                </div>
                <div>
                    <button type="submit">Agregar</button>
                </div>
            </form>
            <div id="response" style="display:none; margin-top:10px"></div>
        </div>
    `;
}



export function logicaAgregarPaciente() {
    document.getElementById('agregar-paciente').addEventListener('click', function () {
        formAgregarPaciente();

        document.getElementById("agregar-paciente-form").onsubmit = function (e) {
            e.preventDefault();
            agregarPaciente();
        };

        function agregarPaciente() {
            const formData = {
                nombre: document.querySelector('#nombre').value,
                apellido: document.querySelector('#apellido').value,
                dni: document.querySelector('#dni').value,
                fechaAlta: document.querySelector('#fecha-alta').value,
                domicilio: {
                    calle: document.querySelector('#calle').value,
                    numero: document.querySelector('#numero').value,
                    localidad: document.querySelector('#localidad').value,
                    provincia: document.querySelector('#provincia').value,
                }
            };

            const url = '/pacientes';
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
                        '<p>Paciente agregado exitosamente</p></div>';

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
            document.querySelector('#dni').value = "";
            document.querySelector('#fecha-alta').value = "";
            document.querySelector('#calle').value = "";
            document.querySelector('#numero').value = "";
            document.querySelector('#localidad').value = "";
            document.querySelector('#provincia').value = "";
        }
    });
}

// ---------------------------- eliminar ----------------------------------

export function formEliminarPaciente() {
    document.querySelector('main').innerHTML = `
        <div class="card">
            <h1>Eliminar Paciente</h1>
            <form id="eliminar-paciente-form">
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

export function logicaEliminarPaciente() {
    const eliminarButton = document.getElementById('eliminar-paciente');
    if (eliminarButton) {
        eliminarButton.addEventListener('click', function () {
            formEliminarPaciente();

            document.getElementById("eliminar-paciente-form").onsubmit = function (e) {
                e.preventDefault();
                eliminarPaciente();
            };

            function eliminarPaciente() {
                const id = document.querySelector('#id').value;

                // Verifica que el id no esté vacío
                if (!id) {
                    console.error('ID is required');
                    return;
                }

                const url = `/pacientes/${id}`;
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
                                '<p>Paciente eliminado exitosamente</p></div>';

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
        console.error('Element with id "eliminar-paciente" not found');
    }
}

//----------------------------------------Modificar-------------------------------------------------------------------------------------
export function formModificarPaciente() {
    document.querySelector('main').innerHTML = `
        <div class="card">
            <h1>Modificar Paciente</h1>
            <form id="modificar-paciente-form">
                <div>
                    <label for="id">ID:</label>
                    <input type="text" id="id" name="id" required>
                </div>
                <div id="datos-paciente" style="display:none;">
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
                        <label for="dni">DNI:</label>
                        <input type="text" id="dni" name="dni" pattern="\\d+" required>
                        <small>Solo se permiten números.</small>
                    </div>
                    <fieldset>
                        <legend>Domicilio:</legend>
                        <div>
                            <label for="calle">Calle:</label>
                            <input type="text" id="calle" name="calle">
                        </div>
                        <div>
                            <label for="numero">Número:</label>
                            <input type="number" id="numero" name="numero">
                        </div>
                        <div>
                            <label for="localidad">Localidad:</label>
                            <input type="text" id="localidad" name="localidad" pattern="[A-Za-zÁÉÍÓÚáéíóúñÑ\\s]+">
                            <small>Solo se permiten letras y espacios.</small>
                        </div>
                        <div>
                            <label for="provincia">Provincia:</label>
                            <input type="text" id="provincia" name="provincia" pattern="[A-Za-zÁÉÍÓÚáéíóúñÑ\\s]+">
                            <small>Solo se permiten letras y espacios.</small>
                        </div>
                    </fieldset>
                    <div>
                        <label for="fecha-alta">Fecha de Alta:</label>
                        <input type="date" id="fecha-alta" name="fecha-alta">
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



export function logicaModificarPaciente() {
    document.getElementById('modificar-paciente').addEventListener('click', function () {
        formModificarPaciente();

        document.getElementById("modificar-paciente-form").onsubmit = function (e) {
            e.preventDefault();
            const id = document.querySelector('#id').value.trim();

            if (!document.querySelector('#datos-paciente').style.display || document.querySelector('#datos-paciente').style.display === 'none') {
                buscarPaciente(id);
            } else {
                modificarPaciente(id);
            }
        };

        function buscarPaciente(id) {
            if (!id) {
                mostrarError('ID es requerido');
                return;
            }

            const url = `/pacientes/${id}`;
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
                        document.querySelector('#dni').value = data.dni || "";
                        document.querySelector('#calle').value = data.domicilio.calle || "";
                        document.querySelector('#numero').value = data.domicilio.numero || "";
                        document.querySelector('#localidad').value = data.domicilio.localidad || "";
                        document.querySelector('#provincia').value = data.domicilio.provincia || "";
                        document.querySelector('#fecha-alta').value = data.fechaAlta || "";

                        document.querySelector('#id').setAttribute('readonly', true);

                        document.querySelector('#datos-paciente').style.display = 'block';
                    } else {
                        throw new Error('Paciente no encontrado');
                    }
                })
                .catch(error => {
                    mostrarError('Error al buscar paciente, intente nuevamente');
                });
        }

        function modificarPaciente(id) {
            const formData = {};

            const nombre = document.querySelector('#nombre').value.trim();
            const apellido = document.querySelector('#apellido').value.trim();
            const dni = document.querySelector('#dni').value.trim();
            const fechaAlta = document.querySelector('#fecha-alta').value.trim();
            const domicilio = {
                calle: document.querySelector('#calle').value.trim(),
                numero: document.querySelector('#numero').value.trim(),
                localidad: document.querySelector('#localidad').value.trim(),
                provincia: document.querySelector('#provincia').value.trim(),
            };

            if (!nombre || !apellido || !dni || !fechaAlta || !domicilio.calle || !domicilio.numero || !domicilio.localidad || !domicilio.provincia) {
                mostrarError('Todos los campos son requeridos');
                return;
            }

            if (nombre) formData.nombre = nombre;
            if (apellido) formData.apellido = apellido;
            if (dni) formData.dni = dni;
            if (fechaAlta) formData.fechaAlta = fechaAlta;
            if (Object.values(domicilio).some(value => value)) formData.domicilio = domicilio;

            if (Object.keys(formData).length === 0) {
                mostrarError('No hay cambios para modificar');
                return;
            }

            const url = `/pacientes/${id}`;
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
                    mostrarExito('Paciente modificado con éxito');
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
            document.querySelector('#dni').value = "";
            document.querySelector('#calle').value = "";
            document.querySelector('#numero').value = "";
            document.querySelector('#localidad').value = "";
            document.querySelector('#provincia').value = "";
            document.querySelector('#fecha-alta').value = "";
            document.querySelector('#datos-paciente').style.display = 'none';

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

export function formListarPacientes() {
    document.querySelector('main').innerHTML = `
        <div class="card">
            <h1>Listado de Pacientes</h1>
            <div id="lista-pacientes"></div>
            <div id="response" style="display:none; margin-top:10px"></div>
        </div>
    `;
}

// Lógica para listar pacientes
export function logicaListarPacientes() {
    document.getElementById('listar-pacientes').addEventListener('click', function () {
        formListarPacientes();
        listarPacientes();
    });

    function listarPacientes() {
        const url = '/pacientes';
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
                    let pacientesHTML = '<ul>';

                    data.forEach(paciente => {
                        pacientesHTML += `
                            <li>
                                <strong>ID:</strong> ${paciente.id} <br>
                                <strong>Nombre:</strong> ${paciente.nombre} <br>
                                <strong>Apellido:</strong> ${paciente.apellido} <br>
                                <strong>DNI:</strong> ${paciente.dni} <br>
                                <strong>Fecha de Alta:</strong> ${paciente.fechaAlta} <br>
                                <strong>Domicilio:</strong> ${paciente.domicilio.calle} ${paciente.domicilio.numero}, ${paciente.domicilio.localidad}, ${paciente.domicilio.provincia}
                            </li><hr>`;
                    });

                    pacientesHTML += '</ul>';
                    document.querySelector('#lista-pacientes').innerHTML = pacientesHTML;
                } else {
                    document.querySelector('#lista-pacientes').innerHTML = '<p>No hay pacientes registrados</p>';
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




