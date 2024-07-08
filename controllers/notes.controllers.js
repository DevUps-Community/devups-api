const { fetchNoteById } = require("../models/notes.models");

exports.getNoteById = (req, res, next) => {
    const { note_id } = req.params;
    fetchNoteById(note_id)
        .then((note) => {
            res.status(200).send({ note }) 
        })
        .catch(next);
}