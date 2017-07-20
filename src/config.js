export const config = {
    dbApi: null
};

export function init() {
    config.dbApi = {
        authors: dbUrl('/authors'),
        publishers: dbUrl('/publishers'),
        books: dbUrl('/books'),
        bookAuthors: dbUrl('/bookAuthors')
    };
}

function dbUrl(path) {
    return `${process.env.DB_URL}${path}`;
}
