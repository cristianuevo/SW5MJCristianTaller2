import React, { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../firebase";
import { useNavigate } from "react-router";

const Daily = () => {
  const { firebase } = useContext(FirebaseContext);
  const [users, setUsers] = useState([]);
  const [classs, setClass] = useState([]);
  const [selectedTraining, setSelectedTraining] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [availableTrainings, setAvailableTrainings] = useState([]);
  const navigate = useNavigate();
  const unassignRutina = (assignedTrainingId) => {
    firebase.db.collection("daily").doc(assignedTrainingId).update({
      available: false,
    });
  
    const updatedAssignedTrainings = assignedTrainings.filter(
      (assignedTraining) => assignedTraining.id !== assignedTrainingId
    );
    setAssignedTrainings(updatedAssignedTrainings);
  };
  

  useEffect(() => {
    firebase.db.collection("users").onSnapshot((snapshot) => {
      const userList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userList);
    });

    firebase.db.collection("class").onSnapshot((snapshot) => {
      const trainingList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAvailableTrainings(trainingList);
      setClass(trainingList)

    });
  }, [firebase]);

  const [assignedTrainings, setAssignedTrainings] = useState([]);

  useEffect(() => {
    firebase.db.collection("daily").onSnapshot((snapshot) => {
      const assignedList = snapshot.docs.map((doc) => ({
        id: doc.id,
        trainingId: doc.data().trainingId,
        userId: doc.data().userId,
        available: doc.data().available,
      }));
      setAssignedTrainings(assignedList);
    });
  }, [firebase]);

  const assignRutina = () => {
    if (!selectedUser || !selectedTraining) {
      alert("Selecciona un usuario y un horario de entrenamiento primero.");
      return;
    }
    firebase.db.collection("daily").add({
      userId: selectedUser,
      trainingId: selectedTraining,
      available: true,
    });

    alert("Rutina asignada correctamente.");
    navigate("/daily");

    setSelectedUser("");
    setSelectedTraining("");
  };
  
  const availableOptions = availableTrainings
    .filter((training) => {
      // Filtra los horarios que no estén asignados a usuarios y tengan available en true
      return !assignedTrainings.some(
        (assigned) => assigned.trainingId === training.id && assigned.available === true
      );
    })
    .map((training) => (
      <option key={training.id} value={training.id}>
        {`${training.name} - Inicio: ${training.startHour}, Fin: ${training.endHour}`}
      </option>
    ));

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="bg-white p-8 rounded-lg shadow-md mt-10">
        <h2 className="text-2xl font-bold mb-4">Asignar Rutina a Usuario</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="user" className="block font-semibold text-gray-700">
              Usuario
            </label>
            <select
              id="user"
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              <option value="">Selecciona un usuario</option>
              {users
                .filter((user) => !user.blocked) // Filtra usuarios no bloqueados
                .map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="training"
              className="block font-semibold text-gray-700"
            >
              Rutina de Entrenamiento
            </label>
            <select
              id="training"
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200"
              value={selectedTraining}
              onChange={(e) => setSelectedTraining(e.target.value)}
            >
              <option value="">Selecciona un Entrenamiento</option>
              {availableOptions}
            </select>
          </div>
          <div className="text-center">
            <button
              onClick={assignRutina}
              className="bg-blue-500 hover-bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
            >
              Asignar Rutina
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-md mt-4">
       
        <h2 className="text-2xl font-bold mb-4">Desasignar Rutina de Usuario</h2>
        <div className="space-y-4">
          {assignedTrainings.map((assignedTraining) => (
            <div key={assignedTraining.id}>
              {assignedTraining.available ? (
                <div className="border rounded-md p-4">
                  <h3 className="text-lg font-semibold">
                    {classs.find((clas) => clas.id === assignedTraining.trainingId).name}
                  </h3>
                  <p>
                    <strong>Usuario:</strong> {users.find((user) => user.id === assignedTraining.userId).name}
                  </p>
                  <p>
                    <strong>Disponible:</strong> Sí
                  </p>
                  <div className="text-center mt-2">
                    <button
                      onClick={() => unassignRutina(assignedTraining.id)}
                      className="bg-red-500 hover-bg-red-600 text-white font-bold py-2 px-4 rounded-md"
                    >
                      Desasignar Rutina
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Daily;
