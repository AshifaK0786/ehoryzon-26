import React from 'react';

export default function TestPage() {
  return (
    <div style={{ 
      backgroundColor: 'black', 
      color: 'white', 
      minHeight: '100vh', 
      padding: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    }}>
      <h1 style={{ color: '#ffd300', fontSize: '3rem', marginBottom: '20px' }}>
        E-Horyzon 2026
      </h1>
      <p style={{ fontSize: '1.2rem', textAlign: 'center' }}>
        React is working! The page is loading successfully.
      </p>
      <div style={{ marginTop: '20px' }}>
        <button 
          style={{
            backgroundColor: '#ffd300',
            color: 'black',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            fontSize: '1rem',
            cursor: 'pointer'
          }}
          onClick={() => alert('Button clicked!')}
        >
          Test Button
        </button>
      </div>
    </div>
  );
}