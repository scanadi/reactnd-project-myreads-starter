import React  from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import * as BooksApi from './BooksAPI'

class BooksApp extends React.Component {

  state = {
    books: [],
    searchResults: [],
    query: ''
  }

  componentDidMount (){
    BooksApi.getAll().then((data) => {
      this.setState({ books : data})
    })
  }

  updateQuery = (query) => {
    if (!query) {
      this.setState({query: '', searchResults: []})
    } else {
      this.setState({ query: query.trim() })
      BooksApi.search(query).then((books) => {
        if (books.error) {
          books = []
        }
        books.map(book => (this.state.books.filter((b) => b.id === book.id).map(b => book.shelf = b.shelf)))
        this.setState({ searchResults : books})
      })
    }
  }

  updateBook = (book, shelf) => {
    BooksApi.update(book,shelf)
    this.setState(state => ({
      books: state.books.filter(b => b.id !== book.id).concat([ book ])
    }))
    book.shelf = shelf;
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={ () => (
          <ListBooks
            books={this.state.books}
            updateBook={this.updateBook}
          />
        )}/>

        <Route path='/search' render={ () => (
          <SearchBooks
            books={this.state.books}
            searchResults={this.state.searchResults}
            updateBook={this.updateBook}
            updateQuery={this.updateQuery}
          />
        )}/>

      </div>
    )
  }
}

export default BooksApp
