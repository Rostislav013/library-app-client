// Action types
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
export const TOGGLE_DIALOG = 'TOGGLE_DIALOG'

export const GET_ERRORS = 'GET_ERRORS'
export const USER_LOADING = 'USER_LOADING'
export const SET_CURRENT_USER = 'SET_CURRENT_USER'
// Enum
export enum DialogType {
  SignIn = 'signIn',
  SignUp = 'signUp',
}

// A product
export type Product = {
  id: string
  title: string
  author: string
}

export type AddProductAction = {
  type: typeof ADD_PRODUCT
  payload: {
    product: Product
  }
}

export type RemoveProductAction = {
  type: typeof REMOVE_PRODUCT
  payload: {
    product: Product
  }
}

export type ToggleDialogAction = {
  type: typeof TOGGLE_DIALOG
  payload: {
    dialog: DialogType
  }
}

export type UiActions = ToggleDialogAction

// Use this union in reducer
export type ProductActions = AddProductAction | RemoveProductAction

export type ProductState = {
  inCart: Product[]
}

// Using dynamic keys from an enum
export type UiState = {
  dialogOpen: {
    [key in DialogType]?: boolean
  }
}

export enum ErrorType {
  email = 'email',
  passwordincorrect = 'passwordincorrect',
  emailnotfound = 'emailnotfound',
}

export type ErrState = {
  email?: string
  passwordincorrect?: string
  emailnotfound?: string
}

export type UserState = {
  id: string
  email: string
  exp: number
  admin: boolean
  firstName: string
}
export type Auth = {
  isAuthenticated: boolean
  user: UserState
  loading: boolean
  loginError: any
}

export type AppState = {
  product: ProductState
  ui: UiState
  auth: Auth
}

export type Decoded = {
  id: string
  email: string
  exp: number
  admin: boolean
  firstName: string
}

type StatProperties = {
  borrowerId: string
  borrowDate: Date
  returnDate: Date
}

export type Book = {
  _id: string
  isbn: number
  title: string
  description: string
  publisher: string
  author: string
  isAvailable: boolean
  statusProperty: StatProperties[]
  publishedDate: number
  categories: string[]
}

export type BooksGridProps = {
  books: Book[]
}

export type BooksCardProps = {
  id: string
  isbn: number
  title: string
  description: string
  publisher: string
  author: string
  isAvailable: boolean
  statusProperty: StatProperties[]
  publishedDate: number
  categories: string[]
}

export type Path = {
  author?: string
  title?: string
  categories?: string
  isAvailable?: boolean
}

export type PathProps = {
  path?: Path
}

export type KeyType = 'author' | 'title' | 'categories' | 'isAvailable'

export type SearchBookProps = {
  author: string
  title: string
  category: string
  ability?: boolean
  handleChangeAbility: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleChangeCategory: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleChangeAuthor: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (e: React.FormEvent) => void
  handleChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export type BoookInCart = {
  id: number
  title: string
  author: string
}

export type ListItemProps = {
  product: Product
  handleRemoveBook: (product: Product) => void
}

export type ParamProps = {
  id: string
}

export type booksProperties = {
  bookId: string
  borrowDate: Date
  returnDate: Date
}

export type User = {
  _id: string
  admin: boolean
  password: string
  firstName: string
  lastName: string
  email: string
  booksProperties: booksProperties[]
  creationDate: Date
}

export type UserProps = {
  users: User[]
  handleDeleteUser: (id: string) => void
}

export type TableRowProps = {
  id: string
  admin: boolean
  firstName: string
  lastName: string
  email: string
  booksProperties: booksProperties[]
  creationDate: any
  handleDeleteUser: (id: string) => void
}

export type TableCellProps = {
  name: string
}

export type TabPanelProps = {
  children?: React.ReactNode
  index: any
  value: any
}

export type searchUserProps = {
  keyword: string
  handleKeywordChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export type BooksTabProps = {
  booksProperties: booksProperties[]
}

export type BookTableCellProps = TableCellProps

export type BookTableRowProps = {
  bookId: string
  borrowDate: any
  returnDate: any
  handleReturnBook: (bookId: string) => void
}

type UserBook = {
  bookId: string
  title: string
  author: string
  borrowDate: Date
  returnDate: Date
}

type booksPropertiesBookTable = {
  bookId: string
  borrowDate: Date
  returnDate: Date
}

export type BookProps = {
  books: booksPropertiesBookTable[]
  handleReturnBook: (bookId: string) => void
}

export type UserTabProps = {
  user: User
  handleUpdateInfo: (values: any) => void
}

export type ChangePasswordProps = {
  id: string
  handleChangePassword: (values: any) => void
}
