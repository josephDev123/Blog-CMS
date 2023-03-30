import React from 'react'

export default function FallbackUi() {
  const style = {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.5rem',
    background: '#DCDCDC'
  }

  return (
    <div style={style}> <span>&#128545</span> Something went wrong </div>
  )
}
