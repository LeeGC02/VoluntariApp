import { useState, useEffect } from "react";
import { db, auth } from "../../firebase/firebase.config";
import { collection, addDoc, getDocs } from "firebase/firestore";

const SkillCard = () => {
  const [showModal, setShowModal] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [skills, setSkills] = useState([]);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  // Función para agregar una nueva aptitud a Firebase
  const addSkillToFirebase = async () => {
    if (newSkill) {
      try {
        const user = auth.currentUser;
        if (user) {
          // Obtiene la referencia de la subcolección "aptitudes" del usuario autenticado
          const aptitudesRef = collection(db, "usuario", user.uid, "aptitudes");

          // Agregar nueva aptitud
          await addDoc(aptitudesRef, { skill: newSkill });

          // Limpiar el campo de entrada
          setNewSkill("");
          closeModal();

          // Vuelve a cargar las aptitudes
          fetchSkills();
        }
      } catch (error) {
        console.error("Error al agregar aptitud:", error);
      }
    }
  };

  // Obtener las aptitudes almacenadas en Firebase
  const fetchSkills = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        const aptitudesRef = collection(db, "usuario", user.uid, "aptitudes");
        const snapshot = await getDocs(aptitudesRef);
        const skillsList = snapshot.docs.map((doc) => doc.data().skill);
        setSkills(skillsList);
      } catch (error) {
        console.error("Error al obtener aptitudes:", error);
      }
    }
  };

  // Llamar a fetchSkills cuando el componente se monta
  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <div className="skill-container">
      <div className="list-container flex flex-wrap gap-2 text-center items-center">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="bg-green-300 py-1 px-2 rounded-xl"
          >
            {skill}
          </span>
        ))}

        <button
          className="rounded-full py-1 px-3 bg-orange-200 text-orange-600 hover:bg-orange-600 hover:text-orange-200"
          onClick={openModal}
        >
          +
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="modal-content bg-white p-6 rounded-lg w-1/3">
            <h3 className="text-xl font-bold mb-4">Agregar Aptitud</h3>
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Escribe la nueva aptitud"
              className="w-full p-2 border rounded-md mb-4"
            />
            <div className="flex justify-between">
              <button
                className="bg-gray-300 py-2 px-4 rounded-md hover:bg-gray-500"
                onClick={closeModal}
              >
                Cancelar
              </button>
              <button
                className="bg-orange-200 text-orange-600 p-3 rounded-md hover:bg-orange-600 hover:text-orange-200"
                onClick={addSkillToFirebase}
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

export default SkillCard;
