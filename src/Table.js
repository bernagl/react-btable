import React, { Component } from 'react'

export default class Datatable extends Component {
  state = {
    selectedCol: 0,
    search: '',
    result: null
  }

  setSelectedCol = selectedCol => {
    this.setState({ selectedCol })
  }

  setSearchText = search => {
    const { columns, data } = this.props
    this.setState(({ selectedCol }) => {
      const { key } = columns[selectedCol]
      return {
        result: search
          ? data.filter(element => element[key].search(search) >= 0 && element)
          : null
      }
    })
  }

  //   onSearch = () => {
  //     const { data, search, selectedCol } = this.state
  //     this.setState(({ data, search, selectedCol }) => {
  //       const { key } = data[selectedCol]

  //     })
  //   }

  render() {
    const { columns, data: d } = this.props
    const { result, selectedCol } = this.state
    const data = result ? result : d
    // console.log(this.state)
    return (
      <div id="datatable">
        <div className="table-header">
          <button onClick={this.onSearch}>b</button>
        </div>
        <table>
          <thead>
            <tr>
              {columns.map((col, i) => (
                <React.Fragment>
                  <th onClick={() => this.setSelectedCol(i)}>
                    <div>
                      {i}
                      {col.label}
                      {selectedCol === i && (
                        <input
                          type="text"
                          onChange={({ target: { value } }) =>
                            this.setSearchText(value)
                          }
                        />
                      )}
                    </div>
                  </th>
                </React.Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((element, i) => (
              <tr key={i}>
                {columns.map(({ key }, j) => <td key={j}>{element[key]}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}
