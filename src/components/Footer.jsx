import * as React from 'react';

export const Footer = () => {
  return(
    <>
    <div className="footer"
          style={
            { height: '64px',
              width: '100vw',
              display: 'flex',
              justifyContent:'center',
              alignItems: 'center',
              backgroundColor: '#1976d2',
              color: '#fff',
              position: 'fixed',
              bottom: '0',
              left: '0',
              fontFamily:"Moirai One, cursive"
            }
          }>
      <p>©️2023 piggy bank 365</p>
    </div>
    </>
  )
}