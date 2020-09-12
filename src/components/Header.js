import React from 'react';

const NAV_LIST = [
  { label: 'Карта', linkTo: 'map' },
  { label: 'Профиль', linkTo: 'profile' },
  { label: 'Логин', linkTo: 'login' },
];

export const Header = ({ currentPage, handleChangePage }) => {
  const handleClick = (e) => {
    handleChangePage(e.target.dataset.linkTo);
  };

  return (
    <header>
      Loft Taxi
      <nav>
        <ul>
          {NAV_LIST.map(({ label, linkTo }) => {
            const isActive = currentPage === linkTo;

            return (
              <li key={label}>
                <button
                  style={{ pointerEvents: isActive ? 'none' : 'auto' }}
                  data-link-to={linkTo}
                  type={'button'}
                  onClick={handleClick}
                >
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};
