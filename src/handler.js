const { nanoid } = require("nanoid");
const books = require("./bookshelf");

// add book with complete data
const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;

  if (!name) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh besar dari pageCount",
    });
    response.code(400);
    return response;
  }
  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;
  // const isInsertName =
  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Buku gagal ditambahkan",
  });
  response.code(500);
  return response;
};

// get all books
// const getAllBooksHandler = () => {
//   const dataBook = books.map((book) => ({
//     id: book.id,
//     name: book.name,
//     publisher: book.publisher,
//   }));

//   return {
//     status: "success",
//     data: {
//       dataBook,
//     },
//   };
// };
const getAllBooksHandler = (request, h) => {
  const { reading, finished, name } = request.query;

  let filteredBooks = books;

  if (reading !== undefined) {
    filteredBooks = filteredBooks.filter((book) => book.reading === (reading === '1'));
  } 
  if (finished !== undefined) {
    filteredBooks = filteredBooks.filter((book) => book.finished === (finished === '1'));
  }

  if (name !== undefined) {
    filteredBooks = filteredBooks.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
  }

  const response = filteredBooks.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));

  return {
    status: "success",
    data: {
      books: response,
    },
  };
};

// // get reading books
// const getReadingBooksHandler = () => {
//   const readingBooks = books.filter((book) => book.reading === true).map((book) => ({
//     id: book.id,
//     name: book.name,
//     publisher: book.publisher,
//   }));

//   return {
//     status: "success",
//     data: {
//       readingBooks
//     }
//   }
// };

// // get unreading books
// const getUnreadingBooksHandler = () => {
//   const unreadingBooks = books.filter((book) => book.reading === false).map((book) => ({
//     id: book.id,
//     name: book.name,
//     publisher: book.publisher,
//   }));

//   return {
//     status: "success",
//     data: {
//       unreadingBooks,
//     }
//   }
// };
// // get finished books
// const getFinishedBooksHandler = () => {
//   const finishedBooks = books.filter((book) => book.finished === true).map((book) => ({
//     id: book.id,
//     name: book.name,
//     publisher: book.publisher
//   }));

//   return {
//     status: "success",
//     data: {
//       finishedBooks,
//     }
//   }
// }
// // get unfinished books
// const getUnfinishedBooksHandler = () => {
//   const unfinishedBooks = books.filter((book) => book.finished === false).map((book) => ({
//     id: book.id,
//     name: book.name,
//     publisher: book.publisher
//   }));

//   return {
//     status: "success",
//     data: {
//       unfinishedBooks,
//     }
//   }
// };
// // get books containt name dicoding
// const getBooksContaintName = (name = 'Dicoding') => {
//   const containtBooks = books.filter((book) => book.name).map((book) => ({
//     id: book.id,
//     name: book.name,
//     publisher: book.publisher
//   }));

//   return {
//     status: "success",
//     data: {
//       containtBooks,
//     }
//   }
// };



// get detail book with correct id
const getBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const book = books.filter((n) => n.id === id)[0];

  if (book !== undefined) {
    return {
      status: "success",
      data: {
        book,
      },
    };
  }
  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });
  response.code(404);
  return response;
};

// edit book
const editBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const updatedAt = new Date().toISOString();
  const index = books.findIndex((book) => book.id === id);
  if (!name) {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }


  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };

    const response = h.response({
      status: "success",
      message: "Buku berhasil diperbarui",
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Gagal memperbarui buku. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

// delete book 
const deleteBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
  // getReadingBooksHandler,
  // getUnreadingBooksHandler,
  // getFinishedBooksHandler,
  // getUnfinishedBooksHandler,
  // getBooksContaintName,
};