import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import logo from "../img/logoKoreanGym.png";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white">
      <div className="w-full flex items-center">
        <a href="/">
          <img src={logo} alt="logo" width={"17%"} />
        </a>

      </div>

      <ul className="hidden md:flex">
        <Link to="/" className="p-4">
          Inicio
        </Link>
        <Link to="/register" className="p-4">
          Registro
        </Link>
        <Link to="/users" className="p-4">
          Usuarios
        </Link>
        <Link to="/class" className="p-4">
          Entrenamientos
        </Link>
        <Link to="/daily" className="p-4">
          Rutinas
        </Link>
      </ul>
      <div onClick={handleNav} className="block md:hidden">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <ul
        className={
          nav
            ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500"
            : "ease-in-out duration-500 fixed left-[-100%]"
        }
      >
        <div className="w-full  m-4">
          <img src={logo} alt="logo" width={"20%"} className="" />
          <h1 className=" text-3xl font-bold text-[#00df9a] ">GymFull </h1>
        </div>

        <li className="p-4 border-b border-gray-600">
          <Link to="/">Home</Link>
        </li>
        <li className="p-4 border-b border-gray-600">
          <Link to="/register">Registro</Link>
        </li>
        <li className="p-4 border-b border-gray-600">
          <Link to="/users">Usuarios</Link>
        </li>
        <li className="p-4 border-b border-gray-600">
          <Link to="/class">Horarios y clases</Link>
        </li>
        <li className="p-4">
          <Link to="/class">Horarios y clases</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
