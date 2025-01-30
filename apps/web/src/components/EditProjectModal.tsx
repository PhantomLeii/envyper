import useCSRFToken from "@/hooks/useCSRFToken";
import { CreateProject } from "@/schema/projects";
import { useForm } from "@tanstack/react-form";
import { updateProject } from "@/api/projects";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@heroui/react";

interface EditProjectModalProps {
  projectId: string;
}

export function EditProjectModal(props: EditProjectModalProps) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const csrfToken = useCSRFToken();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["project"],
    mutationFn: async (data: Partial<CreateProject>) =>
      updateProject(
        Number.parseInt(props.projectId),
        data,
        csrfToken as string,
      ),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["project"] });
      onClose();
    },
  });

  const form = useForm<Partial<CreateProject>>({
    defaultValues: {
      name: "",
      description: "",
    },
    onSubmit: ({ value }) => {
      mutate({ ...value });
      queryClient.invalidateQueries({ queryKey: ["project"] });
    },
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await form.handleSubmit();
  }

  return (
    <>
      <span
        onClick={onOpen}
        className="text-default-500 hover:text-primary-500 cursor-pointer text-2xl underline"
      >
        Edit
      </span>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <form onSubmit={handleSubmit}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  <h1 className="text-2xl font-semibold">Create New Project</h1>
                </ModalHeader>

                <ModalBody>
                  <form.Field
                    name="name"
                    children={(field) => (
                      <>
                        <Input
                          label="Name"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          isDisabled={isPending}
                        />
                      </>
                    )}
                  />
                  <form.Field
                    name="description"
                    children={(field) => (
                      <>
                        <Input
                          label="Description"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          isDisabled={isPending}
                        />
                      </>
                    )}
                  />
                </ModalBody>

                <ModalFooter>
                  <Button
                    color="danger"
                    variant="light"
                    isLoading={isPending}
                    isDisabled={isPending}
                    onPress={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    type="submit"
                    isLoading={isPending}
                    isDisabled={isPending}
                  >
                    Update
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}
