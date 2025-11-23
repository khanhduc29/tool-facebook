'use client';

import { Container, Group, Text } from "@mantine/core";

export default function Footer() {
  return (
    <footer
      style={{
  
        padding: "2rem 0",
        marginTop: "3rem",
        boxShadow: "inset 0 10px 10px -10px rgba(0,0,0,0.1)", 
        background: `
            radial-gradient(circle at 50% 0%, rgba(109,46,195,0.25), transparent 60%),
            linear-gradient(90deg, rgba(255,60,150,0.08), rgba(109,46,195,0.08)),
            #0A0A14
            `,
      }}
    >
      <Container>
        <Group align="center" justify="center">
          <Text size="sm" color="white">
            © {new Date().getFullYear()} ZaloTool — All rights reserved.
          </Text>
        </Group>
      </Container>
    </footer>
  );
}
