import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

import Cards from "../Components/Cards";

export default function HomePage() {
  return (
    <div>
      <Container className="outerContainer">
        <Cards />
      </Container>
    </div>
  );
}
