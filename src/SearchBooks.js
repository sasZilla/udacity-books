import React, { Component } from 'react'
import debounce from 'lodash/debounce'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookItem from './BookItem'

const SEARCH_LIMIT = 10

class SearchBooks extends Component {
  state = {
    isLoading: false,
    query: '',
    books: []
  }

  constructor() {
    super()
    this.searchBooks = debounce(this.searchBooks, 1000)
  }

  searchBooks(query) {
    const queryStr = query.trim()
    this.setState({'isLoading': true})
    BooksAPI.search(queryStr, SEARCH_LIMIT).then((books) => {
      this.setState({
        books,
        query: queryStr,
        isLoading: false
      })
    })
  }

  updateQuery(query) {
    this.setState({ query })
    if (query.length > 0) {
      this.searchBooks(query)
    }
  }

  render() {
    const books = this.state.books

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          {this.state.isLoading ?
            <h2>Loading...</h2>  :
            <ol className="books-grid">
              {books.map((book) => (
                <li key={book.id}>
                  <BookItem book={book} />
                </li>
              ))}
            </ol>
          }
        </div>
      </div>
    )
  }
}

export default SearchBooks
