import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import { NoteEditor } from './Components/NoteEditor';
import { NotesContainer } from './Components/NotesContainer';
import localforage from 'localforage';
import Modal from 'react-modal';

export const App = () => {

  const noteListState = useState([]);
  let [noteList, setNoteList] = noteListState;

  const addNewNote = newNote => {
    const updatedList = [...noteList, newNote];
    saveUpdatedList(updatedList);
  };

  const saveUpdatedList = async updatedList => {
    await localforage.setItem('mynotes', updatedList);  // save to Forage
    setNoteList(updatedList);
  }

  // on load - get prev notelist and show
  useEffect(() => {
    const loadExisting = async () => {
      // await sleep(5000);
      let data = await localforage.getItem('mynotes');
      console.log(data);
      if (data && data.length > 0) setNoteList(data);
    };
    // lock the screen with modal (loading data...)
    loadExisting().catch(console.error);
  }, []);

  const [modalContent, setModalContent] = useState();
  const shouldShowModal = Boolean(modalContent); // only open when there is content

  return (
    <div className="main-container">
      <NoteEditor
        noteListState={noteListState}
        editorTitle={'Create Note'}
        editorAction={'Add Note'}
        updateTheList={addNewNote}
      />

      <NotesContainer
        noteListState={noteListState}
        setModalContent={setModalContent}
        saveUpdatedList={saveUpdatedList}
      />

      {shouldShowModal && (
        <Modal
          isOpen={shouldShowModal}
          appElement={document.body} // fix for issue in Modal, see: https://www.freakyjolly.com/resolved-warning-react-modal-app-element-is-not-defined-please-use-modal-setappelementel-or-set-appelementel/
        >
          {modalContent}
        </Modal>
      )}
    </div>
  );
};

export default App;
