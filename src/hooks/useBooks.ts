import { useState, useEffect, useMemo } from "react";

import api from "../api";
import { Book, PathProps } from "../types";

function useBooks(path: PathProps) {
  const [error, setError] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);

  const loadData = async () => {
    try {
      const response = await api.getAllBooks();
      setBooks(response.data);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useMemo(async () => {
    // FIX? generate search path
    // Removing keys with no value or false
    Object.keys(path).forEach((key) => {
      if ((path as any)[key].length === 0 || (path as any)[key] === false) {
        delete (path as any)[key];
      }
    });
    // generate a path as author=Big&title=JavaScript&categories=programming&isAvailable=true
    const searchPath: string =
      path &&
      Object.keys(path)
        .map((key) => `${key}=${(path as any)[key]}`)
        .join("&");

    const response = await api.searchBook(searchPath);
    setBooks(response.data);
  }, [path]);

  return { books, error };
}

export default useBooks;
