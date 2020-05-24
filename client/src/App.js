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

      <Collapse accordion style={{ marginBottom: "20px" }}>
        <Panel header="How to use this tool" key="1">
          <h3>
            <ul>
              <li>
                "Encrypt" Tab is for encrypting a file with a chosen algorithm,
                cipher mode and password.
              </li>
              <li>
                "Decrypt" Tab is for decrypting the encrypted file in "Encrypt"
                tab. The algorithm, cipher mode and password must be suitable to
                the encrypted file in order to get the correct original file.
              </li>
              <li>
                "File integrity" Tab is for comparing the content of 2 files. If
                the hashed values of 2 files are equal then the contents of
                those are the same, vice versa.
              </li>
              {/* <li>{process.env.REACT_APP_BASE_URL}</li> */}
            </ul>
          </h3>
        </Panel>
        <Panel header="Note" key="2">
          <h3>
            <ul>
              <li>
                Once you downloaded a processed file, you won't be able to
                download it again. This is to ensure your file will only be
                accessed once.
              </li>
              <li>
                Password field is used to derive the key with length correspond
                to the algorithm using "scrypt" hash.
              </li>
              <li>
                You might decrypt successfully even if your algorithm, password
                or cipher mode is incorrect. But the content of the decrypted
                file will not be the same as the original file
              </li>
              <li>The hash algorithm for checking file integrity is SHA256.</li>
            </ul>
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
        <TabPane tab="File integrity" key="hash">
          <HashFileUpload></HashFileUpload>
        </TabPane>
      </Tabs>
    </Container>
  );
};

export default App;
