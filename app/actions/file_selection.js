export const SELECT_FILE = "SELECT_FILE";

/*
const fileSelect = (gitAbs, file) => dispatch => {

  gitAbs
    .openFile(file)
    .then(() => {
      console.log("DISPATCHING INSIDE FILE SELECT");
      dispatch({ type: SELECT_FILE, payload: file });
    })
    .catch(err => console.log("error in file select: ", err));
}; */

const fileSelect = file => ({ type: SELECT_FILE, payload: file });

export default fileSelect;
