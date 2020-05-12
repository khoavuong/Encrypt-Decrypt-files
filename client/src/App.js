import React from "react";
import styled from "styled-components";
import { Tabs } from "antd";

import "./App.css";
import { CryptoFileUpload } from "./components/CryptoFileUpload";

const { TabPane } = Tabs;

const Container = styled.div`
  margin: auto;
  width: 100%;
  max-width: 860px;
  padding: 20px;
  box-sizing: border-box;
`;

const App = () => {
  return (
    <Container>
      <h1>Encrypt/Decrypt files online</h1>
      {/* <h3>
        Nowadays people send sensitive information online. There are some texts
        you may be sending to your employees over the social media or online
        messaging platforms and you would like to keep them secret. The secret
        messages encryption online tool employs AES 256 decryption technology to
        allow you send the sensitive message securely online. There are several
        benefits you enjoy when you decide to use the free online tool.
      </h3> */}
      <h3>How to use this tool:</h3>
      <h4>
        <ol>
          <li>Upload a file</li>
          <li>Download the file</li>
          <li>Upload a file</li>
          <li>Download the file</li>
        </ol>
      </h4>
      <h3>
        Note: Once you downloaded a processed file, you won't be able to
        download it again. This is to ensure your file will only be accessed
        once.
      </h3>

      <Tabs defaultActiveKey="encrypt">
        <TabPane tab="Encrypt" key="encrypt">
          <CryptoFileUpload type="encrypt"></CryptoFileUpload>
        </TabPane>
        <TabPane tab="Decrypt" key="decrypt">
          <CryptoFileUpload type="decrypt"></CryptoFileUpload>
        </TabPane>
      </Tabs>
    </Container>
  );
};

export default App;
