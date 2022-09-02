import logo from "./logo.svg";
import "./App.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { get, getAll, update, search } from "./BooksAPI.js";
import BookCard from "./BookCard";
// This component represents the shelf page
const Shelf = ({
  allBooks,
  wantToReadBooks,
  readBooks,
  currentlyReadingBooks,
  ...props
}) => {
  // This method represents the changing of shelf
  const changeShelf = async (book, shelf) => {
    switch (shelf) {
      case "Read":
        shelf = "read";
        break;
      case "Want To Read":
        shelf = "wantToRead";
        break;
      case "Currently Reading":
        shelf = "currentlyReading";
        break;
    }
    await update(book, shelf);
  };
  return (
    <div className="App">
      <Link style={{ textDecoration: "none" }} to="/search">
        <div style={{ color: "green" }}>Search Book</div>
      </Link>
      <h2>Shelves </h2>

      <div style={{ display: "flex" }}>
        <div style={{ width: "33%" }}>
          Currently Reading{" "}
          {currentlyReadingBooks &&
            currentlyReadingBooks.map((book, index) => {
              return (
                <BookCard
                  key={index}
                  changeShelf={changeShelf}
                  book={book}
                ></BookCard>
              );
            })}
        </div>
        <div style={{ width: "33%" }}>
          Want to read
          {wantToReadBooks &&
            wantToReadBooks.map((book, index) => {
              return (
                <BookCard
                  key={index}
                  changeShelf={changeShelf}
                  book={book}
                ></BookCard>
              );
            })}
        </div>
        <div
          style={{
            width: "33%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Read
          {readBooks.length
            ? readBooks.map((book, index) => {
                return (
                  <BookCard
                    key={index}
                    changeShelf={changeShelf}
                    book={book}
                  ></BookCard>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default Shelf;
