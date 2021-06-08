import React, { useMemo, useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import HistoryFinanceCard from "../../components/HistoryFinanceCard";

import gains from "../../repository/gains";
import expenses from "../../repository/expenses";

import formatCurrency from "../../utils/formatCurrency";
import formatDate from "../../utils/formatDate";
import listOfMonths from "../../utils/months";

import { Container, Content, Filters } from "./styles";

interface IRouteParams {
  match: {
    params: {
      type: string;
    };
  };
}

interface IData {
  id: string;
  description: string;
  amountFormatted: string;
  frequency: string;
  dateFormatted: string;
  tagColor: string;
}

const List: React.FC<IRouteParams> = ({ match }) => {
  const [data, setData] = useState<IData[]>([]);
  const [frequencyFilterSelected, setFrequencyFilterSelected] = useState([
    "recorrente",
    "eventual",
  ]);
  const [monthSelect, setMonthSelect] = useState<number>(
    new Date().getMonth() + 1
  );
  const [yearSelect, setYearSelect] = useState<number>(
    new Date().getUTCFullYear()
  );

  const movimentType = match.params.type;

  const location = useMemo(() => {
    return movimentType === "entry-balance"
      ? { title: "Entradas", lineColor: "#f7931b", data: gains }
      : { title: "Saídas", lineColor: "#e44c4e", data: expenses };
  }, [movimentType]);

  const years = useMemo(() => {
    let uniqueYears: number[] = [];

    location.data.forEach((item) => {
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
  }, [location]);

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
      throw new Error('invalid month value')
    }
  };

  const handleYearSelected = (year: string) => {
    try {
      const parseYear = Number(year);
      setYearSelect(parseYear);
    } catch (error) {
      throw new Error('invalid year value')
    }
  };

  const handleFrequencyClick = (frequency: string) => {
    const alreadySelected = frequencyFilterSelected.findIndex(
      (item) => item === frequency
    );

    if (alreadySelected >= 0) {
      const filtered = frequencyFilterSelected.filter(
        (item) => item !== frequency
      );
      setFrequencyFilterSelected(filtered);
    } else {
      console.log("selecionado agora");
      setFrequencyFilterSelected((prev) => [...prev, frequency]);
    }
  };

  useEffect(() => {
    const filteredDate = location.data.filter((item) => {
      const date = new Date(item.date);
      const month = date.getMonth();
      const year = date.getFullYear() + 1;
      return (
        month === monthSelect &&
        yearSelect === year &&
        frequencyFilterSelected.includes(item.frequency)
      );
    });

    const FormattedDate = filteredDate.map((item) => {
      return {
        id: uuid(),
        description: item.description,
        amountFormatted: formatCurrency(Number(item.amount)),
        frequency: item.frequency,
        dateFormatted: formatDate(item.date),
        tagColor: item.frequency === "recorrente" ? "#4e41f0" : "#e44c4e",
      };
    });

    setData(FormattedDate);
  }, [location, monthSelect, yearSelect, frequencyFilterSelected]);

  return (
    <Container>
      <ContentHeader title={location.title} lineColor={location.lineColor}>
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

      <Filters>
        <button
          type="button"
          className={`tag-filter tag-filter-recurrent
          ${frequencyFilterSelected.includes("recorrente") && "tag-actived"}`}
          onClick={() => {
            handleFrequencyClick("recorrente");
          }}
        >
          Recorrentes
        </button>
        <button
          type="button"
          className={`tag-filter tag-filter-eventual
          ${frequencyFilterSelected.includes("eventual") && "tag-actived"}`}
          onClick={() => {
            handleFrequencyClick("eventual");
          }}
        >
          Eventuais
        </button>
      </Filters>

      <Content>
        {data.map((item) => (
          <HistoryFinanceCard
            key={item.id}
            tagColor={item.tagColor}
            title={item.description}
            subtitle={item.dateFormatted}
            amount={item.amountFormatted}
          />
        ))}
      </Content>
    </Container>
  );
};

export default List;
