import { logDOM } from "@testing-library/react";
import { useState } from "react";
import "./App.css";
// This component represents a card of book
const BookCard = ({
  book,
  bookShelf,
  bookSearch,
  changeShelf,
  addSearchBookToShelf,
  allBooks,
  ...props
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <>
      {bookSearch ? (
        <div style={{ display: "flex" }}>
          <div style={{ width: "33%" }}></div>

          <div style={{ width: "35%", marginBottom: "25px" }}>
            <div
              className="card"
              style={{
                border: "1px solid black",
                width: "100%",
                alignContent: "center",
              }}
            >
              {book?.imageLinks?.smallThumbnail ? (
                <img
                  onClick={() => {}}
                  src={book?.imageLinks?.smallThumbnail}
                  alt="Avatar"
                />
              ) : null}
              <div className="container">
                <p>{book?.title && <b>{book.title}</b>}</p>

                <p>{book?.authors && book.authors}</p>
              </div>

              <button onClick={() => addSearchBookToShelf(book, "read")}>
                Read
              </button>
              <button onClick={() => addSearchBookToShelf(book, "wantToRead")}>
                Want To Read
              </button>
              <button
                onClick={() => addSearchBookToShelf(book, "currentlyReading")}
              >
                Currently Reading
              </button>
            </div>
          </div>
          <div style={{ width: "33%" }}></div>
        </div>
      ) : (
        <div style={{ display: "flex" }}>
          <div style={{ width: "33%" }}></div>
          <div style={{ width: "33%" }}>
            <div
              className="card"
              style={{
                border: "1px solid black",
                width: "100%",
                alignContent: "center",
              }}
            >
              {book?.imageLinks?.smallThumbnail ? (
                <img
                  onClick={() => {}}
                  src={
                    book?.imageLinks?.smallThumbnail
                      ? book?.imageLinks?.smallThumbnail
                      : "logo.svg"
                  }
                  alt="Avatar"
                />
              ) : null}
              <div className="container">
                <h4>{book?.title && <b>{book.title}</b>}</h4>

                <h5>{book?.authors && <b>{book.authors}</b>}</h5>
              </div>

              {(() => {
                let buttonList = {};
                switch (book.shelf) {
                  case "wantToRead":
                    buttonList.firstButton = "Read";
                    buttonList.secondButton = "Currently Reading";
                    break;
                  case "currentlyReading":
                    buttonList.firstButton = "Read";
                    buttonList.secondButton = "Want To Read";
                    break;
                  case "read":
                    buttonList.firstButton = "Currently Reading";
                    buttonList.secondButton = "Want To Read";
                    break;
                }
                return (
                  <>
                    <div style={{ display: "flex" }}>
                      <button
                        onClick={() =>
                          changeShelf(book, buttonList.firstButton)
                        }
                      >
                        {buttonList.firstButton}
                      </button>
                      <button
                        onClick={() =>
                          changeShelf(book, buttonList.secondButton)
                        }
                      >
                        {buttonList.secondButton}
                      </button>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
          <div style={{ width: "33%" }}></div>
        </div>
      )}
    </>
  );
};

export default BookCard;
