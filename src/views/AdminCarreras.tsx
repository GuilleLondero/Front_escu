import { useEffect, useState } from "react";
import { Button, Form, Table, Alert, Card } from "react-bootstrap";

type Carrera = {
  id: number;
  name: string;
  active?: boolean;
};

const AdminCarreras = () => {
  const [carreras, setCarreras] = useState<Carrera[]>([]);
  const [nombreCarrera, setNombreCarrera] = useState<string>("");
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [mensaje, setMensaje] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCarreras();
  }, []);

  const fetchCarreras = async () => {
    try {
      const res = await fetch("http://localhost:8000/careers/active", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setCarreras(data);
    } catch (error) {
      console.error("Error al obtener carreras", error);
    }
  };

  const handleGuardar = async () => {
    if (!nombreCarrera.trim()) return;

    const url = editandoId
      ? `http://localhost:8000/careers/${editandoId}`
      : "http://localhost:8000/career/add";
    const method = editandoId ? "PUT" : "POST";
    const body = JSON.stringify(
      editandoId
        ? { name: nombreCarrera, active: true }
        : { name: nombreCarrera }
    );

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body,
      });

      if (res.ok) {
        setMensaje(editandoId ? " Carrera actualizada" : " Carrera agregada");
        setNombreCarrera("");
        setEditandoId(null);
        fetchCarreras();
      } else {
        setMensaje(" Error al guardar carrera");
      }
    } catch {
      setMensaje(" Error de red");
    } finally {
      setTimeout(() => setMensaje(null), 3000);
    }
  };

  const handleEditar = (carrera: Carrera) => {
    setNombreCarrera(carrera.name);
    setEditandoId(carrera.id);
  };

  const handleEliminar = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:8000/careers/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setMensaje(" Carrera eliminada lógicamente");
        fetchCarreras();
      } else {
        setMensaje(" No se pudo eliminar la carrera");
      }
    } catch {
      setMensaje(" Error de red al eliminar");
    } finally {
      setTimeout(() => setMensaje(null), 3000);
    }
  };

  return (
    <div className="container mt-5">
      <Card className="p-4 bg-white text-dark shadow-sm">
        <h4 className="fw-bold mb-3">Gestión de Carreras</h4>

        {mensaje && <Alert variant={mensaje.includes("✅") ? "success" : "danger"}>{mensaje}</Alert>}

        <Form.Group className="mb-3">
          <Form.Label>Nombre de la carrera</Form.Label>
          <Form.Control
            type="text"
            value={nombreCarrera}
            onChange={(e) => setNombreCarrera(e.target.value)}
            placeholder="Ej: Tecnicatura en Software"
          />
        </Form.Group>

        <Button variant="success" onClick={handleGuardar}>
          {editandoId ? "Actualizar carrera" : "Agregar carrera"}
        </Button>

        <hr />

        {carreras.length > 0 ? (
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {carreras.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.name}</td>
                  <td>
                    <Button variant="primary" size="sm" onClick={() => handleEditar(c)}>
                      Editar
                    </Button>{" "}
                    <Button variant="danger" size="sm" onClick={() => handleEliminar(c.id)}>
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p className="text-muted">No hay carreras activas</p>
        )}
      </Card>
    </div>
  );
};

export default AdminCarreras;
