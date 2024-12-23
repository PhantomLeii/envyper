import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

type ModalProps = {
  backdrop: string;
  btnText: string;
  btnColor: string;
  btnVariant: string;
  modalTitle: string;
  children: React.ReactNode;
  onConfirm: () => void;
  actionBtnText: string;
  cancelBtnText: string;
};

export default function Component(props: ModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button
          className="capitalize"
          color="warning"
          variant="flat"
          onPress={() => onOpen()}
        >
          {props.btnText}
        </Button>
      </div>
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {props.modalTitle}
              </ModalHeader>
              <ModalBody>{props.children}</ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  {props.cancelBtnText}
                </Button>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => props.onConfirm()}
                >
                  {props.actionBtnText}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
