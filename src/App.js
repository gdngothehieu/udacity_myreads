import logo from "./logo.svg";
import "./App.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { get, getAll, update, search } from "./BooksAPI.js";
import BookCard from "./BookCard";
const App = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [wantToReadBooks, setWantToReadBooks] = useState([]);
  const [readBooks, setReadBooks] = useState([]);
  const [currentlyReadingBooks, setCurrentlyReadingBooks] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const data = await getAll();
      setAllBooks(data);
      const wantToReadBooks = data?.filter(
        (book) => book.shelf === "wantToRead"
      );
      const currentlyReadingBooks = data?.filter(
        (book) => book.shelf === "currentlyReading"
      );
      const readBooks = data?.filter((book) => book.shelf === "read");
      setReadBooks(readBooks);
      setCurrentlyReadingBooks(currentlyReadingBooks);
      setWantToReadBooks(wantToReadBooks);
    };
    try {
      getData();
    } catch (e) {
      console.log(e);
    }
  }, [allBooks]);

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
            currentlyReadingBooks.map((book) => {
              return (
                <BookCard changeShelf={changeShelf} book={book}></BookCard>
              );
            })}
        </div>
        <div style={{ width: "33%" }}>
          Want to read
          {wantToReadBooks &&
            wantToReadBooks.map((book) => {
              return (
                <BookCard changeShelf={changeShelf} book={book}></BookCard>
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
          {readBooks.length &&
            readBooks.map((book) => {
              return (
                <BookCard changeShelf={changeShelf} book={book}></BookCard>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default App;
