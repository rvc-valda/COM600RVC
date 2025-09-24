import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROTO_PATH = path.join(__dirname, "proto", "universidad.proto");

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

const client = new proto.UniversidadService(
    "localhost:50051",
    grpc.credentials.createInsecure()
);

// Función para convertir callbacks a promesas
const promisify = (clientMethod, request) => {
    return new Promise((resolve, reject) => {
        clientMethod.call(client, request, (err, response) => {
            if (err) reject(err);
            else resolve(response);
        });
    });
};

// Ejecutar todas las operaciones en secuencia
const demo = async () => {
    try {
        console.log("Agregando estudiante...");
        const estudiante = await promisify(client.AgregarEstudiante, {
            ci: "12345",
            nombres: "Ana",
            apellidos: "Pérez",
            carrera: "Informática"
        });
        console.log("Estudiante agregado:", estudiante.estudiante);

        console.log("\nAgregando cursos...");
        const curso1 = await promisify(client.AgregarCurso, {
            codigo: "C101",
            nombre: "Base de Datos",
            docente: "Dr. López"
        });
        console.log("Curso agregado:", curso1.curso);

        const curso2 = await promisify(client.AgregarCurso, {
            codigo: "C102",
            nombre: "Redes",
            docente: "Ing. Martínez"
        });
        console.log("Curso agregado:", curso2.curso);

        console.log("\nInscribiendo estudiante en cursos...");
        const inscripcion1 = await promisify(client.InscribirEstudiante, {
            ci_estudiante: "12345",
            codigo_curso: "C101"
        });
        console.log("Inscripción 1:", inscripcion1.mensaje);

        const inscripcion2 = await promisify(client.InscribirEstudiante, {
            ci_estudiante: "12345",
            codigo_curso: "C102"
        });
        console.log("Inscripción 2:", inscripcion2.mensaje);

        console.log("\nCursos del estudiante CI: 12345");
        const cursosEstudiante = await promisify(client.ListarCursosDeEstudiante, { ci: "12345" });
        console.log("Cursos:", cursosEstudiante.cursos);

        console.log("\nEstudiantes del curso C101:");
        const estudiantesCurso = await promisify(client.ListarEstudiantesDeCurso, { codigo: "C101" });
        console.log("Estudiantes:", estudiantesCurso.estudiantes);

    } catch (err) {
        console.error("Error:", err.message);
    }
};

demo();