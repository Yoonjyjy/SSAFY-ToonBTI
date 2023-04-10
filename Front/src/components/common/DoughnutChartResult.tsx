import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Chart, Doughnut } from "react-chartjs-2";
import styled from "styled-components";

ChartJS.register(ArcElement, Tooltip, Legend);

const ORIGIN_DATA = {
  type: "doughnut",
  // labels: [] as string[],
  datasets: [
    {
      label: "My Genre Chart",
      data: [] as number[],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(255, 159, 64)",
        "rgb(255, 205, 86)",
        "#1ec997",
        "rgb(75, 192, 192)",
        "rgb(54, 162, 235)",
        "rgb(153, 102, 255)",
        "rgb(237, 204, 255)",
        "rgb(248, 202, 255)",
        "rgb(255, 204, 207)",
      ],
      hoverOffset: 4,
    },
  ],
};

interface PropType {
  // dataList: number[];
  dataList: {
    id: number;
    name: string;
    count: number;
  }[];
}

const Genre = [
  "판타지",
  "드라마",
  "로맨스",
  "로맨스판타지",
  "현대판타지",
  "액션/무협",
  "소년/감성",
  "일상/개그",
  "공포/추리",
  "스포츠",
];

export default function DoughnutChartResult({ dataList }: PropType) {
  const [originData, setOriginData] = useState(ORIGIN_DATA);
  const [newDataList, setNewDataList] = useState<
    { id: number; name: string; count: number }[]
  >([]);
  useEffect(() => {
    console.log(dataList);
    setNewDataList(dataList);
    const temp: number[] = [];
    dataList.map((el) => {
      temp.push(el.count);
    });
    ORIGIN_DATA.datasets[0].data = temp as number[];
  }, []);

  return (
    <DoughnutDiv>
      <Doughnut data={originData} />
    </DoughnutDiv>
  );
}

const DoughnutDiv = styled.div`
  margin: auto auto 1.5rem auto;
`;
