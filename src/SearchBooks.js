import React, { Component } from 'react';
import find from 'lodash/find';
import { Debounce } from 'react-throttle';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BookItem from './BookItem';

const SEARCH_LIMIT = 10;

class SearchBooks extends Component {
  state = {
    isLoading: false,
    query: '',
    books: [],
    booksOnShelfs: [],
    errorMessage: ''
  };

  componentDidMount() {
    // Keep Shelfs to provide correct shelfs for books
    BooksAPI.getAll().then(booksOnShelfs => {
      this.setState({ booksOnShelfs });
    });
  }

  onSearchBooks = event => {
    const queryStr = event.target.value.trim();
    this.setState({
      isLoading: true,
      errorMessage: ''
    });

    BooksAPI.search(queryStr, SEARCH_LIMIT).then(books => {
      if (books.error) {
        this.setState({
          errorMessage: books.error,
          books: []
        });
      } else {
        this.setState({
          books: books.map(book => {
            const bookOnShelf = find(this.state.booksOnShelfs, { id: book.id });
            if (bookOnShelf) {
              book.shelf = bookOnShelf.shelf;
            }
            return book;
          }),
          query: queryStr
        });
      }
      this.setState({ isLoading: false });
    });
  };

  onChangeShelf = book => {
    this.setState(state => ({
      books: state.books.map(function(b) {
        if (b.id === book.id) {
          b = book;
        }
        return b;
      })
    }));
  };

  render() {
    const books = this.state.books;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <Debounce time="1000" handler="onChange">
              <input
                type="text"
                placeholder="Search by title or author"
                onChange={this.onSearchBooks}
              />
            </Debounce>
          </div>
        </div>
        <div className="search-books-results">
          {this.state.errorMessage &&
            <div className="error-message">
              {this.state.errorMessage}
            </div>}

          {this.state.isLoading
            ? <h2>Loading...</h2>
            : <ol className="books-grid">
                {books.map((book, i) =>
                  <li key={book.id + '_' + i}>
                    <BookItem book={book} onChangeShelf={this.onChangeShelf} />
                  </li>
                )}
              </ol>}
        </div>
      </div>
    );
  }
}

export default SearchBooks;
