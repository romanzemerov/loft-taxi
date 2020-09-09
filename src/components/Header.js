import React from "react";

export const Header = ({ navItems }) => {
  return (
    <header>
      Loft Taxi
      <nav>
        <ul>
          {navItems.map(({ label, href }) => (
            <li key={label}>
              <a href={href}>{label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
