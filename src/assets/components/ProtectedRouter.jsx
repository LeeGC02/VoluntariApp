import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { db } from '../../firebase/firebase.config';
import { doc, getDoc } from 'firebase/firestore';
import PropTypes from 'prop-types';
import Loading from './Loading';

const ProtectedRouter = ({children}) => {
  const auth = useAuth();
  const [loading, setLoading] = useState(true); 
  const [role, setRole] = useState(null); 
  const location = useLocation(); // Para obtener la ruta actual

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const docRef = doc(db, "usuario", auth.user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setRole(userData.rol); 
        } else {
          console.error("Documento no encontrado");
        }
      } catch (error) {
        console.error("Error al verificar el rol del usuario", error);
      }
      setLoading(false);
    };

    if (auth.user) {
      checkUserRole();
    } else {
      setLoading(false); 
    }
  }, [auth.user]);

  if (loading) {
    return <Loading/>;
    // return <div>Cargando...</div>; 
  }

  if (!auth.user) {
    return <Navigate to="/LoginPage" />;
  }

  // Evitar redireccionamientos cíclicos
  if (role === 'volunteer' && !location.pathname.startsWith('/VolunteerPage')) {
    return <Navigate to="/VolunteerPage" />;
  } else if (role === 'organization' && location.pathname !== '/OrganizationPage') {
    return <Navigate to="/OrganizationPage" />;
  }

  return children;
};

ProtectedRouter.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRouter;
