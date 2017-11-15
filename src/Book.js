import React, { Component } from 'react'
import PropTypes from 'prop-types'
import titleCase from 'title-case'
import ReactStars from 'react-stars'

class Book extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    updateBook: PropTypes.func.isRequired,
    isSearch: PropTypes.bool.isRequired
  }

  render(){

    const {book, updateBook, isSearch} = this.props

    return(
      <li key={book.id}>
        <div className="book">
          <div className="book-top">
            {/* show or hide book shelf label */}
            { book.shelf && book.shelf !== 'none' && isSearch ?
              <div className="bookshelf-label">{titleCase(book.shelf)}</div> : ''
            }
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
            <div className="book-shelf-changer">
              <select value={book.shelf ? book.shelf : 'none'} onChange={(e) => updateBook(book, e.target.value)}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          { book.subtitle ?  <div className="book-subtitle">{book.subtitle}</div> : '' }
          <div className="book-authors">
            { book.authors ?
              book.authors.map( (author, i) => (
                <span className="book-author" key={`book-author-${i}`}>{author}</span>
              ))
            :''}
          </div>
          { book.averageRating ?  <div className="book-rating"> Rating: <ReactStars count={5} value={book.averageRating} edit={false} size={8} color2={'#ffd700'} /></div> : '' }
        </div>
      </li>

    )
  }
}

export default Book
