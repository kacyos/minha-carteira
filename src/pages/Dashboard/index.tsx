import React, { useState, useMemo } from "react";

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import WalletBox from "../../components/WalletBox";

import expenses from "../../repository/expenses";
import gains from "../../repository/gains";
import listOfMonths from "../../utils/months";

import { Container, Content } from "./styles";

const Dashboard: React.FC = () => {
  const [monthSelect, setMonthSelect] = useState<number>(
    new Date().getMonth() + 1
  );
  const [yearSelect, setYearSelect] = useState<number>(
    new Date().getUTCFullYear()
  );

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

  const years = useMemo(() => {
    let uniqueYears: number[] = [];

    [...expenses, ...gains].forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();

      if (!uniqueYears.includes(year)) {
        uniqueYears.push(year);
      }
    });

    return uniqueYears.map((year) => {
      return {
        value: year,
        label: String(year),
      };
    });
  }, []);

  const months = useMemo(() => {
    return listOfMonths.map((month, index) => {
      return {
        value: index,
        label: month,
      };
    });
  }, []);

  const handleMonthSelected = (month: string) => {
    try {
      const parseMonth = Number(month);
      setMonthSelect(parseMonth);
    } catch (error) {
      throw new Error("invalid month value");
    }
  };

  const handleYearSelected = (year: string) => {
    try {
      const parseYear = Number(year);
      setYearSelect(parseYear);
    } catch (error) {
      throw new Error("invalid year value");
    }
  };

  return (
    <Container>
      <ContentHeader title="Dashboard" lineColor="#f7931b">
        <SelectInput
          options={months}
          onChange={(e) => handleMonthSelected(e.target.value)}
          defaultValue={monthSelect}
        />
        <SelectInput
          options={years}
          onChange={(e) => handleYearSelected(e.target.value)}
          defaultValue={yearSelect}
        />
      </ContentHeader>

      <Content>
        <WalletBox
          title="Saldo"
          amount={150.0}
          footerLabel="Atualizado com base nas entradas e saídas"
          icon="dolarImg"
          color="#4e41f0"
        />
        <WalletBox
          title="Entradas"
          amount={5000.0}
          footerLabel="Atualizado com base nas entradas e saídas"
          icon="arrowUp"
          color="#f7931b"
        />
        <WalletBox
          title="Saídas"
          amount={4850.0}
          footerLabel="Atualizado com base nas entradas e saídas"
          icon="arrowDown"
          color="#e44c4e"
        />
      </Content>
    </Container>
  );
};

export default Dashboard;
