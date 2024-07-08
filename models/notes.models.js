const db = require('../db/connection');

exports.fetchNoteById = (note_id) => {
    const queryString = `
    SELECT 
    notes.note_id, 
    notes.title, 
    notes.content, 
    notes.category_id, 
    notes.topic_id, 
    notes.visible, 
    notes.created_by, 
    notes.created_at,
    tags.tag_id,
    tags.name AS tag_name
    FROM notes
    LEFT JOIN tags ON notes.note_id = tags.note_id
    WHERE notes.note_id = $1;`;
    return db.query(queryString, [note_id])
        .then(({ rows }) => {
            if (!rows.length) {
                return Promise.reject({ status: 404, msg: "Note does not exist!" })
            }
            return rows[0];
        })
}

exports.fetchNoteSummary = () => {
    const queryString = `
    SELECT
    notes.note_id,
    notes.title,
    tags.name AS tag_name
    FROM notes
    LEFT JOIN 
    tags ON notes.note_id = tags.note_id;`;
    return db.query(queryString)
        .then(({ rows }) => {
            console.log(rows);
            return rows;
        })
}