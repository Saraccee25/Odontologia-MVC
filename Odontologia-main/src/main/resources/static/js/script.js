import { logicaAgregarPaciente,logicaEliminarPaciente, logicaModificarPaciente, logicaListarPacientes, logicaBuscarPaciente } from './paciente.js';
import { logicaAgregarOdontologo, logicaEliminarOdontologo, logicaModificarOdontologo, logicaListarOdontologos, logicaBuscarOdontologo} from './odontologo.js';
import { logicaAgregarTurno, logicaListarTurnos, logicaEliminarTurno } from './turno.js';

window.addEventListener("load", function () {

    document.querySelectorAll('.gestion').forEach(function (element) {
        element.addEventListener('mouseover', function () {
            this.classList.add('active');
        });

        element.addEventListener('mouseout', function () {
            this.classList.remove('active');
        });
    });

    logicaAgregarOdontologo();
    logicaAgregarPaciente();
    logicaAgregarTurno();


    logicaEliminarOdontologo();
    logicaEliminarPaciente();
    logicaEliminarTurno();


    logicaModificarOdontologo();
    logicaModificarPaciente();


    logicaListarOdontologos();
    logicaListarPacientes();
    logicaListarTurnos();

    logicaBuscarOdontologo();
    logicaBuscarPaciente();

});
