import React from "react";

export const Header = ({ navItems, handleClick }) => {
  return (
    <header>
      Loft Taxi
      <nav>
        <ul>
          {navItems.map(({ label, href, isActive }) => (
            <li key={label}>
              <a href={isActive ? null : href} onClick={handleClick}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
