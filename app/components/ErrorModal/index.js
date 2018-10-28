import React from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { hideError } from "app/actions/error";

export const ErrorModal = props => {
  const { hasError, errorMessage, children, dispatch } = props;

  return (
    <React.Fragment>
      {children}
      <Modal isOpen={hasError}>
        <ModalHeader>Error</ModalHeader>
        <ModalBody>{errorMessage}</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => dispatch(hideError())}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    hasError: state.error.hasError,
    errorMessage: state.error.errorMessage
  };
};
const mapDispatchToProps = dispatch => ({ dispatch });

const WithErrorModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorModal);

WithErrorModal.displayName = "ErrorModal";
export default WithErrorModal;
