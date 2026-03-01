import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useState } from "react";

export type UsernameModalProps = {
  isOpen: boolean;
  onSubmit: (name: string) => void;
};

function UsernameModal({ isOpen, onSubmit }: UsernameModalProps) {
  const [value, setValue] = useState("");
  const isError = value.length > 0 && value.length < 2;

  function handleSubmit() {
    if (value.length >= 2) {
      onSubmit(value);
    }
  }

  return (
    // closeOnOverlayClick and closeOnEsc are disabled: the modal is non-dismissable
    // until the user submits a valid name.
    <Modal
      isOpen={isOpen}
      onClose={() => {}}
      closeOnOverlayClick={false}
      closeOnEsc={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Welcome to NoteSync</ModalHeader>
        <ModalBody>
          <FormControl isInvalid={isError}>
            <FormLabel>Enter your display name</FormLabel>
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="Your name"
              autoFocus
            />
            <FormErrorMessage>
              Name must be at least 2 characters.
            </FormErrorMessage>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            onClick={handleSubmit}
            isDisabled={value.length < 2}
          >
            Join
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default UsernameModal;
