import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import titleCase from 'title-case'
import sortBy from 'sort-by'
import Book from './Book.js'
//import * as BooksApi from './BooksAPI'

class ListBooks extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    updateBook: PropTypes.func.isRequired,
  }

  render(){

    const {books, updateBook} = this.props

    // Store all Shelfs in an array from the books object
    let bookShelfs = books.map(book => book.shelf)

    // Filter out the books with Shelf = none
    bookShelfs = bookShelfs.filter((shelf) => shelf !== "none")

    // Remove duplicate values from the array
    bookShelfs = bookShelfs.reduce(
       (x, y) => x.includes(y) ? x : [...x, y], []
    )

    // Sort shelfes
    bookShelfs.sort();

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>My Reads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {bookShelfs.map( (shelf, i) => (
              <div key={`shelf-${shelf}`} className="bookshelf">
                <h2 className="bookshelf-title">{titleCase(shelf)}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {books.sort(sortBy('title')).map( (book, i ) => (
                      book.shelf === shelf ?
                        <Book
                          key={book.id}
                          book={book}
                          updateBook={updateBook}
                          isSearch={false}
                        /> : ''
                    ))}
                  </ol>
                </div>
              </div>
            )
          )}
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks
