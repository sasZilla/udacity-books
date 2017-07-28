import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BooksShelf from './BooksShelf'

class BooksList extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  render() {
    const books = this.state.books
    const bookShelfs = [
      {
        title: 'Currently Reading',
        books: books.filter((b) => b.shelf === 'currentlyReading')
      },
      {
        title: 'Want to Read',
        books: books.filter((b) => b.shelf === 'wantToRead')
      },
      {
        title: 'Read',
        books: books.filter((b) => b.shelf === 'read')
      }
    ]

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {bookShelfs.map((shelf,i) => (
              <BooksShelf key={shelf.title + '-' + i} books={shelf.books} title={shelf.title} />
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BooksList
