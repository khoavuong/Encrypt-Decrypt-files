import React from "react";
import styled from "styled-components";
import { Tabs, Collapse } from "antd";

import "./App.css";
import { CryptoFileUpload } from "./components/CryptoFileUpload";
import { HashFileUpload } from "./components/HashFileUpload";

const { Panel } = Collapse;
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
      <h1 style={{ textAlign: "center" }}>Encrypt/Decrypt files online</h1>
      {/* <h3>
        Nowadays people send sensitive information online. There are some texts
        you may be sending to your employees over the social media or online
        messaging platforms and you would like to keep them secret. The secret
        messages encryption online tool employs AES 256 decryption technology to
        allow you send the sensitive message securely online. There are several
        benefits you enjoy when you decide to use the free online tool.
      </h3> */}
      {/* <h3>How to use this tool:</h3>
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
      </h3> */}
      <Collapse accordion style={{ marginBottom: "20px" }}>
        <Panel header="How to use this tool" key="1">
          <h4>
            <ul>
              <li>
                "Encrypt" Tab is for encrypting a file with a chosen algorithm
                and key.
              </li>
              <li>
                "Decrypt" Tab is for decrypting the encrypted file in "Encrypt"
                tab. The algorithm and key must be suitable to the encrypted
                file in order to get the correct original file.
              </li>
              <li>
                "Checking file integrity" Tab is for comparing the content of 2
                files. If the hashed values of 2 files are equal then the
                contents of those are the same, vice versa.
              </li>
              {/* <li>{process.env.REACT_APP_BASE_URL}</li> */}
            </ul>
          </h4>
        </Panel>
        <Panel header="Note" key="2">
          <h3>
            Once you downloaded a processed file, you won't be able to download
            it again. This is to ensure your file will only be accessed once.
          </h3>
        </Panel>
      </Collapse>

      <Tabs defaultActiveKey="encrypt">
        <TabPane tab="Encrypt" key="encrypt">
          <CryptoFileUpload type="encrypt"></CryptoFileUpload>
        </TabPane>
        <TabPane tab="Decrypt" key="decrypt">
          <CryptoFileUpload type="decrypt"></CryptoFileUpload>
        </TabPane>
        <TabPane tab="Checking file integrity" key="hash">
          <HashFileUpload></HashFileUpload>
        </TabPane>
      </Tabs>
    </Container>
  );
};

export default App;
