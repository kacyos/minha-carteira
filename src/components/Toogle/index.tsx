import React from "react";
import { Container, ToogleLabel, ToggleSelector } from "./styles";

const Toogle: React.FC = () => {
  return (
    <Container>
      <ToogleLabel>Light</ToogleLabel>
      <ToggleSelector
        uncheckedIcon={false}
        checkedIcon={false}
        checked
        onChange={() => console.log("mudou")}
      />
      <ToogleLabel>Dark</ToogleLabel>
    </Container>
  );
};

export default Toogle;
