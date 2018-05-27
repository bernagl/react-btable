import React, { Component } from 'react'
import './App.css'
import Table from './Table'
import generator from './generator'
// import Rxtable from 'react-xtable'

class App extends Component {
  state = { data: [] }
  handleClick = ({ name, last_name, age }) => {
    alert(`${name} ${last_name} ${age}`)
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ data: generator(10000) })
    }, 5000)
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

    return (
      <div className="App">
        <Table
          columns={columns}
          data={this.state.data}
          // Loading={() => 'Loading'}
          // pagination={10}
          // searchPlaceholder="Search"
          // emptyText={() => 'No data found :('}
        />
        <button
          onClick={() => {
            this.setState({ data: [] })
            setTimeout(() => {
              this.setState({ data: generator(100) })
            }, 2000)
          }}
        >
          New data
        </button>
      </div>
    )
  }
}

export default App
