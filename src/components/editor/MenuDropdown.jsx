import React, { useEffect } from 'react';
import './index.css';

function DropdownItem({ item }) {
  return (
    <div onClick={item.onClick} className='menu-dropdown-item'>
      {item.icon}
      <span style={{ marginLeft: '5px' }}>{item.label}</span>
      {item.keyboard && (
        <span
          style={{
            position: 'absolute',
            right: 8,
            color: '#ccc',
          }}
        >
          {item.keyboard}
        </span>
      )}
    </div>
  );
}

export default function MenuDropdown(props) {
  const { option, isShow, setIsShow, menuDropdownStyle, menuDropdownRef } =
    props;

  const onMousedownDocument = (e) => {
    if (!menuDropdownRef.current?.contains(e.target)) {
      setIsShow(false);
    }
  };

  useEffect(() => {
    document.body.addEventListener('mousedown', onMousedownDocument, true);
    return () => {
      document.body.removeEventListener('mousedown', onMousedownDocument);
    };
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        display: isShow ? 'block' : 'none',
        zIndex: 999,
        ...menuDropdownStyle,
      }}
      ref={menuDropdownRef}
      className='menu_dropdown'
    >
      {option?.content?.map((item) => {
        return <DropdownItem item={item} key={item.key} />;
      })}
    </div>
  );
}
