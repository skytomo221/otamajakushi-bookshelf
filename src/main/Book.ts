import BookController from './BookController';

export default interface Book {
  path: string;
  bookController: BookController;
}
