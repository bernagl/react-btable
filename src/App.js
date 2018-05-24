import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import Table from './Table'

const data = [
  {
    nombre: 'Luis',
    apellido: 'García',
    edad: 23
  },
  {
    nombre: 'Berna',
    apellido: 'García',
    edad: 23
  },
  {
    nombre: 'Bebo',
    apellido: 'García',
    edad: 23
  }
]

class App extends Component {
  handleClick = e => {
    console.log(e)
  }

  render() {
    const columns = [
      {
        label: 'Nombre',
        key: 'nombre',
        Render: props => (
          <span className="d" onClick={() => this.handleClick(props)}>
            {props.nombre}
          </span>
        )
      },
      {
        label: 'Apellido',
        key: 'apellido'
      },
      { label: 'Edad', key: 'edad' },
      {
        label: 'Acciones',
        key: 'actions',
        Render: props => (
          <span className="d" onClick={() => this.handleClick(props)}>
            X
          </span>
        )
      }
    ]
    return (
      <div className="App">
        <h1>Hola</h1>
        <Table columns={columns} data={data} />
      </div>
    )
  }
}

export default App
