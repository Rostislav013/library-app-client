import React from "react";

import book from "../../../Images/book.jpg";

export default function BookPhoto() {
  return (
    <div aria-label="Book photo">
      <img className="bookPhoto" src={book} alt="book" />
    </div>
  );
}
