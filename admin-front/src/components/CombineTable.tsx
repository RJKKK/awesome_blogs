import React from "react";
import {Button, Table,Input} from 'antd'
import {SearchOutlined} from'@ant-design/icons'
import styled from "styled-components";
const Style = styled('div')`

   .middle {
  display: flex;
  justify-content: space-between;
  margin: 20px 0 16px 0;
  .left .ant-btn {
      &:active,&:focus{
      color: #B0DEFF;
      border-color: #A3D9FF;
      }
  }
  .right {
  position: relative;
  width: 223px;
  height: 30px;
  span {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 1;
    font-size: 14px;
    color: #909399;
  }
  .ant-input {
    width: 223px;
    height: 30px;
    font-size: 12px;
    color: #707070;
    background: #EBEEF5;
    border-radius: 15px;
  }

}
}
  }
`
export default () =>{
    const dataSource = [
        {
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号',
        },
        {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
        },
    ];

    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
        },
    ];

    return(
        <Style>
            <div className="middle">
                <div className="left">
                    <Button>删除用户</Button>
                </div>
                <div className="right">
                    <SearchOutlined /><Input/>
                </div>
            </div>
            <Table dataSource={dataSource} columns={columns} />

        </Style>
        );

}
