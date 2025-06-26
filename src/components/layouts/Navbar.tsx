import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function handleLogout() {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  window.location.href = "/login";
}

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userType = user.type;

  const customStyles = {
    primaryColor: '#4F46E5',
    secondaryColor: '#6366F1',
    textInverted: '#F9FAFB'
  };

  return (
    <nav className="navbar navbar-expand-lg shadow-sm" style={{ backgroundColor: customStyles.primaryColor }}>
      <div className="container-fluid px-4">
        {/* Logo/Título */}
        <span className="navbar-brand mb-0 h1 text-white fw-bold fs-3">
          Sistema-Escuela
        </span>
        
        {/* Navegación condicional según tipo de usuario */}
        <div className="navbar-nav d-flex flex-row me-auto">
          {userType === "alumno" && (
            <>
              <button 
                className="btn btn-link text-white mx-3 fw-medium text-decoration-none border-0 p-0"
                onClick={() => navigate('/dashboard')}
                style={{ background: 'none' }}
              >
                Panel Usuario
              </button>
              <button 
                className="btn btn-link text-white mx-3 fw-medium text-decoration-none border-0 p-0"
                onClick={() => navigate('/profile')}
                style={{ background: 'none' }}
              >
                Mi Perfil
              </button>
              <button 
                className="btn btn-link text-white mx-3 fw-medium text-decoration-none border-0 p-0"
                onClick={() => navigate('/myPayments')}
                style={{ background: 'none' }}
              >
                Mis Pagos
              </button>
            </>
          )}

          {userType === "admin" && (
            <>
              <button 
                className="btn btn-link text-white mx-3 fw-medium text-decoration-none border-0 p-0"
                onClick={() => navigate('/mi-perfil')}
                style={{ background: 'none' }}
              >
                Mi Perfil
              </button>
              <button 
                className="btn btn-link text-white mx-3 fw-medium text-decoration-none border-0 p-0"
                onClick={() => navigate('/gestion-alumnos')}
                style={{ background: 'none' }}
              >
                Gestión Alumnos
              </button>
              <button 
                className="btn btn-link text-white mx-3 fw-medium text-decoration-none border-0 p-0"
                onClick={() => navigate('/gestion-pagos')}
                style={{ background: 'none' }}
              >
                Gestión Pagos
              </button>
              <button 
                className="btn btn-link text-white mx-3 fw-medium text-decoration-none border-0 p-0"
                onClick={() => navigate('/gestion-carreras')}
                style={{ background: 'none' }}
              >
                Gestión Carreras
              </button>
            </>
          )}
        </div>
        
        <button 
          className="btn btn-outline-light rounded-2 fw-medium"
          onClick={handleLogout}
          style={{ borderColor: customStyles.textInverted }}
        >
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
}

export default Navbar;