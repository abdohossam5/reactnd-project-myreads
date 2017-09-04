import React from 'react'
import {Route, Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks'
import BookList from "./BookList";

class BooksApp extends React.Component {
    
    state = {
        searchResults: [],
        currentlyReading: [],
        wantToRead: [],
        read: []
    };
    
    searchBooks = (query)=> {
        BooksAPI.search(query,50).then((searchResults)=> {
            // make sure to always return array in case search query is not from allowed search terms
            searchResults  = Array.isArray(searchResults) ? searchResults : [];
            searchResults.forEach(b => {
                this._handleBookImage(b);
                this._handleBookShelf(b);
            });
            this.setState({searchResults})
        })
    };

    updateBook = (book, newShelf)=> {
        let prevShelf = book.shelf;

        BooksAPI.update(book, newShelf).then(() => {
            this.setState((prevState) =>{
                let newState = prevState;
                if(prevShelf !== "none"){
                    let idx = newState[prevShelf].map(b => b.id).indexOf(book.id);
                    newState[prevShelf].splice(idx,1)
                }
                if(newShelf !== "none"){
                    book.shelf = newShelf;
                    newState[newShelf].push(book)
                }
                newState.searchResults.forEach((b)=>{
                    if(b.id === book.id){
                        b.shelf = newShelf
                    }
                });
                return newState;
            });
        })
    };

    clearSearchResults= ()=>{
        this.setState({
            searchResults: []
        })
    };

    componentDidMount() {
        BooksAPI.getAll().then((result) => {
            let bookShelves = this._categorizeBooks(result);
            this.setState(bookShelves);
        })
    }

    //helper functions
    _handleBookImage = (book) =>{
        if(!book.imageLinks || !book.imageLinks.thumbnail){
            book.imageLinks = {
                thumbnail: 'https://storage.googleapis.com/cloud-training/CP100/Bookshelf/bookplaceholder.jpg'
            }
        }
    };

    _handleBookShelf = (book) =>{
      book.shelf = 'none';

      if(this.state.currentlyReading.find(b => b.id === book.id)){
          book.shelf = 'currentlyReading';
      }  else if(this.state.wantToRead.find(b => b.id === book.id)){
          book.shelf = 'wantToRead';
      } else if(this.state.read.find(b => b.id === book.id)){
          book.shelf = 'read';
      }
    };

    _categorizeBooks(books) {
        let result = {
            searchResults: this.state.searchResults || [],
            currentlyReading: [],
            wantToRead: [],
            read: []
        };

        books.forEach((b)=> {
            this._handleBookImage(b);
            result[b.shelf].push(b);
        });

        return result;
    }

    render() {
        const { currentlyReading, wantToRead, read, searchResults} = this.state;
        return (
            <div className="app">
                <Route path="/search" render={()=> (
                    <SearchBooks
                        onQueryChange={this.searchBooks}
                        onBookUpdate={this.updateBook}
                        searchResults={searchResults}
                        clearSearchResults={this.clearSearchResults}
                    />
                )} />

                <Route exact path="/" render={() => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>

                        <div className="list-books-content">
                            <div>
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">Currently Reading</h2>
                                    <div className="bookshelf-books">
                                        <BookList list={currentlyReading} onBookUpdate={this.updateBook}/>
                                    </div>
                                </div>
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">Want to Read</h2>
                                    <div className="bookshelf-books">
                                        <BookList list={wantToRead} onBookUpdate={this.updateBook}/>
                                    </div>
                                </div>
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">Read</h2>
                                    <div className="bookshelf-books">
                                        <BookList list={read} onBookUpdate={this.updateBook}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="open-search">
                            <Link to="/search">Add a book</Link>
                        </div>
                    </div>
                )}/>
            </div>
        )
    }
}

export default BooksApp
