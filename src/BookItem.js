import React from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

class BookItem extends React.Component {
  state = {
    shelf: this.props.book.shelf
  }

  onSelect(shelf) {
    this.setState({shelf: shelf})
    this.props.book.shelf = shelf
    BooksAPI.update(this.props.book, shelf).then(() => {
      this.props.onChangeShelf(this.props.book)
    })
  }

  render() {
    const book = this.props.book

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url('+ book.imageLinks.thumbnail + ')' }}></div>
          <div className="book-shelf-changer">
            <select onChange={(event) => this.onSelect(event.target.value)} value={this.state.shelf}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors.join(', ')}
        </div>
      </div>
    )
  }
}

BookItem.propTypes = {
  book: PropTypes.object.isRequired,
  onChangeShelf: PropTypes.func.isRequired
}

export default BookItem
