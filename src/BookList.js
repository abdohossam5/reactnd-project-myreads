import React, {Component} from 'react'
import PropTypes from 'prop-types'

class BookList extends Component {

    static propTypes = {
        list: PropTypes.array.isRequired
    };

    render() {
        const {list} = this.props;

        return (
            <ol className="books-grid">
                {list.map((book) => (
                    <li key={book.id}>
                        <div className="book">
                            <div className="book-top">
                                <div className="book-cover" style={{
                                    width: 128,
                                    height: 193,
                                    backgroundImage: `url(${book.imageLinks.thumbnail})`
                                }}></div>
                                <div className="book-shelf-changer">
                                    <select>
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
                            {book.authors.map((a) => (<div key={a} className="book-authors">{a}</div>))}
                        </div>
                    </li>

                ))}
            </ol>
        )
    }
}

export default BookList