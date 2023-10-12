import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FirebaseContext } from "../firebase";
import { useNavigate } from "react-router";

const Register = () => {
  const { firebase } = useContext(FirebaseContext);
  const navigate = useNavigate();
  //inicializar campos
  const formik = useFormik({
    initialValues: {
      name: "",
      cc: "",
      userName: "",
      email: "",
      password: "",
    },
    //validación de los errores
    validationSchema: Yup.object({
      name: Yup.string()
        .min(4, "El nombre debe tener minimo 4 caraecteres")
        .required("El nombre es requerido"),
      cc: Yup.number()
        .min(7, "La cedula debe contener por lo menos 7 números")
        .required("La cedula es requerida"),
      userName: Yup.string()
        .min(4, "El usuario debe tener minimo 4 caraecteres")
        .required("El Usuario es requerido"),
      email: Yup.string()
        .email("El correo electrónico no es válido")
        .required("El correo electrónico es requerido"),
      password: Yup.string()
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .required("La contraseña es requerida"),
    }),
    onSubmit: async (values) => {
        try {
          // Verifica si ya existe un usuario con el mismo nombre de usuario
          const existingUserByUsername = await firebase.db
            .collection("users")
            .where("userName", "==", values.userName)
            .get();
      
          // Verifica si ya existe un usuario con el mismo correo electrónico
          const existingUserByEmail = await firebase.db
            .collection("users")
            .where("email", "==", values.email)
            .get();
      
          if (!existingUserByUsername.empty) {
            window.alert("El nombre de usuario ya está en uso.");
          } else if (!existingUserByEmail.empty) {
            window.alert("El correo electrónico ya está en uso.");
          } else {
            await firebase.db.collection("users").add(values);
            window.alert("Registro exitoso");
            navigate("/users");
          }
        } catch (error) {
          window.alert("Registro no exitoso, causa --> " + error);
        }
      },
  });
  return (
    <>
     
      <h2 className="text-3xl font-bold text-center py-8">
        Registrar Usuarios
      </h2>
      <div className="flex justify-center">
        <form className="w-full max-w-lg" onSubmit={formik.handleSubmit}>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Nombre Completo
                </label>
                <input
                    className="appearance-none block w-full  text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                </div>
                {/* mostrar errores validaciones */}
                {formik.touched.name && formik.errors.name ? (
                    <div>
                        <p className="text-red-500 font-bold">Ocurrio un error</p>
                        <p>{formik.errors.name}</p>
                    </div>
                ):null}
                <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Cedula
                </label>
                <input
                    className="appearance-none block w-full  text-gray-700 border border-blue-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="number"
                    name="cc"
                    value={formik.values.cc}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                </div>
                {/* mostrar errores validaciones */}
                {formik.touched.cc && formik.errors.cc ? (
                    <div>
                        <p className="text-red-500 font-bold">Ocurrio un error</p>
                        <p>{formik.errors.cc}</p>
                    </div>
                ):null}
                <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Usuario
                </label>
                <input
                    className="appearance-none block w-full  text-gray-700 border border-blue-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    name="userName"
                    value={formik.values.userName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                </div>
                {/* mostrar errores validaciones */}
                {formik.touched.userName && formik.errors.userName ? (
                    <div>
                        <p className="text-red-500 font-bold">Ocurrio un error</p>
                        <p>{formik.errors.userName}</p>
                    </div>
                ):null}
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Email
                    </label>
                    <input
                    className="appearance-none block w-full  text-gray-700 border border-blue-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    />
                </div>
                {/* mostrar errores validaciones */}
                {formik.touched.email && formik.errors.email ? (
                    <div>
                        <p className="text-red-500 font-bold">Ocurrio un error</p>
                        <p>{formik.errors.email}</p>
                    </div>
                ):null}
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Contraseña
                    </label>
                    <input
                    className="appearance-none block w-full  text-gray-700 border border-blue-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    />
                </div>
                {/* mostrar errores validaciones */}
                {formik.touched.password && formik.errors.password ? (
                    <div>
                        <p className="text-red-500 font-bold">Ocurrio un error</p>
                        <p>{formik.errors.password}</p>
                    </div>
                ):null}       
                <button
                type="submit"
                className="bg-green-400 hover:bg-green-500 text-black font-bold py-2 px-4 rounded"
                 >
                Registrar
                </button>
            </div>

        
        </form>
      </div>
    </>
  );
};

export default Register;
