import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BookCard from "./BookCard.js";
import { get, getAll, update, search } from "./BooksAPI.js";

const SearchBook = () => {
  const [bookInput, setBookInput] = useState("");
  const [bookData, setBookData] = useState("");
  useEffect(() => {
    const getData = async () => {
      if (bookInput || bookInput === 0) {
        const maxResults = 10;
        const data = await search(bookInput, maxResults);
        setBookData(data);
      }
    };
    try {
      getData();
    } catch (e) {
      console.log(e);
    }
  }, [bookInput]);
  return (
    <>
      <Link style={{ textDecoration: "none" }} to="/">
        &#x25c0; Back to shelf
      </Link>
      <h4 style={{ textAlign: "center" }}>Search Book</h4>
      <input
        style={{
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
          width: "200px",
          margin: "25px",
        }}
        placeholder={"Enter keyword"}
        onChange={(e) => {
          setBookInput(e.target.value);
        }}
      />{" "}
      <div
        style={{
          display: "grid",
          width: "100%",
          gridTemplateColumns: "auto auto auto",
        }}
      >
        {bookData.length
          ? bookData.map((book) => (
              <BookCard book={book} bookSearch={true}></BookCard>
            ))
          : null}
      </div>
    </>
  );
};

export default SearchBook;
