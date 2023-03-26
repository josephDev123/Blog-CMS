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
    <div style={style}> &#128545 Something went wrong</div>
  )
}
