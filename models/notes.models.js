const db = require('../db/connection');

exports.fetchNoteById = (note_id) => {
    const queryString = `
    SELECT * FROM notes
    WHERE note_id = $1;
    `;
    return db.query(queryString, [note_id])
    .then(({rows}) => {
        if (!rows.length) {
            return Promise.reject({status: 404, msg: "Note does not exist!"})
        } 
        return rows[0];
    })
}