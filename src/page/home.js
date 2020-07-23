import React from "react";
import { Col,Button,List, Typography } from "antd";
import { FormOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Link } from "react-router-dom";
import baseUrl from '../config'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
        list: [],
        type: 1,
    }
  }
  componentDidMount () {
    this.getDateList();
  }
 
  getDateList() {
    const _this=this; 
    axios.get(baseUrl + 'all')
    .then(function (res) {
        // console.log(res);
      _this.setState({
        list:res.data.data
      });
    })
    .catch(function (error) {
      _this.setState({
        isLoaded:false,
        error:error
      })
    })
    
  }
  render() {
    return (
      <div className="home_list">
        <List
          header={<div style={{textAlign:"left"}}>
              <Link to={"/addPage/"}><Button type="primary">新增</Button></Link> 
              </div>}
          footer={<div>ending</div>}
          bordered
          dataSource={this.state.list}
          renderItem={(item, index) => (
            <List.Item className="text-left">
              <Col span={4} offset={2}>账户名：{item.accountName}</Col>
              <Col span={4}>
                <Typography.Text mark>接口type: {item.type}</Typography.Text>
              </Col>
              <Col span={4}>siteid: {item.siteId}</Col>
              <Col span={4}>
                <Link to={"/editor/"+item.type}>
                  <Button type="primary" icon={<FormOutlined />}> 编辑 </Button>
                </Link>
              </Col>
            </List.Item>
          )}
        />
      </div>
    );
  }
}
export default Home;
