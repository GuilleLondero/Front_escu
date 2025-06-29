import { useEffect, useState } from "react";
import { Card, Table, Button } from "react-bootstrap";

type Alumno = {
  id: number;
  username: string;
  nombre: string;
  apellido: string;
  email: string;
  carrera: string;
};

const AdminAlumnos = () => {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);

  useEffect(() => {
    console.log("🔍 Montando AdminAlumnos...");
    fetch("http://localhost:8000/users/alumnos")
      .then((res) => res.json())
      .then((data) => {
        console.log(" Alumnos:", data);
        setAlumnos(data);
      })
      .catch((error) => console.error("Error al cargar alumnos:", error));
  }, []);


const [mensajes, setMensajes] = useState<string[]>([]);

const resetPassword = async (username: string, alumnoIndex: number) => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`http://localhost:8000/users/reset-password/${username}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ new_password: "hasenkamp2000" })
    });

    const data = await res.json();

    const updatedMensajes = [...mensajes];
    if (res.ok) {
      updatedMensajes[alumnoIndex] = "Contraseña restablecida: hasenkamp2000";
    } else {
      updatedMensajes[alumnoIndex] = `Error: ${data.message}`;
    }

    setMensajes(updatedMensajes);

    // Limpia el mensaje después de 3 segundos
    setTimeout(() => {
      const nuevosMensajes = [...updatedMensajes];
      nuevosMensajes[alumnoIndex] = "";
      setMensajes(nuevosMensajes);
    }, 4000);

  } catch {
    const updatedMensajes = [...mensajes];
    updatedMensajes[alumnoIndex] = " Error de servidor";
    setMensajes(updatedMensajes);

    setTimeout(() => {
      const nuevosMensajes = [...updatedMensajes];
      nuevosMensajes[alumnoIndex] = "";
      setMensajes(nuevosMensajes);
    }, 3000);
  }
};

  return (
    <div className="container mt-5">
      <Card className="p-4 shadow-sm border-0 rounded-2 bg-white text-dark">
        <h3 className="mb-3 fw-bold">Listado de Alumnos</h3>

        {alumnos.length === 0 ? (
          <p className="text-muted">No hay alumnos cargados.</p>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Alumno</th>
                <th>Email</th>
                <th>Carrera</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {alumnos.map((alumno, index) => (
  <tr key={alumno.id}>
    <td>{alumno.nombre} {alumno.apellido}</td>
    <td>{alumno.email}</td>
    <td>{alumno.carrera}</td>
    <td>
      <Button
        variant="warning"
        size="sm"
        onClick={() => resetPassword(alumno.username, index)}
      >
        Restablecer Contraseña
      </Button>
      {mensajes[index] && (
         <div className="mt-2">
                      <div className="alert alert-success py-2 px-3 mb-0" role="alert" style={{ fontSize: "0.9rem" }}>
                           {mensajes[index]}
                      </div>
         </div>
      )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
    </div>
  );
};

export default AdminAlumnos;
