import React from 'react';

class Book extends React.Component {
  
  render() {
    const { bookInfo } = this.props;
    return (
      <li className="book">{bookInfo.title} by {bookInfo.author}, {bookInfo.pubDate}</li>
    )
  }
}

export default Book;
