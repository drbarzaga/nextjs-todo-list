import { Container, HStack } from "@chakra-ui/react";
import React from "react";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return <Container marginTop={"20"}>{children}</Container>;
};

export default PageLayout;
