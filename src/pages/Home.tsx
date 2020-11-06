import React, { useState } from 'react'

import { Path } from '../types'
import BooksGrid from '../components/BooksGrid'
import useBooks from '../hooks/useBooks'
import SearchBook from '../components/SearchBook'

export default function Home() {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [ability, setAbility] = useState<boolean>(false)
  const [path, setPath] = useState({})
  const { books } = useBooks(path)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const path: Path = {
      author: author,
      title: title,
      categories: category,
      isAvailable: ability,
    }
    setPath(path)
  }

  const handleChangeAuthor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(e.target.value)
  }
  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }
  const handleChangeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value)
  }
  const handleChangeAbility = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAbility(e.target.checked)
  }

  return (
    <>
      <SearchBook
        author={author}
        title={title}
        category={category}
        handleChangeAbility={handleChangeAbility}
        handleChangeCategory={handleChangeCategory}
        handleChangeAuthor={handleChangeAuthor}
        handleSubmit={handleSubmit}
        handleChangeTitle={handleChangeTitle}
      />
      {books && <BooksGrid books={books} />}
    </>
  )
}
