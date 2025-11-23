// app/page.tsx
"use client";

import Header from "./components/Header";
import Hero from "./components/Hero";
import { Container } from "@mantine/core";
import Footer from "./components/Footer";

export default function HomePage() {

  return (
    <>
      <Header />

      <main>
        <Container className="container" fluid p={0}> 
          <Hero />
        </Container>

  

        <Container className="container" fluid p={0}>
          <Footer />
        </Container>
      </main>
    </>
  );
}
