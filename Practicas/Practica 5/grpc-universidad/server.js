import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";
import { fileURLToPath } from "url";

// Para obtener __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta correcta al archivo .proto
const PROTO_PATH = path.join(__dirname, "proto", "universidad.proto");

// Configuración mejorada para protoLoader
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
    includeDirs: [
        path.join(__dirname, "proto"),
        path.join(__dirname, "node_modules")
    ]
});

const proto = grpc.loadPackageDefinition(packageDefinition).universidad;

// Bases de datos en memoria
const estudiantes = [];
const cursos = [];
const inscripciones = []; // { ci_estudiante, codigo_curso }

const serviceImpl = {
    AgregarEstudiante: (call, callback) => {
        const nuevo = call.request;
        estudiantes.push(nuevo);
        console.log(`Estudiante agregado: ${nuevo.ci} - ${nuevo.nombres} ${nuevo.apellidos}`);
        callback(null, { estudiante: nuevo });
    },

    AgregarCurso: (call, callback) => {
        const nuevo = call.request;
        cursos.push(nuevo);
        console.log(`Curso agregado: ${nuevo.codigo} - ${nuevo.nombre}`);
        callback(null, { curso: nuevo });
    },

    InscribirEstudiante: (call, callback) => {
        const { ci_estudiante, codigo_curso } = call.request;

        console.log(`Intentando inscripción: Estudiante ${ci_estudiante} en curso ${codigo_curso}`);

        // Verificar si ya está inscrito
        const existe = inscripciones.some(
            ins => ins.ci_estudiante === ci_estudiante && ins.codigo_curso === codigo_curso
        );

        if (existe) {
            console.log(`Error: Estudiante ${ci_estudiante} ya inscrito en curso ${codigo_curso}`);
            callback({
                code: grpc.status.ALREADY_EXISTS,
                message: "El estudiante ya está inscrito en este curso"
            });
            return;
        }

        // Verificar que existan estudiante y curso
        const estudiante = estudiantes.find(e => e.ci === ci_estudiante);
        const curso = cursos.find(c => c.codigo === codigo_curso);

        // Logs para debugging
        console.log("Estudiantes disponibles:", estudiantes.map(e => e.ci));
        console.log("Cursos disponibles:", cursos.map(c => c.codigo));

        if (!estudiante) {
            console.log(`Error: Estudiante ${ci_estudiante} no encontrado`);
            callback({
                code: grpc.status.NOT_FOUND,
                message: "Estudiante no encontrado"
            });
            return;
        }

        if (!curso) {
            console.log(`Error: Curso ${codigo_curso} no encontrado`);
            callback({
                code: grpc.status.NOT_FOUND,
                message: "Curso no encontrado"
            });
            return;
        }

        inscripciones.push({ ci_estudiante, codigo_curso });
        console.log(`Inscripción exitosa: Estudiante ${ci_estudiante} en curso ${codigo_curso}`);
        callback(null, { mensaje: "Inscripción realizada con éxito" });
    },

    ListarCursosDeEstudiante: (call, callback) => {
        const { ci } = call.request;
        console.log(`Listando cursos para estudiante: ${ci}`);
        
        const codigos = inscripciones
            .filter(ins => ins.ci_estudiante === ci)
            .map(ins => ins.codigo_curso);

        const cursosDelEstudiante = cursos.filter(curso => codigos.includes(curso.codigo));
        console.log(`Cursos encontrados: ${cursosDelEstudiante.length}`);
        callback(null, { cursos: cursosDelEstudiante });
    },

    ListarEstudiantesDeCurso: (call, callback) => {
        const { codigo } = call.request;
        console.log(`Listando estudiantes para curso: ${codigo}`);
        
        const cis = inscripciones
            .filter(ins => ins.codigo_curso === codigo)
            .map(ins => ins.ci_estudiante);

        const estudiantesDelCurso = estudiantes.filter(est => cis.includes(est.ci));
        console.log(`Estudiantes encontrados: ${estudiantesDelCurso.length}`);
        callback(null, { estudiantes: estudiantesDelCurso });
    }
};

// Crear servidor
const server = new grpc.Server();
server.addService(proto.UniversidadService.service, serviceImpl);

const PORT = "50051";
server.bindAsync(
    `0.0.0.0:${PORT}`,
    grpc.ServerCredentials.createInsecure(),
    (err, bindPort) => {
        if (err) {
            console.error("Error al iniciar servidor:", err);
            return;
        }
        console.log(`Servidor gRPC escuchando en el puerto ${bindPort}`);
        console.log(`Estudiantes registrados: ${estudiantes.length}`);
        console.log(`Cursos registrados: ${cursos.length}`);
        console.log(`Inscripciones: ${inscripciones.length}`);
        server.start();
    }
);