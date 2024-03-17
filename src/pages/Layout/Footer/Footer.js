import React from "react";
import { Container, Stack, Link, Text, Icon } from "@chakra-ui/react";
import { FaGithub, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <Container
      maxW="container.lg"
      marginTop="auto"
      paddingTop="1.5rem"
      paddingBottom="1.5rem"
    >
      <Stack
        flexDirection={["column", "row"]}
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack isInline fontWeight="500" fontSize="sm">
          <Text color="secondary.link">&copy; 2024</Text>
          <Link href="#" color="secondary.link" fontWeight="bold">
           BIX Technology
          </Link>
          <Text color="secondary.link">&mdash; All rights reserved</Text>
        </Stack>
        <Stack isInline fontWeight="500" fontSize="sm">
         
          <Link
            className="footer-nav-item"
            color="secondary.link"
            href="https://github.com/macdev14"
            isExternal
          >
            <Icon as={FaGithub} marginRight="0.2rem" verticalAlign="middle" />
            Github repository
          </Link>
          
        </Stack>
      </Stack>
    </Container>
  );
}
