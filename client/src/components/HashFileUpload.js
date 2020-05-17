import React, { useState } from "react";
import styled from "styled-components";
import { Upload, Input, Alert } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Dragger } = Upload;

const HashCompare = styled.div`
  display: flex;
`;

export const HashFileUpload = () => {
  const [fileList1, setFileList1] = useState([]);
  const [fileList2, setFileList2] = useState([]);
  const [fileHashed1, setFileHashed1] = useState("");
  const [fileHashed2, setFileHashed2] = useState("");

  const file1Props = {
    name: "file",
    action: `${process.env.REACT_APP_BASE_URL}/file/hash`,
    onChange(info) {
      const { file } = info;
      if (file.response) setFileHashed1(file.response.hash);
      setFileList1([file]);
    },
  };

  const file2Props = {
    name: "file",
    action: `${process.env.REACT_APP_BASE_URL}/file/hash`,
    onChange(info) {
      const { file } = info;
      if (file.response) setFileHashed2(file.response.hash);
      setFileList2([file]);
    },
  };

  const textCompare = (text1, text2) => {
    if (text1 === "" || text2 === "") return;
    else
      return text1 === text2 ? (
        <Alert
          message="Equal"
          type="success"
          style={{ textAlign: "center" }}
          showIcon
        />
      ) : (
        <Alert
          message="Not equal"
          type="error"
          style={{ textAlign: "center" }}
          showIcon
        />
      );
  };

  return (
    <div>
      <p style={{ fontWeight: "bold" }}>File #1:</p>
      <Dragger {...file1Props} fileList={fileList1}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">Only support for a single upload</p>
      </Dragger>

      <br />

      <p style={{ fontWeight: "bold" }}>File #2:</p>
      <Dragger {...file2Props} fileList={fileList2}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">Only support for a single upload</p>
      </Dragger>

      <br />

      <h1 style={{ textAlign: "center" }}>Compare hashed value</h1>
      {textCompare(fileHashed1, fileHashed2)}
      <HashCompare>
        <div style={{ width: "100%", margin: "10px" }}>
          <h4 style={{ textAlign: "center" }}>File 1:</h4>
          <TextArea rows={4} value={fileHashed1} />
        </div>
        <div style={{ width: "100%", margin: "10px" }}>
          <h4 style={{ textAlign: "center" }}>File 2:</h4>
          <TextArea rows={4} value={fileHashed2} />
        </div>
      </HashCompare>
    </div>
  );
};
