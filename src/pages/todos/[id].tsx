import { PageLayout } from "@/components";
import { Todo, TodoDetailsPageProps } from "@/utils/types";
import { Badge, Button, HStack, Heading, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

const TodoDetailPage = ({ todo, url }: TodoDetailsPageProps) => {
  const router = useRouter();
  const [internalTodo, setInternalTodo] = useState<Todo>(todo);

  const handleComplete = async () => {
    const newTodo: Todo = {
      ...internalTodo,
      completed: !internalTodo.completed,
    };
    await fetch(`${url}/${internalTodo._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo),
    });
    setInternalTodo(newTodo);
  };

  const handleDelete = async () => {
    await fetch(`${url}/${internalTodo._id}`, {
      method: "DELETE",
    });
    router.push("/");
  };

  return (
    <PageLayout>
      <VStack>
        <Heading as="h2" textTransform={"capitalize"}>
          {internalTodo.item}
        </Heading>
        <Badge bg={internalTodo.completed ? "green.200" : "yellow.200"}>
          {internalTodo.completed ? "Done" : "Pending"}
        </Badge>

        <HStack marginTop={"10"}>
          <Button
            onClick={handleComplete}
            colorScheme={internalTodo.completed ? "yellow" : "green"}
          >
            {internalTodo.completed ? "Incomplete" : "Completed"}
          </Button>
          <Button onClick={handleDelete} colorScheme="red">
            Delete
          </Button>
          <Button
            colorScheme="green"
            onClick={() => {
              router.push("/");
            }}
          >
            Go Back
          </Button>
        </HStack>
      </VStack>
    </PageLayout>
  );
};

// Define Server Side Props
export async function getServerSideProps(context: any) {
  // fetch the todo, the param was received via context.query.id
  const { API_URL: todoApiUrl } = process.env;
  const response = await fetch(`${todoApiUrl}/${context.query.id}`);
  const todo = await response.json();

  return {
    props: {
      todo,
      url: todoApiUrl,
    },
  };
}

export default TodoDetailPage;
