import * as React from 'react';

export const Footer = () => {
  return(
    <>
    <div style={
      { height: '64px',
        width: '100vw',
        display: 'flex',
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: '#1976d2',
        color: '#fff',
        position: 'absolute',
        bottom: '0',
        left: '0',
      }
    }>
      <p>©️2023 piggy bank 365</p>
    </div>
    </>
  )
}