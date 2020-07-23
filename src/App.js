import React from "react";
import "./App.css";
import Home from "../src/page/home";
import Editor from "../src/page/editor";
import AddPage from "../src/page/addPage";
import { HashRouter as Router, Route } from "react-router-dom";
import { Layout } from 'antd';
import logoImg from './logo.png';
const { Header } = Layout;
function App() {
  return (
    <Router>
      <div className="App">
          <Header className="title">
            <img src={logoImg} className="logo_img" alt="logo"/>
            名雕接口管理平台
          </Header>
          <Route path="/" exact component={Home}></Route>
          <Route path="/editor/:id" component={Editor}></Route>
          <Route path="/addPage/" component={AddPage}></Route>
      </div>
    </Router>
  );
}

export default App;
