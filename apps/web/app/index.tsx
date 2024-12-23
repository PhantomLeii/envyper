import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@nextui-org/button";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <Button onPress={() => console.log("Hello from Index.tsx Button")}>
        Press Me!
      </Button>
    </div>
  );
}
