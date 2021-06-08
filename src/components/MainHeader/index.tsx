import React, { useMemo } from "react";

import emojis from "../../utils/emojis";
import Toogle from "../Toogle";
import { Container, Profile, Welcome, UserName } from "./styles";

const MainHeader: React.FC = () => {
  const emoji = useMemo(() => {
    const index = Math.floor(Math.random() * emojis.length);
    return emojis[index];
  }, []);

  return (
    <Container>
      <Toogle />
      <Profile>
        <Welcome> Olá, {emoji} </Welcome>
        <UserName> Cacio de Castro </UserName>
      </Profile>
    </Container>
  );
};

export default MainHeader;
