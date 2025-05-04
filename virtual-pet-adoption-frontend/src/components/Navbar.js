import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPaw,  FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/add-pet", label: "Add Pet" },
  ];

  const logoVariants = {
    hover: {
      rotate: [0, -10, 10, -10, 0],
      transition: { duration: 0.5 },
    },
  };

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <nav className="sticky top-0 z-50 text-white bg-purple-700 shadow-lg">
      <div className="container px-4 py-4 mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              variants={logoVariants}
              whileHover="hover"
              className="flex items-center"
            >
              <FaPaw className="mr-2 text-2xl" />
              <span className="text-xl font-bold">Pet Adoption Center</span>
            </motion.div>
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 focus:outline-none"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <motion.div
            className="hidden space-x-6 md:flex"
            initial="hidden"
            animate="visible"
            variants={navVariants}
          >
            {navItems.map((item) => (
              <motion.div key={item.path} variants={itemVariants}>
                <Link
                  to={item.path}
                  className={`px-4 py-2 rounded-md text-lg ${
                    location.pathname === item.path
                      ? "bg-purple-000 font-medium"
                      : "hover:bg-purple-600"
                  } transition-colors duration-200`}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
            
            <motion.div variants={itemVariants}>
              <Link
                to="/quiz"
                className="px-4 py-2 text-lg text-white rounded-md hover:bg-purple-600"
              >
                Personality Quiz
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="pb-4 mt-4 md:hidden"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-6 py-2 rounded-md text-lg ${
                    location.pathname === item.path
                      ? "bg-purple-900 font-medium"
                      : "hover:bg-purple-600"
                  } transition-colors duration-200`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {/* <Link
                to="/add-pet"
                className="flex items-center px-6 py-2 text-lg bg-green-500 rounded-md hover:bg-green-600"
                onClick={() => setIsOpen(false)}
              >
                <FaPlus className="mr-2" /> Add New Pet
              </Link> */}
              <Link
                to="/quiz"
                className="px-6 py-2 text-lg text-white rounded-md hover:bg-purple-600"
                onClick={() => setIsOpen(false)}
              >
                Personality Quiz
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
