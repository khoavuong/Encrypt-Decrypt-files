import React, { useState } from "react";
import { Upload, Input, Select } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

export const CryptoFileUpload = ({ type }) => {
  const [fileList, setFileList] = useState([]);
  const [key, setKey] = useState("");
  const [algorithm, setAlgorithm] = useState("");

  const props = {
    name: "file",
    action: `http://localhost:3000/file/${type}`,
    data: { key, algorithm },
    onChange(info) {
      let fileList = [...info.fileList];

      fileList = fileList.map((file) => {
        if (file.response) {
          file.url = `http://localhost:3000/file/${file.response.filename}`;
          file.name = file.response.filename;
        }
        return file;
      });

      setFileList(fileList);
    },
  };

  return (
    <div>
      <p style={{ fontWeight: "bold" }}>Please choose an algorithm:</p>
      <Select
        style={{ width: "100%" }}
        placeholder="Chose an algorithm"
        onChange={(value) => setAlgorithm(value)}
      >
        <Select.Option value="aes-256-ctr">aes-256-ctr</Select.Option>
      </Select>

      <br />
      <br />

      <p style={{ fontWeight: "bold" }}>Please enter a key:</p>
      <Input
        placeholder="Enter your key here"
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />

      <br />
      <br />

      <Dragger {...props} fileList={fileList}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">Only support for a single upload</p>
      </Dragger>
    </div>
  );
};
