import React from "react";

export const Header = ({ navList, handleChangePathname }) => {

  const handleClick = (e) => {
    e.preventDefault();
    handleChangePathname(e.target.pathname)
  }
  return (
    <header>
      Loft Taxi
      <nav>
        <ul>
          {navList.map(({ label, href, isActive }) => {
            const link = isActive ? (
              <a>{label}</a>
            ) : (
              <a href={href} onClick={handleClick}>
                {label}
              </a>
            );

            return <li key={label}>{link}</li>;
          })}
        </ul>
      </nav>
    </header>
  );
};
