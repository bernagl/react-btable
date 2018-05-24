import React, { Component } from 'react'

export default class Datatable extends Component {
  static Td = icon => <td>{icon}</td>

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
          ? data.filter(
              element =>
                element[key].toLowerCase().search(search) >= 0 && element
            )
          : null
      }
    })
  }

  render() {
    const {
      columns,
      data: d,
      handleDelete,
      handleEdit,
      handleView
    } = this.props
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
                      <span>{col.label}</span>
                      <br />
                      {selectedCol === i && (
                        <input
                          type="text"
                          onChange={({ target: { value } }) =>
                            this.setSearchText(value)
                          }
                          className="show-search-input"
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
                {columns.map(({ key, Render }, j) => (
                  <td key={j}>
                    {Render ? <Render {...element} /> : element[key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}
