import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import Table from './Table'
import generator from './generator'

const data = [
  {
    nombre: 'Luis',
    apellido: 'Garci skanksnaknsa',
    edad: 23
  },
  {
    nombre: 'Berfgfzdhna',
    apellido: 'Gafhfhrcía',
    edad: 23
  },
  {
    nombre: 'Berfhfhfh∑na',
    apellido: 'García',
    edad: 23
  },
  {
    nombre: 'Bersdg<dgzna',
    apellido: 'Garfhfhcía',
    edad: 23
  },
  {
    nombre: 'Berfhzfhna',
    apellido: 'Gafhzfhrcía',
    edad: 23
  },
  {
    nombre: 'Berna',
    apellido: 'Gfhfhfarcía',
    edad: 23
  },
  {
    nombre: 'Berna',
    apellido: 'Gzfhfzhzfarcía',
    edad: 23
  },
  {
    nombre: 'Berfhzfhfhna',
    apellido: 'Gfhzfdharcía',
    edad: 23
  },
  {
    nombre: 'Berzfhdfhfna',
    apellido: 'García',
    edad: 23
  },
  {
    nombre: 'Bernssda',
    apellido: 'García',
    edad: 23
  },
  {
    nombre: 'Bersdsdna',
    apellido: 'García',
    edad: 23
  },
  {
    nombre: 'Besdasdfrna',
    apellido: 'García',
    edad: 23
  },
  {
    nombre: 'Befgdfgarna',
    apellido: 'García',
    edad: 23
  },
  {
    nombre: 'Berasgdgna',
    apellido: 'García',
    edad: 23
  },
  {
    nombre: 'dgadsgadsg',
    apellido: 'García',
    edad: 23
  },
  {
    nombre: 'dsgadg',
    apellido: 'García',
    edad: 23
  },
  {
    nombre: 'gasdglk',
    apellido: 'García',
    edad: 23
  },
  {
    nombre: 'jxfgkgj',
    apellido: 'García',
    edad: 23
  },
  {
    nombre: 'Behzdfzfhrna',
    apellido: 'García',
    edad: 23
  },
  {
    nombre: 'shzfhfhzfdh',
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
    const d = generator(10000)
    return (
      <div className="App">
        <h1>Hola</h1>
        <Table columns={columns} data={d} pagination={100} />
      </div>
    )
  }
}

export default App
