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

  componentDidMount() {
    const { data, pagination } = this.props
    this.setState(() => ({ pages: Math.ceil(data.length / pagination) }))
  }

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
      console.log(data, text)
      return {
        result: data.filter(
          element =>
            JSON.stringify(element)
              .toLowerCase()
              .search(text) >= 0 && element
        ),
        search: '',
        currentPage: 1
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
  // handleInputPaginate = value => {
  //   this.setState({ currentPage: value })
  // }

  handlePaginate = currentPage => {
    this.setState(({ pages, currentPage: cp }) => {
      return {
        currentPage: currentPage <= pages ? currentPage : pages
      }
    })
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
    const cp = currentPage ? currentPage : 1
    const pages = Math.ceil(data.length / pagination)
    const start = pagination * (cp === 1 ? 0 : cp - 1)
    const end = pagination * cp
    const currentData = data.slice(start, end)
    console.log(currentData)
    return (
      <div id="btable">
        <div className="table-header">
          <input
            type="text"
            onChange={({ target: { value } }) => this.globalSearch(value)}
            className="global-search-input"
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
              <tr className="row" key={i}>
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
          <button
            onClick={() => this.handlePaginate(currentPage - 1)}
            disabled={currentPage - 1 === 0 ? true : false}
          >
            {'<'}
          </button>
          {/* {Array.from({ length: pages }, (item, i) => (
            <button
              onClick={() => this.handlePaginate(i + 1)}
              disabled={currentPage === i + 1 ? true : false}
            >
              {i + 1}
            </button>
          ))} */}
          <input
            type="number"
            value={currentPage}
            min="1"
            max={pages}
            onChange={({ target: { value } }) => this.handlePaginate(value)}
          />
          <span>of {pages}</span>
          <button
            onClick={() => this.handlePaginate(currentPage + 1)}
            disabled={currentPage >= pages ? true : false}
          >
            {'>'}
          </button>
        </div>
      </div>
    )
  }
}
