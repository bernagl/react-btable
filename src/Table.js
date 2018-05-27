import React, { Component } from 'react'

export default class Datatable extends Component {
  static Td = icon => <td>{icon}</td>

  state = {
    selectedCol: 0,
    // index: 1,
    search: '',
    result: null,
    currentPage: 1,
    searchData: [],
    pages: 0,
    currentData: [],
    order: null
  }

  componentDidMount() {
    const { columns, data, pagination } = this.props
    const searchData = data.map(element => {
      let el = ''
      columns.map(col => (el += ` ${element[col.key]}`))
      return el.replace('undefined', '')
    })

    this.stateMiddleware({
      pages: Math.ceil(data.length / pagination),
      result: [...data],
      searchData
    })
    // this.handleSearch()
  }

  setSelectedCol = selectedCol => {
    // this.searchByColum()
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
    const { searchData } = this.state
    // this.setState(({ searchData }) => {
    const result = []
    searchData.map((element, i) => {
      return (
        JSON.stringify(element)
          .toLowerCase()
          .search(text.toLowerCase()) >= 0 && result.push(data[i])
      )
    })
    this.stateMiddleware({
      result,
      search: '',
      currentPage: 1
    })
    // }, this.handleSearch())
  }

  handleSearch = () => {
    // const { data: d, pagination } = this.props
    // const { currentPage, result, search, selectedCol } = this.state
    // const data = result ? result : d
    // const cp = currentPage ? currentPage : 1
    // const pages = Math.ceil(data.length / pagination)
    // const start = pagination * (cp === 1 ? 0 : cp - 1)
    // const end = pagination * cp
    // const currentData = data.slice(start, end)
    // console.log(currentData)
    // this.setState({ currentData, pages })
  }

  sortColumn = ({ key }, o) => {
    const {
      // selectedCol: { key },
      result: r,
      order: so
    } = this.state
    const { data } = this.props
    const result =
      o === so
        ? [...data]
        : o === 'desc'
          ? r.sort((a, b) => (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0))
          : r.sort((a, b) => (a[key] < b[key] ? 1 : a[key] > b[key] ? -1 : 0))
    this.stateMiddleware({ result, order: o === so ? null : o, currentPage: 1 })
  }

  searchByColum = text => {
    const { columns, data } = this.props
    const { selectedCol } = this.state
    // this.setState(({ selectedCol }) => {
    const { key } = columns[selectedCol]
    this.stateMiddleware({
      result: text
        ? data.filter(
            element => element[key].toLowerCase().search(text) >= 0 && element
          )
        : null,
      search: text
    })
    // })
  }

  stateMiddleware = state => {
    const { data: d, pagination } = this.props
    const { currentPage, pages, result, search, selectedCol } = this.state
    const data = state.result ? state.result : result ? result : d
    const cp = state.currentPage ? state.currentPage : 1
    const p = state.pages ? state.pages : Math.ceil(data.length / pagination)
    const start = pagination * (cp === 1 ? 0 : cp - 1)
    const end = pagination * cp
    const currentData = data.slice(start, end)
    this.setState({ ...state, currentData, pages: p })
  }

  //   Todo
  // handleInputPaginate = value => {
  //   this.setState({ currentPage: value })
  // }

  handlePaginate = currentPage => {
    const { currentPage: cp, pages, result } = this.state
    // this.setState(({ pages, currentPage: cp }) => {
    this.stateMiddleware({
      currentPage: currentPage <= pages ? currentPage : pages
      // pages,
      // result
    })
    // })
  }

  render() {
    const {
      columns,
      data: d,
      handleDelete,
      handleEdit,
      handleView,
      pagination,
      emptyText,
      searchPlaceholder,
      title
    } = this.props
    const {
      currentData,
      currentPage,
      pages,
      result,
      search,
      selectedCol,
      order
    } = this.state
    console.log(this.state)
    console.log(this.props)
    // const data = result ? result : d
    // const cp = currentPage ? currentPage : 1
    // const pages = Math.ceil(data.length / pagination)
    // const start = pagination * (cp === 1 ? 0 : cp - 1)
    // const end = pagination * cp
    // const currentData = data.slice(start, end)
    // console.log(currentData)

    return (
      <div id="btable">
        <div className="table-header">
          <h1 className="title">{title ? title : 'BTable'}</h1>
          <input
            type="text"
            onChange={({ target: { value } }) => this.globalSearch(value)}
            className="global-search-input"
            placeholder={searchPlaceholder ? searchPlaceholder : 'Search'}
          />
        </div>
        <table>
          <thead>
            <tr>
              {columns.map((col, i) => (
                <React.Fragment>
                  <th
                    onClick={() => this.setSelectedCol(i)}
                    // onClick={!col.Render ? () => this.setSelectedCol(i) : null}
                  >
                    <div className="header-container">
                      <span>{col.label}</span>
                      <br />
                      {/* {selectedCol === i && (
                        <input
                          type="text"
                          value={search}
                          onChange={({ target: { value } }) =>
                            this.searchByColum(value)
                          }
                          className="show-search-input"
                        />
                      )} */}
                      {col.Render || (
                        <React.Fragment>
                          <span
                            onClick={() => this.sortColumn(col, 'desc')}
                            className={`caret caret-up ${i === selectedCol &&
                              order === 'desc' &&
                              'active'} `}
                          />
                          <span
                            onClick={() => this.sortColumn(col, 'asc')}
                            className={`caret caret-down ${i === selectedCol &&
                              order === 'asc' &&
                              'active'}`}
                          />
                        </React.Fragment>
                      )}
                    </div>
                    {/* <div className="caret-container">
                    </div> */}
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
        <div className="footer">
          {currentData.length <= 0 && (
            <div className="empty-table">
              {emptyText ? emptyText : 'No data found'}
            </div>
          )}
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
            <span className="pagination-total">of {pages}</span>
            <button
              onClick={() => this.handlePaginate(currentPage + 1)}
              disabled={currentPage >= pages ? true : false}
            >
              {'>'}
            </button>
          </div>
        </div>
      </div>
    )
  }
}
