import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { db, auth } from "../../firebase/firebase.config";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { Icon } from "@iconify/react/dist/iconify.js";

const AchievementCard = () => {
  const [showModal, setShowModal] = useState(false);
  const [newAchievement, setNewAchievement] = useState("");
  const [achievements, setAchievements] = useState([]);

  // Función para abrir el modal
  const openModal = () => setShowModal(true);

  // Función para cerrar el modal
  const closeModal = () => setShowModal(false);

  // Función para agregar un logro a Firebase
  const addAchievementToFirebase = async () => {
    if (newAchievement) {
      try {
        const user = auth.currentUser;
        if (user) {
          // Obtener la referencia de la subcolección "logros" del usuario autenticado
          const achievementsRef = collection(db, "usuario", user.uid, "logros");

          // Agregar el logro
          await addDoc(achievementsRef, { achievement: newAchievement });

          // Limpiar el campo y cerrar el modal
          setNewAchievement("");
          closeModal();

          // Volver a cargar los logros
          fetchAchievements();
        }
      } catch (error) {
        console.error("Error al agregar logro:", error);
      }
    }
  };

  // Función para obtener los logros de Firebase
  const fetchAchievements = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        const achievementsRef = collection(db, "usuario", user.uid, "logros");
        const snapshot = await getDocs(achievementsRef);
        const achievementsList = snapshot.docs.map((doc) => doc.data().achievement);
        setAchievements(achievementsList);
      } catch (error) {
        console.error("Error al obtener logros:", error);
      }
    }
  };

  // Llamar a fetchAchievements cuando el componente se monta
  useEffect(() => {
    fetchAchievements();
  }, []);

  return (
    <div className="achievement-container">
      <div className="list-container flex flex-col flex-wrap gap-2 text-center items-start">
        {achievements.map((achievement, index) => (
          <div key={index} className="achievement-card 0 p-3 rounded-xl flex items-center">
            <Icon icon="game-icons:achievement" width="30" height="30" style={{ color: "#FF6E52", marginRight: "8px" }} />
            <p>{achievement}</p>
          </div>
        ))}

        <button
          className="rounded-full py-2 px-4 bg-orange-200 text-orange-600 hover:bg-orange-600 hover:text-orange-200 flex items-center gap-2"
          onClick={openModal}
        >
          <span>Añadir Logro</span>
          <Icon icon="game-icons:achievement" width="20" height="20" style={{ color: "#FF6E52" }} />
        </button>
      </div>

      {/* Modal para agregar logro */}
      {showModal && (
        <div className="modal fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="modal-content bg-white p-6 rounded-lg w-1/3">
            <h3 className="text-xl font-bold mb-4">Agregar Logro</h3>
            <textarea
              value={newAchievement}
              onChange={(e) => setNewAchievement(e.target.value)}
              placeholder="Escribe el logro"
              className="w-full p-2 border rounded-md mb-4 h-32"
            />
            <div className="flex justify-between">
              <button
                className="bg-gray-300 py-2 px-4 rounded-md hover:bg-gray-500"
                onClick={closeModal}
              >
                Cancelar
              </button>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                onClick={addAchievementToFirebase}
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

AchievementCard.propTypes = {
  archievement: PropTypes.string.isRequired,
};

export default AchievementCard;
