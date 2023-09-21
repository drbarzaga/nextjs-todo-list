import React from "react";
import { VStack, Box, StackDivider, Badge, Heading } from "@chakra-ui/react";
import { Todo } from "@/utils/types";
import { Link } from "@chakra-ui/next-js";

const TodoList = ({ todos }: { todos: Todo[] }) => {
  return (
    <VStack
      divider={<StackDivider borderColor="gray.200" />}
      spacing={4}
      align="stretch"
      padding={"5"}
      background={"gray.100"}
      borderRadius={"10"}
    >
      {todos.map((todo: Todo) => (
        <Box
          key={todo._id}
          h={"40px"}
          bg="white"
          alignItems={"center"}
          display={"flex"}
          justifyContent={"space-between"}
          padding={"5"}
          borderRadius={"5"}
        >
          <Link href={`/todos/${todo._id}`}>
            <h4 style={{ textTransform: "capitalize" }}>{todo.item}</h4>
          </Link>
          <Badge bg={todo.completed ? "green.200" : "yellow.200"}>
            {todo.completed ? "Done" : "Pending"}
          </Badge>
        </Box>
      ))}
      {todos.length === 0 && (
        <Box display={"flex"} justifyContent={"center"}>
          <span>Not todos to show. Please create one.</span>
        </Box>
      )}
    </VStack>
  );
};

export default TodoList;
