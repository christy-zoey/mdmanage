import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Row, Col, Form, Input, Button, message, Select,Switch } from "antd";
import baseUrl from "../config";

const validateMessages = {
  required: "${label} 不能为空!",
  types: {
    email: "${label} is not validate email!",
    number: "${label} is not a validate number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
const children = [];

function handleChange(value) {
  console.log(`户型: ${value}`);
}
function handleChangeDecor(value) {
  console.log(`风格: ${value}`);
}
function handleChangeArea(value) {
  console.log(`面积: ${value}`);
}
class Details extends Component {
  formRef = React.createRef();
  state = {
    isADV: false,
    componentSize: "default",
    type: "",
    model: "",
    detail: {},
    samples: [1,2,3],
    imgList: [],
  };
  constructor(props) {
    super(props);
    this.onFinish = this.onFinish.bind(this);
    this.checkAdv = this.checkAdv.bind(this);
    this.getParamsFun = this.getParamsFun.bind(this);
  }
  checkAdv(check){
    this.setState({
      isADV: Number(check)
    })
  }
  onFinish = (values) => {
    console.log(values);
  };
  componentWillMount() {
    this.getDateDetail();
  }

  getDateDetail(props) {
		const _this = this;
    axios
      .get(baseUrl + 'get?type=999')
      .then(function (res) {
        _this.formRef.current.setFieldsValue(res.data.data);
        _this.formRef.current.setFieldsValue({'type': '','accountName':''});
      })
      .catch(function (error) {
        _this.setState({
          isLoaded: false,
          error: error,
        });
      });
	}
  getParamsFun(values,_this) {
    let swiperInfo =[];
    let addInfo = values;
    // 处理轮播图
    swiperInfo[0] = values.samples1;
    swiperInfo[1] = values.samples2;
    swiperInfo[2] = values.samples3;
    swiperInfo[3] = values.samples4;
    delete values.samples1;
    delete values.samples2;
    delete values.samples3;
    delete values.samples4;
    addInfo.isAd = addInfo.isAd ? 1: 0;
    addInfo.samples = swiperInfo;
    axios
    .post(baseUrl + "insert", addInfo)
    .then(function (res) {
      if (res.data.code === 200) {
        message.success("新增成功！");
        _this.props.history.push({ pathname: '/' });
      }
      if (res.data.code === 500) {
        message.warning(res.data.message);
      }
    })
    .catch(function (error) {
      console.log(error)
      message.error("新增失败！");
    });
  }
  getAdd = async () => {
    await this.formRef.current.validateFields().then(
      val => { 
        // console.log(val);
        this.getParamsFun(val,this);
      }
    ).catch( err => {
      message.error(err.errorFields[0].errors[0]);
    });
  };
  
  render() {
    console.log(this.state);
    return (
      <div className="list_detail">
        <Row justify="start">
          <Col offset={4}>
            <Link to="/">
              <Button type="primary">返回主页</Button>
            </Link>
          </Col>
        </Row>
        <div style={{ marginTop: 20 }}>
          <Form
            onFinish={this.onFinish}
            initialValues={this.state.detail}
            validateMessages={validateMessages}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 18 }}
            layout="horizontal"
            ref={this.formRef}
          >
            <Form.Item
              name="accountName"
              label="账户名"
              rules={[{ required: true }]}
            >
              <Input placeholder="如：名雕03"/>
            </Form.Item>
            <Form.Item
              name="type"
              label="接口"
              rules={[{ required: true }]}
            >
              <Input placeholder="如：1，填写数字并且不能重复"/>
            </Form.Item>
            <Form.Item
              name="pageName"
              label="页面名"
            >
              <Input placeholder="如：深惠定制"/>
            </Form.Item>
            <Form.Item
              name="siteId"
              label="站点ID"
            >
              <Input placeholder="如：5441257"/>
            </Form.Item>
            
            <Form.Item
              name="model"
              label="户型"
            > 
              <Select
                mode="tags"
                placeholder="请输入户型"
                onChange={handleChange}
                style={{ width: '100%' }}
              >
                {children}
              </Select>
            </Form.Item>
            <Form.Item name="decor" label="风格" >
              <Select
                mode="tags"
                placeholder="请输入装修风格"
                onChange={handleChangeDecor}
              >
              </Select>
            </Form.Item>
            <Form.Item name="area" label="面积" >
            <Select
                mode="tags"
                placeholder="请输入户型面积"
                onChange={handleChangeArea}
              >
              </Select>
            </Form.Item>
            <Form.Item name="greenStandard" label="欧洲环保标准" >
              <Input placeholder="如：EO级" />
            </Form.Item>
            <Form.Item name="patent" label="国家专利" >
              <Input placeholder="如：78项"/>
            </Form.Item>
            <Form.Item name="iws" label="装修工艺" >
              <Input placeholder="如：108项"/>
            </Form.Item>
            <Form.Item name="industry" label="生态产业园" >
              <Input placeholder="如：60000㎡"/>
            </Form.Item>
            <Form.Item name="isAd" label="是否有广告图" style={{textAlign:"left"}} valuePropName="checked">
              <Switch checkedChildren="是" unCheckedChildren="否" onChange={this.checkAdv} />
            </Form.Item>
            {
              this.state.isADV ? (
                <Form.Item name="adImage" label="广告图链接" >
                  <Input placeholder="如：https://baidu.com"/>
                </Form.Item>
              ): ''
            }
            
            <Form.Item name="introduce" label="城市信息" >
              <Input placeholder="如：仅限深圳、广州、佛山、东莞、中山、珠海、江门、惠州、长沙、和重庆区域"/>
            </Form.Item>
            
            <Form.Item label="轮播图信息" >
            <Row gutter={20} justify="center">
            <Col span={12} style={{ marginTop: 20 }}>
                <Form.Item name={["samples1","tabName"]} noStyle><Input placeholder="如：现代风格" /></Form.Item>
                <Form.Item name={["samples1","familyName"]} noStyle><Input placeholder="如：广州雅居乐-剑桥郡-四居室" /></Form.Item>
                <Form.Item name={["samples1","img"]} noStyle><Input placeholder="如：图片链接" /></Form.Item>
                <Form.Item name={["samples1","description"]} noStyle><Input placeholder="如：风格介绍" /></Form.Item>
              </Col>
              <Col span={12} style={{ marginTop: 20 }}>
                <Form.Item name={["samples2","tabName"]} noStyle><Input placeholder="如：现代风格" /></Form.Item>
                <Form.Item name={["samples2","familyName"]} noStyle><Input placeholder="如：广州雅居乐-剑桥郡-四居室" /></Form.Item>
                <Form.Item name={["samples2","img"]} noStyle><Input placeholder="如：图片链接" /></Form.Item>
                <Form.Item name={["samples2","description"]} noStyle><Input placeholder="如：风格介绍" /></Form.Item>
              </Col>
            </Row>
            <Row gutter={20} justify="center" >
              <Col span={12} style={{ marginTop: 20 }}>
                <Form.Item name={["samples3","tabName"]} noStyle><Input placeholder="如：现代风格" /></Form.Item>
                <Form.Item name={["samples3","familyName"]} noStyle><Input placeholder="如：广州雅居乐-剑桥郡-四居室" /></Form.Item>
                <Form.Item name={["samples3","img"]} noStyle><Input placeholder="如：图片链接" /></Form.Item>
                <Form.Item name={["samples3","description"]} noStyle><Input placeholder="如：风格介绍" /></Form.Item>
              </Col>
              <Col span={12} style={{ marginTop: 20 }}>
                <Form.Item name={["samples4","tabName"]} noStyle><Input placeholder="如：现代风格" /></Form.Item>
                <Form.Item name={["samples4","familyName"]} noStyle><Input placeholder="如：广州雅居乐-剑桥郡-四居室" /></Form.Item>
                <Form.Item name={["samples4","img"]} noStyle><Input placeholder="如：图片链接" /></Form.Item>
                <Form.Item name={["samples4","description"]} noStyle><Input placeholder="如：风格介绍" /></Form.Item>
              </Col>
            </Row>
            </Form.Item>
            <Row justify="center" className="btn_box">
              <Button
                htmlType="submit"
                type="primary"
                className="btn_sure"
                onClick={this.getAdd}
              >
                确认
              </Button>
              <Button className="btn_sure">
                <Link to="/">取消</Link>
              </Button>
            </Row>
          </Form>
        </div>
      </div>
    );
  }
}

export default Details;
