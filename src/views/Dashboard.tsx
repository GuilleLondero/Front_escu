import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function Dashboard() {
  const userName = JSON.parse(localStorage.getItem("user") || "{}").first_name || "Usuario";

  const BACKEND_IP = "localhost";
  const BACKEND_PORT = "8000";
  const ENDPOINT = "users/all";
  const LOGIN_URL = `http://${BACKEND_IP}:${BACKEND_PORT}/${ENDPOINT}`;

  type User = { 
    id: string;
    username: string; 
    first_name: string;
    last_name: string;
    type: string;
    email: string;
    [key: string]: any 
  };
  
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function mostrar_datos(data: any) {
    console.log("data", data);
    if (!data.message) {
      setData(data);
      setError(null);
    } else {
      setData([]);
      setError("No se pudieron cargar los usuarios");
    }
  }

  function get_users_all() {
    setLoading(true);
    setError(null);
    
    const token = localStorage.getItem("token");
    
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    fetch(LOGIN_URL, requestOptions)
      .then((respond) => respond.json())
      .then((data) => {
        mostrar_datos(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setError("Error al conectar con el servidor");
        setLoading(false);
      });
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Aquí podrías redirigir al login
    window.location.href = "/login";
  }

  useEffect(() => {
    get_users_all();
  }, []);

  const customStyles = {
    primaryColor: '#4F46E5',
    secondaryColor: '#6366F1', 
    accentColor: '#F59E0B',
    neutralLight: '#F3F4F6',
    neutralDark: '#1F2937',
    textPrimary: '#111827',
    textInverted: '#F9FAFB'
  };

  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', 'Helvetica Neue', sans-serif", minHeight: '100vh', backgroundColor: customStyles.neutralLight }}>
      {/* Header/Navbar */}
      <nav className="navbar navbar-expand-lg shadow-sm" style={{ backgroundColor: customStyles.primaryColor }}>
        <div className="container-fluid px-4">
          {/* Logo/Título */}
          <span className="navbar-brand mb-0 h1 text-white fw-bold fs-3">
            Sistema-Escuela
          </span>
          
          {/* Menú de navegación */}
          <div className="navbar-nav d-flex flex-row me-auto">
            <button 
              className="btn btn-link text-white mx-3 fw-medium text-decoration-none border-0 p-0"
              onClick={() => window.location.href = '/dashboard'}
              style={{ background: 'none' }}
            >
              Dashboard
            </button>
            <button 
              className="btn btn-link text-white mx-3 fw-medium text-decoration-none border-0 p-0"
              onClick={() => window.location.href = '/profile'}
              style={{ background: 'none' }}
            >
              Profile
            </button>
            <button 
              className="btn btn-link text-white mx-3 fw-medium text-decoration-none border-0 p-0"
              onClick={() => window.location.href = '/notifications'}
              style={{ background: 'none' }}
            >
              Notifications
            </button>
          </div>
          
          {/* Botón Logout a la derecha */}
          <button 
            className="btn btn-outline-light rounded-2 fw-medium"
            onClick={handleLogout}
            style={{ borderColor: customStyles.textInverted }}
          >
            Cerrar Sesión
          </button>
        </div>
      </nav>

      {/* Contenido Principal */}
      <div className="container-fluid px-4 py-4">
        <div className="row">
          <div className="col-12">
            {/* Card de Bienvenida */}
            <div className="card shadow-sm border-0 rounded-2 mb-4" style={{ backgroundColor: 'white' }}>
              <div className="card-body p-4">
                <h1 className="card-title fw-bold mb-3" style={{ color: customStyles.textPrimary, fontSize: '2rem' }}>
                  Dashboard
                </h1>
                <p className="card-text fs-5" style={{ color: customStyles.secondaryColor }}>
                  ¡Bienvenido {userName}!
                </p>
              </div>
            </div>

            {/* Card de la Tabla */}
            <div className="card shadow-sm border-0 rounded-2">
              <div className="card-header d-flex justify-content-between align-items-center" 
                   style={{ backgroundColor: customStyles.neutralLight, borderBottom: '1px solid #e5e7eb' }}>
                <h3 className="mb-0 fw-bold" style={{ color: customStyles.textPrimary, fontSize: '1.25rem' }}>
                  Lista de Usuarios
                </h3>
                <button 
                  className="btn rounded-2 fw-medium"
                  style={{ 
                    backgroundColor: customStyles.accentColor, 
                    color: 'white',
                    border: 'none'
                  }}
                  onClick={get_users_all}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Cargando...
                    </>
                  ) : (
                    'Recargar datos'
                  )}
                </button>
              </div>
              
              <div className="card-body p-0">
                {error && (
                  <div className="alert alert-danger m-3 rounded-2" role="alert">
                    <strong>Error:</strong> {error}
                  </div>
                )}
                
                {data.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead style={{ backgroundColor: customStyles.primaryColor }}>
                        <tr>
                          <th scope="col" className="text-white fw-bold py-3 px-4">NOMBRE</th>
                          <th scope="col" className="text-white fw-bold py-3 px-4">APELLIDO</th>
                          <th scope="col" className="text-white fw-bold py-3 px-4">TIPO</th>
                          <th scope="col" className="text-white fw-bold py-3 px-4">EMAIL</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((usuario, index) => (
                          <tr key={usuario.id || index} className="border-bottom">
                            <td className="py-3 px-4 fw-medium" style={{ color: customStyles.textPrimary }}>
                              {usuario.first_name}
                            </td>
                            <td className="py-3 px-4 fw-medium" style={{ color: customStyles.textPrimary }}>
                              {usuario.last_name}
                            </td>
                            <td className="py-3 px-4">
                              <span 
                                className="badge rounded-pill px-3 py-2 fw-medium"
                                style={{ 
                                  backgroundColor: usuario.type === 'admin' ? customStyles.accentColor : customStyles.secondaryColor,
                                  color: 'white'
                                }}
                              >
                                {usuario.type}
                              </span>
                            </td>
                            <td className="py-3 px-4" style={{ color: customStyles.textPrimary }}>
                              {usuario.email}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : !loading && (
                  <div className="text-center py-5">
                    <p className="text-muted fs-5">No hay usuarios para mostrar</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;