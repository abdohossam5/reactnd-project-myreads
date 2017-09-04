import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Book extends Component {

    static popTypes = {
        book: PropTypes.object.isRequired,
        onBookUpdate: PropTypes.func.isRequired
    };
    state = {
        shelf: 'none'
    };

    componentDidMount(){
        // this.setState({
        //     shelf: this.props.book.shelf
        // })
    }

    updateBook(shelf){
        this.props.onBookUpdate(this.props.book, shelf)
    }

    render(){
        const {book} = this.props;
        return (
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${book.imageLinks.thumbnail})`
                        }}></div>
                        <div className="book-shelf-changer">
                            <select value={book.shelf} onChange={(e)=> this.updateBook(e.target.value)}>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading
                                </option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    {book.authors &&  book.authors.map((a) => (<div key={a} className="book-authors">{a}</div>))}
                </div>
        )
    }
}

export default Book