import React, { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../firebase";

const UserDaily = () => {
  const { firebase } = useContext(FirebaseContext);
  const [users, setUsers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [userDailys, setUserDailys] = useState([]);

  useEffect(() => {
    firebase.db.collection("users").onSnapshot((snapshot) => {
      const userList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userList);
    });

    firebase.db.collection("class").onSnapshot((snapshot) => {
      const classList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setClasses(classList);
    });

    firebase.db.collection("daily").onSnapshot((snapshot) => {
      const routineList = snapshot.docs.map((doc) => ({
        id: doc.id,
        userId: doc.data().userId,
        trainingId: doc.data().trainingId,
      }));
      setUserDailys(routineList);
    });
  }, [firebase]);

  const toggleBlockUser = (userId, isBlocked) => {
    firebase.db.collection("users").doc(userId).update({
      blocked: !isBlocked, 
    });
  };

  return (
    <div className="p-4 flex flex-col items-center justify-center">
    <h2 className="text-3xl font-bold mb-4">Información de Usuarios y Rutinas</h2>
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-1">
      {users.map((user) => (
        <div key={user.id} className="bg-white p-4 rounded-lg shadow-md">
          <strong className="block text-lg font-semibold mb-2">Usuario:</strong>
          <p>{user.name}</p>
          <p>
            <strong>Estado:</strong> {user.blocked ? "Bloqueado" : "Desbloqueado"}
          </p>
          <button
            onClick={() => toggleBlockUser(user.id, user.blocked)}
            className="bg-blue-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md mt-4"
          >
            {user.blocked ? "Desbloquear" : "Bloquear"}
          </button>
          <ul className="mt-4">
            {userDailys
              .filter((routine) => routine.userId === user.id)
              .map((routine) => {
                const classInfo = classes.find((c) => c.id === routine.trainingId);
                return (
                  <li key={routine.id} className="mt-2">
                    <strong>Rutina de Entrenamiento:</strong> 
                    <ul>
                      <li>Nombre: {classInfo ? classInfo.name : "Nombre no encontrado"}</li>
                      <li>Categoria: {classInfo ? classInfo.category : "Categoria no encontrada"}</li>
                      <li>Hora inicio: {classInfo ? classInfo.startHour : "Hora no encontrada"}</li>
                      <li>Hora fin: {classInfo ? classInfo.endHour : "Hora no encontrada"}</li>
                    </ul>
                  </li>
                );
              })}
          </ul>
        </div>
      ))}
    </div>
  </div>
  
  );
};

export default UserDaily;
