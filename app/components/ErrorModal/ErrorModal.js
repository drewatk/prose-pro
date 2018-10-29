import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ErrorModal = props => {
  const { hasError, errorMessage } = props;

  return (
    <div>
      <Modal isOpen={hasError}>
        <ModalHeader>Error</ModalHeader>
        <ModalBody>{errorMessage}</ModalBody>
        <ModalFooter>
          <Button color="danger">Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ErrorModal;
// const mapStateToProps = state => {
//   return {
//     hasError: false,
//     errorMessage: "Error",
//   };
// };
//
// const WithErrorModal = connect(mapStateToProps)(ErrorModal);
//
// WithErrorModal.displayName = "ErrorModal";
// export default WithErrorModal;
