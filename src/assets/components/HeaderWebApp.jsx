import { Icon } from '@iconify/react/dist/iconify.js';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const HeaderWebApp = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.logout();
    navigate("/LoginPage");
  };

  const handleProfileChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "logout") {
      handleLogout();
    } else if (selectedValue === "profile") {
      navigate("/VolunteerPage/VolunteerProfile");
    }
  };

  return (
    <div>
      <header className="flex items-center justify-between bg-[#e8402a] text-white py-2 px-4 fixed top-0 left-0 right-0 z-50">
        {/* Logo y Nombre */}
        <div className="flex items-center">
          <img className="h-10 mr-2" src="/VoluntariAppLogo.png" alt="logo VoluntariApp" />
          <h2 className="text-lg font-bold">VoluntariApp</h2>
        </div>

        {/* Barra de búsqueda */}
        <input
          className="w-2/5 bg-white text-gray-800 placeholder-gray-500 py-2 px-4 rounded-full focus:outline-none focus:ring focus:ring-[#ff6e52] transition-all"
          type="text"
          placeholder="🔎 Buscar"
        />

        {/* Acciones */}
        <div className="flex items-center space-x-4">
          <div className="flex flex-col items-center">
            <Icon icon="ic:baseline-local-grocery-store" width="24" height="24" style={{ color: "#fff" }} />
            <span className="text-sm">Tienda</span>
          </div>
          <div className="flex flex-col items-center">
            <Icon icon="material-symbols:notifications-sharp" width="24" height="24" style={{ color: "#fff" }} />
            <span className="text-sm">Notificaciones</span>
          </div>
          <div className="relative">
            <Icon icon="solar:user-bold" width="24" height="24" style={{ color: "#fff" }} />
            <select
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleProfileChange}
              defaultValue="default"
            >
              <option value="default" disabled>
                Yo
              </option>
              <option value="profile">Mi Perfil</option>
              <option value="logout">Cerrar Sesión</option>
            </select>
          </div>
        </div>
      </header>
    </div>
  );
};

export default HeaderWebApp;
