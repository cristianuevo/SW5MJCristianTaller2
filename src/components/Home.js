import React, { useState } from "react";
import "../css/tailwind.css";
import Typed from "react-typed";
import banner from "../img/banner.jpg";
import logo from "../img/logoKoreanGym.png";
import metod from "../img/metod.jpg";
const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  return (
    <>
      <div
        className="text-white"
        style={{
          background: `linear-gradient(rgba(0, 3, 0, 0.7), rgba(0, 3, 0, 0.7)), url(${banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
         <img src={logo} alt="logo" width={"29%"} />
        
        <h1 className="md:text-7xl sm:text-6xl text-5xl font-bold md:py-6 text-center">
          Centro Fitness
        </h1>
        <div className="flex justify-center items-center">
          <p className="md:text-5xl sm:text-4xl text-xl font-bold py-4">
            Vive La Mejor Experiencia en 
          </p>
          <Typed
            className="md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2"
            strings={["KOREAN", "GYM"]}
            typeSpeed={120}
            backSpeed={140}
            loop
          />
        </div>
        <p className="md:text-2xl text-xl font-bold text-gray-500 text-center">
          Medellín, Colombia 💪
        </p>
       
      </div>
      <div className="w-full bg-white py-20 px-10">
        <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
          <img className="w-[800px] mx-auto my-4" src={metod} alt="metod img" />
          <div className="flex flex-col justify-center">
            <p className="text-[#00df9a] font-bold text-5xl text-center">¿Quienes Somos?</p>
            <br></br>
            <h1 className="md:text-4xl sm:text-2xl text-2xl font-bold py-2">
              KOREAN GYM es un lugar de refugio, bienestar y transformación.
            </h1>
            <p>
              Nuestro gimnasio está diseñado para inspirarte a alcanzar tus
              metas de fitness y salud. Ofrecemos una amplia gama de programas
              de entrenamiento, un equipo de entrenadores apasionados y un
              ambiente acogedor donde cada paso de tu viaje hacia una vida más
              saludable es apoyado. 🏋️‍♀️
            </p>
            <button
              className="bg-green-400 hover:bg-green-500 w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3 text-black"
              onClick={toggleModal}
            >
              Metodología
            </button>

            {/* modal con metodologias  */}
            {modalOpen && (
              <div className="modal ">
                <div className="modal-content">
                
                  <div className="w-full h-[400%] pt-[500%] sm:pt-[100%] md:pt-[10%] px-4  bg-white">
                    <div className="max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8">
                   
                      <div className="w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
                        <img
                          className="w-20 mx-auto mt-[-3rem] bg-white"
                        />
                        <h2 className="text-3xl font-bold text-center py-8">
                        Entrenamiento de Intensidad
                        </h2>
                        <p className="text-justify text-1xl ">El HIIT es una metodología de entrenamiento que combina ráfagas cortas de ejercicio de alta intensidad con períodos de descanso o ejercicio de baja intensidad. Esta metodología se enfoca en quemar calorías de manera eficiente y mejorar la resistencia cardiovascular en un tiempo más corto.</p>
                      </div>
                      <div className="w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
                        <img
                          className="w-20 mx-auto mt-[-3rem] bg-white"
                        />
                        <h2 className="text-3xl font-bold text-center py-8">
                        Entrenamiento Funcional
                        </h2>
                        <p className="text-justify text-1xl ">El entrenamiento funcional se centra en mejorar la fuerza y la resistencia de manera que se apliquen a las actividades diarias. Los ejercicios se diseñan para imitar movimientos naturales y se utilizan múltiples grupos musculares al mismo tiempo. Este enfoque puede ayudar a mejorar la coordinación, el equilibrio y la estabilidad, además de la fuerza.</p>
                      </div>
                      <div className="w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
                        <img
                          className="w-20 mx-auto mt-[-3rem] bg-white"
                        />
                        <h2 className="text-3xl font-bold text-center py-8">
                        Yoga y Pilates
                        </h2>
                        <p className="text-justify text-1xl ">Tanto el yoga como el pilates se centran en mejorar la flexibilidad, el equilibrio, la fuerza del núcleo y la conciencia corporal. El yoga se enfoca en la conexión mente-cuerpo a través de la práctica de posturas y la respiración, mientras que el pilates se centra en ejercicios de resistencia controlada. Ambas metodologías son ideales para reducir el estrés y mejorar la salud general.</p>
                      </div>
                    
                  
                     
                    </div>
                    <button onClick={toggleModal} className='bg-red-700 rounded-lg text-white p-3 mb-0'>Cerrar</button>
                  </div>
                 
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
