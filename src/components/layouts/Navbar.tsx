
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const [tipoUsuario, setTipoUsuario] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setTipoUsuario(user.userdetail?.type || user.type || null);
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <nav style={{ padding: "1rem", background: "#f0f0f0" }}>
      {tipoUsuario === "Administrativo" && (
        <>
          <NavLink to="/admin/perfil" style={{ marginRight: "1rem" }}>Perfil</NavLink>
          <NavLink to="/admin/alumnos" style={{ marginRight: "1rem" }}>Alumnos</NavLink>
          <NavLink to="/admin/pagos" style={{ marginRight: "1rem" }}>Pagos</NavLink>
          <NavLink to="/admin/carreras" style={{ marginRight: "1rem" }}>Carreras</NavLink>
        </>
      )}

      {tipoUsuario === "Alumno" && (
        <>
          <NavLink to="/dashboard/perfil" style={{ marginRight: "1rem" }}>Perfil</NavLink>
          <NavLink to="/dashboard/pagos" style={{ marginRight: "1rem" }}>Mis Pagos</NavLink>
        </>
      )}

      <NavLink to="/login" onClick={handleLogout}>
        Logout
      </NavLink>

    </nav>
  );
}

export default Navbar;
