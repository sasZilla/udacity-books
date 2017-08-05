import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BooksShelf from './BooksShelf';

class BooksList extends React.Component {
  state = {
    isLoading: false,
    books: []
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    BooksAPI.getAll()
      .then(books => {
        this.setState({ books, isLoading: false });
      })
      .catch(() => {
        this.setState({ isLoading: false });
      });
  }

  onChangeShelf = book => {
    this.setState(state => ({
      books: state.books.map(function(b) {
        if (b.id === book.id) {
          b.shelf = book.shelf;
        }
        return b;
      })
    }));
  };

  render() {
    const books = this.state.books;
    const bookShelfs = [
      {
        title: 'Currently Reading',
        books: books.filter(b => b.shelf === 'currentlyReading')
      },
      {
        title: 'Want to Read',
        books: books.filter(b => b.shelf === 'wantToRead')
      },
      {
        title: 'Read',
        books: books.filter(b => b.shelf === 'read')
      }
    ];

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {this.state.isLoading
            ? <h2>Loading...</h2>
            : bookShelfs.map((shelf, i) =>
                <BooksShelf
                  key={shelf.title + '-' + i}
                  books={shelf.books}
                  title={shelf.title}
                  onChangeShelf={this.onChangeShelf}
                />
              )}
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default BooksList;
