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
  handleClick = ({ nombre, apellido, edad }) => {
    alert(`${nombre} ${apellido} ${edad}`)
  }

  render() {
    const columns = [
      {
        label: 'Name',
        key: 'name',
        Render: props => (
          <span className="d" onClick={() => this.handleClick(props)}>
            {props.name}
          </span>
        )
      },
      {
        label: 'Last name',
        key: 'last_name'
      },
      { label: 'Age', key: 'age' },
      {
        label: 'Actions',
        key: 'actions',
        Render: props => (
          <span className="d" onClick={() => this.handleClick(props)}>
            View
          </span>
        )
      }
    ]
    const d = generator(10000)
    return (
      <div className="App">
        <Table columns={columns} data={d} pagination={10} searchPlaceholder="Search" emptyText="No data found :(" />
      </div>
    )
  }
}

export default App
