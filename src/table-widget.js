import React, { useState } from "react";
import styled from "styled-components";
import { Input, Table } from "antd";
import "antd/dist/antd.css";

const FlexBox = styled.div`
  margin: 0;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .ant-table-wrapper {
    width: 100%;
    overflow: hidden;
  }
  .ant-table-pagination {
    display: none;
  }
  .ant-table-thead > tr,
  .ant-table-tbody > tr {
    line-height: 6px !important;
  }
  .ant-table-thead > tr > th {
    background: transparent;
    color: #c2c2c2;
    font-size: 12px;
  }
  .ant-table-tbody > tr:nth-child(even) {
    background: #f6f5fa;
  }
  td {
    font-size: 12px;
    font-weight: 550;
  }
`;

const data = [
  {
    key: "1",
    id: 1,
    name: "Test",
    data1: 123.9,
    data2: 125.8
  },
  {
    key: "2",
    id: 2,
    name: "Test",
    data1: 123.9,
    data2: 125.8
  },
  {
    key: "3",
    id: 3,
    name: "Test",
    data1: 123.9,
    data2: 125.8
  }
];

export default function TableWidget() {
  const [dataSource, setDataSource] = useState(data);
  const [value, setValue] = useState("");

  const FilterByNameInput = (
    <Input
      placeholder="Search Name"
      value={value}
      onChange={e => {
        const currValue = e.target.value;
        setValue(currValue);
        const filteredData = data.filter(entry =>
          entry.name.includes(currValue)
        );
        setDataSource(filteredData);
      }}
    />
  );

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Dato#1",
      dataIndex: "data1",
      key: "data1"
    },
    {
      title: "Dato#2",
      dataIndex: "data2",
      key: "data2"
    }
  ];

  return (
    <FlexBox>
      <Table columns={columns} dataSource={dataSource} />
    </FlexBox>
  );
}
