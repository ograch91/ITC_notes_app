import Moment from 'moment';
import './NoteItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUpRightFromSquare,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { NoteEditor } from './NoteEditor';
export const NoteItem = props => {
  let [noteList] = props.noteListState;

  const deleteNote = () => {
    if (window.confirm('Sure You Want 2 Delete?') == false) return;

    let NotesListWithoutMe = noteList.filter(
      (item, index) => index !== props.myIndex
    );
    props.saveUpdatedList([...NotesListWithoutMe]);
  };

  const humanDate = date => Moment(date).format('DD, MMMM, YYYY, HH:mm:ss');
  const updatedAfterCreate = props.item.createDate !== props.item.lastUpdated;

  const handleOpenModal = () => {
    props.setModalContent(
      <>
        <button onClick={handleCloseModal}>X</button>
        <br />
        Created: {humanDate(props.item.createDate)}
        <br /> {
          (updatedAfterCreate) && (
            <>Last Updated: {humanDate(props.item.lastUpdated)}</>
          )
        }
        <br />
        <NoteEditor
          noteListState={props.noteListState}
          editorTitle={'Update Note'}
          editorAction={'Done!'}
          initNoteValue={props.item}
          updateTheList={updateEditedNote}
        />
      </>
    );
  };

  const handleCloseModal = () => {
    // can be moved to App logic
    props.setModalContent(false);
  };

  const updateEditedNote = updatedNote => {
    const updatedList = [...noteList];
    updatedList[props.myIndex] = updatedNote;
    props.saveUpdatedList(updatedList);
    handleCloseModal();
  };

  return (
    <div className="note-item" id={props.item.uuid}>
      <FontAwesomeIcon
        icon={faArrowUpRightFromSquare}
        onClick={handleOpenModal}
      />
      <button className="delete-note" onClick={deleteNote}>
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
      <br />
      {Moment(props.item.createDate).format('DD, MMMM, YYYY, HH:mm:ss')}
      <br />
      {props.item.title}
      <br />
      {props.item.text}
    </div>
  );
};
