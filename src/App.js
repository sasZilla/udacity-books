import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import BooksList from './BooksList';
import SearchBooks from './SearchBooks';

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route exact path="/" component={BooksList} />
        <Route path="/search" component={SearchBooks} />
      </div>
    );
  }
}

export default BooksApp;
