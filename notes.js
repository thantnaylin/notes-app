const fs = require('fs');
const chlk = require('chalk');

const addNote =  (title, body) => {

    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);

    if (!duplicateNote) {

        notes.push({
            title: title,
            body: body
        });
        
        saveNotes(notes);
        console.log(chlk.green('Saved Successfully'));

    } else {
        console.log(chlk.yellow('WARNING: Note title already exist!'));
    }
};

const removeNote = (title) => {

    const notes = loadNotes();
    const notesToRemove = notes.filter((x) =>  x.title !== title );

    if (notes.length > notesToRemove.length) {

        console.log(chlk.blue('Removing Note : ' + title));
        saveNotes(notesToRemove);
        console.log(chlk.green.bold('Successfully Removed!'));

    } else {

        console.log(chlk.red('Note does not exist.'));
    }
}

const listNotes = () => {

    const notes = loadNotes();
    if (notes.length !== 0) {

        console.log(chlk.green.inverse('Your notes...'));

        notes.forEach((note) => {
            console.log(chlk.green(note.title));
        });

    }  else {
        console.log(chlk.yellow.inverse('No note to show!'));
    }
};

const readNotes = (title) => {

    const notes = loadNotes();    
    const note = notes.find((x) => x.title === title);
    
    if(note) {
        console.log(chlk.green.inverse(note.title));
        console.log(chlk.inverse(note.body));
    }   else {
        console.log(chlk.yellow('Cannot find the Note!'));
    }

};

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = () => {

    try {

        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
    
        return JSON.parse(dataJSON);
    } catch (e) {
        return []; 
    }
};

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes
};