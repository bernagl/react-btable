import React, { Component } from 'react'
import './App.css'
// import Table from './Table'
import generator from './generator'
import Rxtable from 'react-xtable'

class App extends Component {
  state = { data: [] }
  handleClick = ({ name, last_name, age }) => {
    alert(`${name} ${last_name} ${age}`)
  }

  componentDidMount() {
    // setTimeout(() => {
    this.setState({ data: generator(10000) })
    // }, 5000)
  }
  render() {
    const columns = [
      {
        label: 'Name',
        key: 'name',
        Render: element => <span className="d">{element.name}</span>
      },
      { label: 'Age', key: 'age' },
      {
        label: 'Actions',
        key: 'actions',
        Render: element => (
          <span className="d" onClick={() => console.log(element)}>
            View
          </span>
        )
      }
    ]

    return (
      <div className="App">
        <Rxtable
          columns={columns}
          data={this.state.data}
          Loading={() => 'Loading'}
          pagination={10}
          searchPlaceholder="Search"
          emptyText={() => 'No data found :('}
        />
        <div className="button-newdata">
          <button
            onClick={() => {
              this.setState({ data: [] })
              setTimeout(() => {
                this.setState({ data: generator(10000) })
              }, 2000)
            }}
          >
            New data
          </button>
          <br />
          <i>New data with 2s cooldown</i>
        </div>
      </div>
    )
  }
}

export default App
