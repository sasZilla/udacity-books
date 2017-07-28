import React from 'react'
import PropTypes from 'prop-types'
import BookItem from './BookItem'

class BookShelf extends React.Component {
  render() {
    const books = this.props.books
    const title = this.props.title

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <ol className="books-grid">
          {books.map((book) => (
            <li key={book.id}>
              <BookItem book={book} />
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

BookShelf.PropTypes = {
  books: PropTypes.array,
  title: PropTypes.string.isRequired
}

export default BookShelf
