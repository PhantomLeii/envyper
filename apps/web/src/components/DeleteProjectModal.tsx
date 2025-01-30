import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { deleteProject } from "@/api/projects";
import useCSRFToken from "@/hooks/useCSRFToken";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";

interface DeleteProjectModalProps {
  projectId: string;
}

export default function Component(props: DeleteProjectModalProps) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const queryClient = useQueryClient();
  const csrfToken = useCSRFToken();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      deleteProject(Number.parseInt(props.projectId), csrfToken as string),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["projects"] });
      onClose();
    },
  });

  function handleDelete() {
    mutate();
    router.navigate({ to: "/projects" });
  }

  return (
    <>
      <Button
        onPress={onOpen}
        color="danger"
        className="absolute bottom-[64px] left-0"
      >
        Delete Project
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1 className="text-2xl font-semibold">Are you sure?</h1>
              </ModalHeader>
              <ModalBody>
                <p className="text-lg font-normal text-center">
                  Are you sure you want to delete this project? This action
                  cannot be undone.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  variant="light"
                  onPress={onClose}
                  isDisabled={isPending}
                >
                  Cancel
                </Button>
                <Button
                  color="danger"
                  isDisabled={isPending}
                  isLoading={isPending}
                  onPress={() => handleDelete()}
                >
                  Yes, I'm sure
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
