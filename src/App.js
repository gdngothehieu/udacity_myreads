import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchBook from "./SearchBook";
import { get, getAll, update, search } from "./BooksAPI.js";

import Shelf from "./Shelf";
// This is the main app contains the state used throughout the router pages
const App = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [wantToReadBooks, setWantToReadBooks] = useState([]);
  const [readBooks, setReadBooks] = useState([]);
  const [currentlyReadingBooks, setCurrentlyReadingBooks] = useState([]);

  useEffect(() => {
    const getApiBooks = async () => {
      const data = await getAll();
      setAllBooks(data);
    };
    getApiBooks();
  }, [allBooks]);
  useEffect(() => {
    const getData = async () => {
      const data = allBooks;
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
  // This helps add books to shelves from search page
  const addBookSearch = async (book, shelf) => {
    try {
      const responseData = await update(book, shelf);
      let updateAllBooks = allBooks;
      if (allBooks.find((allBook) => allBook.id === book.id)) {
        updateAllBooks.map((allBook) => {
          if (allBook.id === book.id) {
            allBook.shelf = shelf;
          }
          return allBook;
        });
      } else {
        updateAllBooks.push(book);
      }
      setAllBooks(updateAllBooks);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Shelf
              allBooks={allBooks}
              wantToReadBooks={wantToReadBooks}
              readBooks={readBooks}
              currentlyReadingBooks={currentlyReadingBooks}
            />
          }
        ></Route>
        <Route
          path="/search"
          element={
            <SearchBook
              addBookSearch={addBookSearch}
              allBooks={allBooks}
              setAllBooks={setAllBooks}
            />
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
