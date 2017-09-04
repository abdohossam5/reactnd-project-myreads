import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import BookList from './BookList'

class SearchBooks extends Component {

    static propTypes = {
        onQueryChange: PropTypes.func.isRequired,
        onBookUpdate: PropTypes.func.isRequired,
        searchResults: PropTypes.array,
        clearSearchResults: PropTypes.func.isRequired
    };

    state = {
        query: ''
    };

    updateQuery(query) {
        this.setState({query});
        this.props.onQueryChange(query)
    }

    componentWillUnmount() {
        this.props.clearSearchResults()
    }

    render() {
        let { query } = this.state;
        let { searchResults, onBookUpdate } = this.props;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => this.updateQuery(e.target.value)}
                            placeholder="Search by title or author"/>

                    </div>
                </div>
                <div className="search-books-results">
                    <BookList list={searchResults} onBookUpdate={onBookUpdate}/>
                </div>
            </div>
        )
    }
}

export default SearchBooks