import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import Book from './Book.js'
//import * as BooksApi from './BooksAPI'

class SearchBooks extends Component {

  static propTypes = {
    searchResults: PropTypes.array.isRequired,
    updateBook: PropTypes.func.isRequired,
    updateQuery: PropTypes.func.isRequired
  }

  moveCaretAtEnd(e) {
    var temp_value = e.target.value
    e.target.value = ''
    e.target.value = temp_value
  }

  render(){

    const {updateBook, updateQuery, searchResults, query} = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className='close-search' to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input autoFocus onFocus={this.moveCaretAtEnd} value={query} type="text" onChange={(event) => updateQuery(event.target.value)} placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchResults.sort(sortBy('title')).map( (book, i ) => (
                <Book
                  key={book.id}
                  book={book}
                  updateBook={updateBook}
                  isSearch={true}
                />
            ))}
          </ol>
          <div className="error-text">

          </div>
        </div>
      </div>
    )
  }
}

export default SearchBooks
