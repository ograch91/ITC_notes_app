import './NoteEditor.css';
import { useState } from 'react';
import { nanoid } from 'nanoid'

export const NoteEditor = props => {
  const initNoteValue = props.initNoteValue || {};
  let [note, setnote] = useState(initNoteValue.text || "");
  let [title, setTitle] = useState(initNoteValue.title || "");
  let [btn, setbtn] = useState(true);
  const updateTitle = e => {
    setTitle(e.target.value);
    tryEnableDoneBtn(note);
  };

  const updateText = e => {
    setnote(e.target.value);
    tryEnableDoneBtn(e.target.value);
    resizeArea(false);
  };

  const tryEnableDoneBtn = updateValue => {
    setbtn(!updateValue);
  };

  const clearText = () => {
    setTitle('');
    setnote('');
    setbtn(true);
  };

  const now = new Date();

  const handleEditDone = () => {
    const newNote = {
      title: title,
      text: note,
      lastUpdated: now,
      createDate: initNoteValue.createDate || now,
      uuid: initNoteValue.uuid || nanoid(),
    };

    props.updateTheList(newNote);
    clearText();
    resizeArea(true);
  };
  const resizeArea = withoutExpand => {
    let item = document.querySelector('.text-area');
    if (!item) {
      return;
    }
    item.style.height = `auto`;
    if (!withoutExpand) item.style.height = `${item.scrollHeight}px`;
  };
  return (
    <div className="note-editor">
      {props.editorTitle}
      <input
        className="input-title"
        placeholder="Note Title"
        value={title}
        onChange={updateTitle}
      ></input>
      <textarea
        className="text-area"
        value={note}
        onChange={updateText}
      ></textarea>
      <button className="AddNote" onClick={handleEditDone} disabled={btn}>
        {props.editorAction || 'Save'}
      </button>
    </div>
  );
};
