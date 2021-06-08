import React from "react";

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";

import { Container } from "./styles";

const Dashboard: React.FC = () => {
  const options = [
    {
      value: "Cacio",
      label: "Cacio",
    },
    {
      value: "Aline",
      label: "Aline",
    },
    {
      value: "Caio",
      label: "Caio",
    },
  ];

  return (
    <Container>
      <ContentHeader title="Dashboard" lineColor="#f7931b">
        <SelectInput options={options} onChange={()=>{}} />
      </ContentHeader>
    </Container>
  );
};

export default Dashboard;
