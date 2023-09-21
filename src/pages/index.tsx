import { PageLayout, TodoList } from "@/components";
import { HomePageProps } from "@/utils/types";
import { Link } from "@chakra-ui/next-js";
import { Container, Button, HStack, Heading } from "@chakra-ui/react";

const HomePage = ({ todos }: HomePageProps) => {
  return (
    <PageLayout>
      <HStack justify={"space-between"} marginBottom={"5"}>
        <div>
          <Heading as="h2">My Todo List</Heading>
          <span>Click on todo to see it individually</span>
        </div>
        <Link
          href="/todos/create"
          color="blue.400"
          _hover={{ color: "blue.500" }}
        >
          <Button colorScheme="green">New Todo</Button>
        </Link>
      </HStack>
      <TodoList todos={todos} />
    </PageLayout>
  );
};

// Get Props for SSR
export async function getServerSideProps() {
  const { API_URL: todoApiUrl } = process.env;
  const response = await fetch(todoApiUrl as string);
  const todos = await response.json();

  return {
    props: {
      todos,
    },
  };
}

export default HomePage;
