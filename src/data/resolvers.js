import axios from 'axios';
import { config } from '../config';

// ------------------------------------------------------------------------------------------------
// Resolvers
// ------------------------------------------------------------------------------------------------
const resolverMap = {
    Query: {
        authors() {
            return axios
                .get(config.dbApi.authors)
                .then(response => response.data);
        },

        author(root, args) {
            return axios
                .get(`${config.dbApi.authors}/${args.id}`)
                .then(response => response.data);
        },

        publishers() {
            return axios
                .get(config.dbApi.publishers)
                .then(response => response.data);
        },

        publisher(root, args) {
            return axios
                .get(`${config.dbApi.publishers}/${args.id}`)
                .then(response => response.data);
        },

        books() {
            return axios
                .get(config.dbApi.books)
                .then(response => response.data);
        },

        book(root, args) {
            return axios
                .get(`${config.dbApi.books}/${args.id}`)
                .then(response => response.data);
        }
    },

    Author: {
        books(author) {
            return axios
                .get(config.dbApi.bookAuthors, {
                    params: {
                        authorId: author.id
                    }
                })
                .then(response => {
                    const bookAuthors = response.data;
                    const promises = bookAuthors.map(bookAuthor => {
                        return axios
                            .get(`${config.dbApi.books}/${bookAuthor.bookId}`)
                            .then(response => response.data);
                    });
                    return Promise.all(promises);
                });
        }
    },

    Publisher: {
        books(publisher) {
            return axios
                .get(config.dbApi.books, {
                    params: {
                        publisherId: publisher.id
                    }
                })
                .then(response => response.data);
        }
    },

    Book: {
        publisher(book) {
            return axios
            .get(`${config.dbApi.publishers}/${book.publisherId}`)
            .then(response => response.data);
        },
        authors(book) {
            return axios
                .get(config.dbApi.bookAuthors, {
                    params: {
                        bookId: book.id
                    }
                })
                .then(response => {
                    const bookAuthors = response.data;
                    const promises = bookAuthors.map(bookAuthor => {
                        return axios
                            .get(
                                `${config.dbApi.authors}/${bookAuthor.authorId}`
                            )
                            .then(response => response.data);
                    });
                    return Promise.all(promises);
                });
        }
    }
};

export default resolverMap;
