import React, { Component } from 'react'
import './App.css'
import Table from './Table'
import generator from './generator'

class App extends Component {
  handleClick = ({ name, last_name, age }) => {
    alert(`${name} ${last_name} ${age}`)
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
        <Table
          columns={columns}
          data={d}
          pagination={10}
          searchPlaceholder="Search"
          emptyText={() => 'No data found :('}
        />
      </div>
    )
  }
}

export default App
