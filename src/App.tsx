import { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import PublicRoutes from "./components/router/PublicRoutes";
import ProtectedRoutes from "./components/router/ProtectedRoutes";
import MainLayout from "./components/layouts/MainLayout";

function App() {
  const Dashboard = lazy(() => import("./views/Dashboard"));
  const Profile = lazy(() => import("./views/Profile"));
  const MyPayments = lazy(() => import("./views/myPayments"));
  const Notifications = lazy(() => import("./views/Notifications"));

  /* Nuevos componentes para admin
  const GestionAlumnos = lazy(() => import("./views/GestionAlumnos"));
  const GestionPagos = lazy(() => import("./views/GestionPagos"));
  const GestionCarreras = lazy(() => import("./views/GestionCarreras"));*/

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/myPayments" element={<MyPayments />} />

            {/* Nuevas rutas para ADMIN 
            <Route path="/gestion-alumnos" element={<GestionAlumnos />} />
            <Route path="/gestion-pagos" element={<GestionPagos />} />
            <Route path="/gestion-carreras" element={<GestionCarreras />} />*/}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

