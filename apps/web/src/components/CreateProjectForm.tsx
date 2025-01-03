"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";

type ModalFormProps = {
  openModalBtnText: string;
  title: string;
  submitText: string;
};

export function Component(props: ModalFormProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [payload, setPayload] = React.useState({
    name: "",
    description: "",
  });

  async function onSubmit() {}

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        {props.openModalBtnText}
      </Button>

      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {props.title}
              </ModalHeader>

              <ModalBody>
                <Input
                  label="Name"
                  value={payload.name}
                  onChange={(e) =>
                    setPayload({ ...payload, name: e.target.value })
                  }
                />
                <Input
                  label="Description"
                  value={payload.description}
                  onChange={(e) =>
                    setPayload({ ...payload, description: e.target.value })
                  }
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={() => onSubmit()}>
                  {props.submitText}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
