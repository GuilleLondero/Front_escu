import { useState, useEffect } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";

type UserDetail = {
  first_name: string;
  last_name: string;
  email: string;
  type: string;
};

type User = {
  username: string;
  userdetail: UserDetail;
};

const ProfileAdmin = () => {
  const [user, setUser] = useState<User | null>(null);
  const [form, setForm] = useState<UserDetail>({
    first_name: "",
    last_name: "",
    email: "",
    type: "",
  });
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      if (parsed.userdetail) {
        setUser(parsed);
        setForm(parsed.userdetail);
      }
    }
  }, []);
  useEffect(() => {
  if (message) {
    const timer = setTimeout(() => {
      setMessage(null);
    }, 3000); // 5 segundos

    return () => clearTimeout(timer);
  }
}, [message]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const payload = {
        ...form,
        ...(newPassword && { new_password: newPassword })
      };

      const response = await fetch("http://localhost:8000/users/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(" Perfil actualizado correctamente");
        if (user) {
          const updatedUser = {
            ...user,
            userdetail: { ...form }
          };
          localStorage.setItem("user", JSON.stringify(updatedUser));
        }
        setNewPassword("");
      } else {
        setMessage(data.message || " Error al actualizar");
      }
    } catch {
      setMessage(" Error de red o servidor");
    }
  };

  if (!user) return <p className="text-danger">Cargando usuario...</p>;

  return (
    <div className="container mt-5">
      <Card className="shadow-sm border-0 rounded-2 p-3 bg-white text-dark mx-auto" style={{ maxWidth: "600px" }}>
        <Card.Body>
          <Card.Title className="fs-4 fw-bold mb-3">Perfil del Administrador</Card.Title>

          {message && (
            <Alert variant={message.includes("") ? "success" : "danger"}>
              {message}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tipo de usuario</Form.Label>
              <Form.Control type="text" value={form.type} readOnly />
            </Form.Group>

            <hr />

            <Form.Group className="mb-3">
              <Form.Label>Nueva contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Dejar vacío si no se desea cambiar"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100">
              Guardar Cambios
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProfileAdmin;
