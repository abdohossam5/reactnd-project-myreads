import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class BookList extends Component {

    static propTypes = {
        list: PropTypes.array.isRequired,
        onBookUpdate: PropTypes.func.isRequired
    };

    render() {
        const {list, onBookUpdate} = this.props;

        return (
            <ol className="books-grid">
                {list.map((book) => (
                    <li key={book.id}>
                        <Book book={book} onBookUpdate={onBookUpdate}/>
                    </li>
                ))}
            </ol>
        )
    }
}

export default BookList