// @ts-nocheck
import { Layout, Space } from "antd";
import { FC } from "react";
import Logo from "../components/Logo/Logo";
const { Header, Footer, Content } = Layout;
const RegularTemplate: FC = ({ children }) => {
  return (
    <Space
      direction="vertical"
      style={{ width: "100%", height: "100vh" }}
      size={[0, 48]}
    >
      <Layout style={{ height: "100%" }}>
        <Header><Logo/></Header>
        <Content>{children}</Content>
        <Footer>In Pokemon we trust</Footer>
      </Layout>
    </Space>
  );
};

export default RegularTemplate;
