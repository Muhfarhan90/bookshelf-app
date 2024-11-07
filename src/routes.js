const { addBookHandler, getAllBooksHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler } = require("./handler");

const routes = [
  {
    method: "POST",
    path: "/books",
    handler: addBookHandler,
  },
  {
    method: "GET",
    path: "/books",
    handler: getAllBooksHandler,
  },
  {
    method: "GET",
    path: "/books/{id}",
    handler: getBookByIdHandler,
  },
  // {
  //   method: "GET",
  //   path: "/books",
  //   handler: getReadingBooksHandler,
  // },
  // {
  //   method: "GET",
  //   path: "/books",
  //   handler: getUnreadingBooksHandler,
  // },
  // {
  //   method: "GET",
  //   path: "/books",
  //   handler: getFinishedBooksHandler,
  // },
  // {
  //   method: "GET",
  //   path: "/books",
  //   handler: getUnfinishedBooksHandler,
  // },
  // {
  //   method: "GET",
  //   path: "/books",
  //   handler: getBooksContaintName,
  // },
  {
    method: "PUT",
    path: "/books/{id}",
    handler: editBookByIdHandler,
  },
  {
    method: "DELETE",
    path: "/books/{id}",
    handler: deleteBookByIdHandler,
  }
];

module.exports = routes;
