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
    query: '',
    loader: false
  }
  // Function for Loader
  loader (state) {
    this.setState({ loader: state });
  }

  //  Add Books to state from API
  componentDidMount (){
    this.loader(true)
    BooksApi.getAll().then((data) => {
      this.setState({ books : data})
      this.loader(false)
    })
  }

  // Function for input query and rendering search results
  updateQuery = (query) => {
    if (!query) {
      this.setState({query: '', searchResults: []})
      this.loader(false)
    } else {
      this.loader(true)
      this.setState({ query: query })
      BooksApi.search(query).then((books) => {
        if (books.error) {
          books = []
          this.loader(false)
        }
        books.map(book => (this.state.books.filter((b) => b.id === book.id).map(b => book.shelf = b.shelf)))
        this.setState({ searchResults : books})
        this.loader(false)
      })
    }
  }

  // Update book shelf onChange of the select
  updateBook = (book, shelf) => {
    BooksApi.update(book,shelf)
    this.setState(state => ({
      books: state.books.filter(b => b.id !== book.id).concat([ book ])
    }))
    book.shelf = shelf;
  }

  render() {

    const {loader} = this.state

    return (
      <div className="app">
        {loader ?
          <div key="loader" className="loader">
            <span className="loader-text">
              Stacking books ...
            </span>
          </div>
        : ''}
        <Route exact path='/' render={ () => (
          <ListBooks
            books={this.state.books}
            updateBook={this.updateBook}
          />
        )}/>

        <Route path='/search' render={ () => (
          <SearchBooks
            books={this.state.books}
            query={this.state.query}
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
