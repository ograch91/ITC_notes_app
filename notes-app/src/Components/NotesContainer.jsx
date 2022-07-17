import { NoteItem } from './NoteItem';
import './NotesContainer.css';
import { nanoid } from 'nanoid';

export const NotesContainer = props => {
  const [noteList, setNoteList] = props.noteListState;
  return (
    <div className="notes-container">
      {noteList.map((item, i) => {
        return (
          <NoteItem
            key={item.uuid || nanoid()}
            item={item}
            myIndex={i}
            setNoteList={setNoteList}
            noteList={noteList}
            noteListState={props.noteListState}
            setModalContent={props.setModalContent}
            saveUpdatedList={props.saveUpdatedList}
          />
        );
      })}
    </div>
  );
};
