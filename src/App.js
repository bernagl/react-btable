import React, { Component } from 'react'
import logo from './logo.svg'
// import './App.css';
import Table from './Table'

const data = [
  { nombre: 'Luis', apellido: 'García', edad: 23 },
  { nombre: 'Berna', apellido: 'García', edad: 23 },
  { nombre: 'Bebo', apellido: 'García', edad: 23 }
]

const columns = [
  { label: 'Nombre', key: 'nombre' },
  { label: 'Apellido', key: 'apellido' },
  { label: 'Edad', key: 'edad' }
]

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Hola</h1>
        <Table columns={columns} data={data} />
      </div>
    )
  }
}

export default App
