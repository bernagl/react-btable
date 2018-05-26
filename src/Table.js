import React, { Component } from 'react'

export default class Datatable extends Component {
  static Td = icon => <td>{icon}</td>

  state = {
    selectedCol: 0,
    // index: 1,
    search: '',
    result: null,
    currentPage: 1,
    pages: 0
  }

  // componentDidMount() {
  //   const { data, pagination } = this.props
  //   this.setState(() => ({ pages: Math.ceil(data.length / pagination) }))
  // }

  setSelectedCol = selectedCol => {
    this.searchByColum()
    this.setState({ selectedCol })
  }

  //   setSearchText = search => {
  //     const { columns, data } = this.props
  //     this.setState(({ selectedCol }) => {
  //       const { key } = columns[selectedCol]
  //       return {
  //         result: search
  //           ? data.filter(
  //               element =>
  //                 element[key].toLowerCase().search(search) >= 0 && element
  //             )
  //           : null
  //       }
  //     })
  //   }

  globalSearch = text => {
    const { columns, data } = this.props
    this.setState(state => {
      return {
        result: data.filter(
          element =>
            JSON.stringify(element)
              .toLowerCase()
              .search(text) >= 0 && element
        ),
        search: ''
      }
    })
  }

  searchByColum = text => {
    const { columns, data } = this.props
    this.setState(({ selectedCol }) => {
      const { key } = columns[selectedCol]
      return {
        result: text
          ? data.filter(
              element => element[key].toLowerCase().search(text) >= 0 && element
            )
          : null,
        search: text
      }
    })
  }

  //   Todo
  handlePaginate = currentPage => {
    this.setState({ currentPage })
  }

  render() {
    const {
      columns,
      data: d,
      handleDelete,
      handleEdit,
      handleView,
      pagination
    } = this.props
    const { currentPage, result, search, selectedCol } = this.state
    const data = result ? result : d

    const pages = Math.ceil(data.length / pagination)
    const start = pagination * (currentPage === 1 ? 0 : currentPage - 1)
    const end = pagination * currentPage
    const currentData = data.slice(start, end)
    return (
      <div id="datatable">
        <div className="table-header">
          <input
            type="text"
            onChange={({ target: { value } }) => this.globalSearch(value)}
            className="show-search-input"
          />
          <button onClick={this.onSearch}>b</button>
        </div>
        <table>
          <thead>
            <tr>
              {columns.map((col, i) => (
                <React.Fragment>
                  <th
                    onClick={!col.Render ? () => this.setSelectedCol(i) : null}
                  >
                    <div>
                      <span>{col.label}</span>
                      <br />
                      {selectedCol === i && (
                        <input
                          type="text"
                          value={search}
                          onChange={({ target: { value } }) =>
                            this.searchByColum(value)
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
            {/* {data.map((element, i) => (
              <tr key={i}>
                {columns.map(({ key, Render }, j) => (
                  <td key={j}>
                    {Render ? <Render {...element} /> : element[key]}
                  </td>
                ))}
              </tr>
            ))} */}
            {currentData.map((element, i) => (
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
        <div className="pagination">
          {Array.from({ length: pages }, (item, i) => (
            <button onClick={() => this.handlePaginate(i + 1)}>{i + 1}</button>
          ))}
        </div>
      </div>
    )
  }
}
