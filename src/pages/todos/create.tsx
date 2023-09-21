import { PageLayout } from "@/components";
import { Todo } from "@/utils/types";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { FormEventHandler, useRef } from "react";

function CreateTodoPage({ url }: { url: string }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    // Validating
    if (!inputRef.current) {
      alert("Complete the form please.");
      return;
    }

    if (!inputRef.current.value) {
      alert("Complete the form please.");
      return;
    }

    // Creating the todo and making the API request
    const todo = { item: inputRef.current.value, completed: false };
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    });
    router.push("/");
  };

  return (
    <PageLayout>
      <Heading as="h2" marginBottom={"5"}>
        Create a New Todo
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Todo</FormLabel>
          <Input type="text" ref={inputRef} />
          <FormHelperText>Enter a description for the todo.</FormHelperText>
        </FormControl>
        <HStack marginTop={"3"} display={"flex"} justifyContent={"center"}>
          <Button onClick={() => router.push("/")}>Go Back</Button>
          <Button type="submit" colorScheme="green">
            Create
          </Button>
        </HStack>
      </form>
    </PageLayout>
  );
}

export async function getStaticProps() {
  return {
    props: {
      url: process.env.API_URL,
    },
  };
}

export default CreateTodoPage;
