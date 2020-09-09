import React from "react";

export const Header = ({ navItems, handleClick }) => {
  return (
    <header>
      Loft Taxi
      <nav>
        <ul>
          {navItems.map(({ label, href, isActive }) => {
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
