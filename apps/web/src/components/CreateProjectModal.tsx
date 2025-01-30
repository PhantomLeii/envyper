import { useQueryClient, useMutation } from "@tanstack/react-query";
import type { CreateProject } from "@/schema/projects";
import { createProject } from "@/api/projects";
import { useForm } from "@tanstack/react-form";
import useCSRFToken from "@/hooks/useCSRFToken";
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

export default function Component() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const queryClient = useQueryClient();
  const csrfToken = useCSRFToken();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: CreateProject) =>
      createProject(data, csrfToken as string),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["projects"] });
      onClose();
    },
  });

  const form = useForm<CreateProject>({
    defaultValues: {
      name: "",
      description: "",
    },
    onSubmit: ({ value }) => {
      mutate({ ...value });
    },
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await form.handleSubmit();
  }

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Add New
      </Button>

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
                          isRequired
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
                    onPress={onClose}
                    isDisabled={isPending}
                  >
                    Close
                  </Button>
                  <Button
                    color="primary"
                    type="submit"
                    isDisabled={isPending}
                    isLoading={isPending}
                  >
                    Create
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
