const express = require('express');
const uuid = require('uuid');
const app = express();

const PORT = process.env.PORT || 3000;

// will share any static html files with the browser
app.use( express.static('public') );
// accept incoming POST requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const dbFile = './app/db.json';

let noteList = [{id: "0000-0000-0000-0000", title: 'note1', text: 'note1 text'}];

// Endpoints =================================================

// for app.post: newNote.id = uuid.v4() // use a random unique id.
app.get( '/api/notes', function( req, res ){
    res.send( noteList )
})

app.post( '/api/notes', function( req, res ){
    const newNote = req.body
    newNote.id = uuid.v4()
    noteList.push( newNote )
    res.send( { message: "Note saved" } )
})

app.delete( '/api/notes/:id', function( req, res ){
    const noteId = req.params.id
    noteList = noteList.filter( n=>n.id !== noteId )
    res.send( { message: "Note deleted"} )
})

// Listener ==================================================
app.listen(PORT, function() {
    console.log(`Serving notes on PORT ${PORT}`)
})
