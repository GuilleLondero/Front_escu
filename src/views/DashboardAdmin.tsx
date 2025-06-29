import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import ProfileAdmin from "./ProfileAdmin";
import AdminAlumnos from "./AdminAlumnos";
import AdminPagos from "./AdminPagos";  
import AdminCarreras from "./AdminCarreras";

const DashboardAdmin = () => {
  return (
    <Container className="mt-4">
      <h2 className="fw-bold mb-4">Panel Administrativo</h2>

      {/* Rutas internas de administración */}
      <Routes>
        <Route path="perfil" element={<ProfileAdmin />} />
        <Route path="alumnos" element={<AdminAlumnos />} />
         <Route path="pagos" element={<AdminPagos />} /> 
        <Route path="carreras" element={<AdminCarreras />} />
      </Routes>
    </Container>
  );
};

export default DashboardAdmin;
