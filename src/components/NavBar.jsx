"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [theme, setTheme] = useState("light");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navMenu = (
  <>
    <li>
      <Link href="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
    </li>
    <li>
      <Link href="/about" onClick={() => setMobileMenuOpen(false)}>About</Link>
    </li>
    <li>
      <Link href="/service" onClick={() => setMobileMenuOpen(false)}>Service</Link>
    </li>
    <li>
      <Link href="/bolg" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
    </li>
    <li>
      <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact </Link>
    </li>
  </>
    );
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") || "light";
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  const handleThemeChange = (e) => {
    const newTheme = e.target.value;
    setTheme(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-sm px-2 md:px-6 lg:px-12 relative">
      {/* Navbar Start */}
      <div className="navbar-start">
        <Link href={"/"} className=" text-xl">
          <Image src={"/assets/logo.svg"} width={107} height={87} />
        </Link>
      </div>

      {/* Mobile Dropdown Toggle */}
      <div className="navbar-end lg:hidden relative">
        <button
          className="btn btn-ghost"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <ul className="menu menu-compact dropdown-content mt-2 p-2 shadow bg-base-100 rounded-box w-52 absolute right-0 top-12 z-50">
            {navMenu}

            {/* Mobile Theme Selector */}
            <li className="mt-2">
              <select
                className="select select-bordered select-sm w-full"
                value={theme}
                onChange={(e) => {
                  handleThemeChange(e);
                  setMobileMenuOpen(false); // close menu on theme change
                }}
              >
                <option value="light">🌞 Light</option>
                <option value="dark">🌙 Dark</option>
                <option value="cupcake">🧁 Cupcake</option>
              </select>
            </li>

            {/* Mobile Login Button */}
            <li className="mt-2">
              <a
                className="btn btn-sm w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                Appointment
              </a>
            </li>
          </ul>
        )}
      </div>

      {/* Navbar Center for Desktop */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navMenu}
        </ul>
      </div>

      {/* Navbar End for Desktop */}
      <div className="navbar-end hidden lg:flex gap-2">
        <select
          className="select select-bordered select-sm"
          value={theme}
          onChange={handleThemeChange}
        >
          <option value="light">🌞 Light</option>
          <option value="dark">🌙 Dark</option>
          <option value="cupcake">🧁 Cupcake</option>
        </select>
        <a className="btn btn-sm">Appointment</a>
      </div>
    </div>
  );
}
