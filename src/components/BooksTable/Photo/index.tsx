import React from "react";

import book from "../../../Images/book.jpg";
import "./photo.css";

export default function BookPhoto() {
  return <img className="bookPhoto" src={book} alt="book" />;
}
