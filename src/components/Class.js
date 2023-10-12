import React, { useContext, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FirebaseContext } from "../firebase";
import logo from "../img/logoKoreanGym.png";

const Class = () => {
  const { firebase } = useContext(FirebaseContext);
  const [trainings, setTrainings] = useState([]);
  const daysOfWeek = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  // Inicializar campos
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      category: "",
      day: "",
      startHour: "07:00 AM",
      endHour: "07:00 PM",
      availableSlots: 0,
    },
    // Validación de los errores
    validationSchema: Yup.object({
      name: Yup.string()
        .min(4, "El nombre debe tener mínimo 4 caracteres")
        .required("El nombre es requerido"),
      description: Yup.string()
        .min(10, "La descripción debe tener mínimo 10 caracteres")
        .required("La descripción es requerida"),
      category: Yup.string().required("Selecciona una categoría"),
      day: Yup.string().required("El día es requerido"),
      startHour: Yup.string().required("La hora de inicio es requerida"),
      endHour: Yup.string()
        .required("La hora de finalización es requerida")
        .test("is-after-start", "Debe ser al menos una hora después de la hora de inicio", function (endHour) {
          const startHour = this.resolve(Yup.ref("startHour"));
          return isAfterHour(startHour, endHour);
        }),
    }),

    onSubmit: async (values) => {
      try {
        const trainingData = {
          name: values.name,
          description: values.description,
          category: values.category,
          day: values.day,
          startHour: values.startHour,
          endHour: values.endHour, 
        };
        await firebase.db.collection("class").add(trainingData);
        window.alert("Entrenamiento agregado correctamente");
        window.location.reload()
      } catch (error) {
        window.alert("Entrenamiento no agregado, causa --> " + error);
      }
    },
  });

  // Cargar los entrenamientos desde Firebase al cargar el componente
  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const snapshot = await firebase.db.collection("class").get();
        const trainingList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTrainings(trainingList);
      } catch (error) {
        console.error("Error al obtener los entrenamientos", error);
      }
    };
    fetchTrainings();
  }, [firebase]);

  const isAfterHour = (startHour, endHour) => {
    const [startHourPart, startAmPm] = startHour.split(" ");
    const [endHourPart, endAmPm] = endHour.split(" ");
    const [startHourNum, startMinute] = startHourPart.split(":");
    const [endHourNum, endMinute] = endHourPart.split(":");

    if (startAmPm === endAmPm) {
      // Ambos tienen el mismo AM/PM
      if (startHourNum === endHourNum) {
        // Misma hora
        return startMinute < endMinute;
      } else {
        return startHourNum < endHourNum;
      }
    } else {
      // AM y PM son diferentes
      if (startAmPm === "AM" && endAmPm === "PM") {
        // startHour es AM y endHour es PM
        return true;
      } else {
        return false;
      }
    }
  };
  return (
    <>
      <div className="container mx-auto py-6">
        <div className="max-w-md mx-auto">

          <h2 className="text-3xl font-bold text-center py-8">
            Agregar Entrenamientos
          </h2>

          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Nombre del Entrenamiento
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500 font-bold">
                  {formik.errors.name}
                </div>
              ) : null}
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Descripción del Entrenamiento
              </label>
              <textarea
                id="description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-3 border rounded-md resize-none focus:outline-none focus:ring focus:border-blue-300"
                rows="4"
              />
              {formik.touched.description && formik.errors.description ? (
                <div className="text-red-500 font-bold">
                  {formik.errors.description}
                </div>
              ) : null}
            </div>
            <div className="mb-4">
              <label
                htmlFor="category"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Categoría del Entrenamiento
              </label>
              <select
                id="category"
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="">Selecciona una categoría</option>
                <option value="Cardiovascular">Cardiovascular</option>
                <option value="Fuerza">Fuerza</option>
                <option value="Flexibilidad">Flexibilidad</option>
                <option value="HIIT">HIIT</option>
                <option value="Yoga">Yoga</option>
                {/* Agrega más opciones de categoría según sea necesario */}
              </select>
              {formik.touched.category && formik.errors.category ? (
                <div className="text-red-500 font-bold">
                  {formik.errors.category}
                </div>
              ) : null}
            </div>
            <div className="mb-4">
              <label
                htmlFor="day"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Día del Horario
              </label>
              <select
                id="day"
                name="day"
                value={formik.values.day}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="">Selecciona un día</option>
                {daysOfWeek.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
              {formik.touched.day && formik.errors.day ? (
                <div className="text-red-500 font-bold">{formik.errors.day}</div>
              ) : null}
            </div>
            <div className="mb-4">
              <label
                htmlFor="startHour"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Hora de Inicio
              </label>
              <select
                id="startHour"
                name="startHour"
                value={formik.values.startHour}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="7:00 AM">7:00 AM</option>
                <option value="8:00 AM">8:00 AM</option>
                <option value="9:00 AM">9:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="12:00 PM">12:00 PM</option>
                <option value="1:00 PM">1:00 PM</option>
                <option value="2:00 PM">2:00 PM</option>
                <option value="3:00 PM">3:00 PM</option>
                <option value="4:00 PM">4:00 PM</option>
                <option value="5:00 PM">5:00 PM</option>
                <option value="6:00 PM">6:00 PM</option>
                <option value="7:00 PM">7:00 PM</option>
                <option value="8:00 PM">8:00 PM</option>
              </select>
             
            </div>
            <div className="mb-4">
              <label
                htmlFor="endHour"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Hora de Finalización
              </label>
              <select
                id="endHour"
                name="endHour"
                value={formik.values.endHour}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="7:00 AM">7:00 AM</option>
                <option value="8:00 AM">8:00 AM</option>
                <option value="9:00 AM">9:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="12:00 PM">12:00 PM</option>
                <option value="1:00 PM">1:00 PM</option>
                <option value="2:00 PM">2:00 PM</option>
                <option value="3:00 PM">3:00 PM</option>
                <option value="4:00 PM">4:00 PM</option>
                <option value="5:00 PM">5:00 PM</option>
                <option value="6:00 PM">6:00 PM</option>
                <option value="7:00 PM">7:00 PM</option>
                <option value="8:00 PM">8:00 PM</option>
                {/* Agrega más opciones de hora según sea necesario */}
              </select>
             
              {formik.touched.endHour && formik.errors.endHour ? (
                <div className="text-red-500 font-bold">
                  {formik.errors.endHour}
                </div>
              ) : null}
            </div>
           
            <button
              type="submit"
              className="bg-green-400 hover:bg-green-500 text-black font-bold py-2 px-4 rounded w-full"
            >
              Agregar
            </button>
          </form>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-center py-8">
        Entrenamientos Almacenados
      </h2>
      <br></br>
      <div className="w-full px-4 bg-white">
     
        <div className="max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8">
        {trainings.map((training) => (
          <div className="w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300"  key={training.id}>
            <img
              className="w-20 mx-auto mt-[-3rem] bg-white"
            />
           
              <div
                key={training.id}
                className="bg-white p-4 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 relative"
              >
                <h2 className="text-xl font-semibold mb-2 relative z-10">
                  {training.name}
                </h2>
                <p className="text-gray-600 relative z-10">
                  {training.description}
                </p>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">Horarios Disponibles:</h3>
                  <ul className="mt-2">
                   
                      <li className="mb-2">
                        <strong>{training.day}</strong> - {training.startHour} a {training.endHour}
                       
                      </li>
                 
                  </ul>
                </div>
              </div>
            
          </div>
            ))}
        </div>
       
      </div>
     
    </>
  );
};

export default Class;
