import React, { useState } from "react";
import { Upload, Input, Select } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

export const CryptoFileUpload = ({ type }) => {
  const [fileList, setFileList] = useState([]);
  const [password, setPassword] = useState("");
  const [algorithm, setAlgorithm] = useState("");
  const [mode, setMode] = useState("");

  const props = {
    name: "file",
    action: `${process.env.REACT_APP_BASE_URL}/file/${type}`,
    data: { password, algorithm, mode },
    onChange(info) {
      const { file } = info;
      if (file.response) {
        if (file.response.message) file.name = file.response.message;
        else {
          file.url = `${process.env.REACT_APP_BASE_URL}/file/${file.response.filename}`;
          file.name = file.response.filename;
        }
      }
      setFileList([file]);
    },
    showUploadList: { showRemoveIcon: false },
  };

  return (
    <div>
      <p style={{ fontWeight: "bold" }}>Choose a cipher algorithm:</p>
      <Select
        style={{ width: "100%" }}
        placeholder="Choose your algorithm"
        onChange={(value) => {
          setAlgorithm(value);
          setMode("");
        }}
      >
        <Select.Option value="aes-128">AES-128</Select.Option>
        <Select.Option value="aes-192">AES-192</Select.Option>
        <Select.Option value="aes-256">AES-256</Select.Option>
        <Select.Option value="des">DES</Select.Option>
        <Select.Option value="des-ede">3DES-2-keys</Select.Option>
        <Select.Option value="des-ede3">3DES-3-keys</Select.Option>
      </Select>

      <br />
      <br />

      <p style={{ fontWeight: "bold" }}>Choose a cipher mode:</p>
      <Select
        style={{ width: "100%" }}
        onChange={(value) => setMode(value)}
        value={mode}
      >
        {algorithm.slice(4, 7) !== "ede" ? (
          <Select.Option value="ecb">ECB</Select.Option>
        ) : null}

        <Select.Option value="cbc">CBC</Select.Option>
        <Select.Option value="cfb">CFB</Select.Option>
        <Select.Option value="ofb">OFB</Select.Option>
      </Select>

      <br />
      <br />

      <p style={{ fontWeight: "bold" }}>Enter a password:</p>
      <Input
        placeholder="Enter your password here"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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
