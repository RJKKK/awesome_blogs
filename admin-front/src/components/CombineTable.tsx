import React, {ReactComponentElement} from "react";
import {Button, Table, Input, Pagination} from 'antd'
import {SearchOutlined} from '@ant-design/icons'
import styled from "styled-components";
import {TableProps as RcTableProps} from "rc-table/lib/Table";
import {ColumnsType} from "antd/lib/table/interface";
import {useLifecycles, useList, useSetState, useStateList} from 'react-use'
import {account} from "../untils/FormValidation";
import {loginApi} from "../api";
import {useApi} from "../hook/useApi";

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
const TableHoc = EnhanceTable<{naas:string}>()
 export  function EnhanceTable<T extends object>(){
    return (props: {
        columns: ColumnsType<T>;
        Api: Function; }) => {
        const [params,setParams] = useSetState({
            keywords:'',
            pageSize:10,
            pageNumber:1
        });
        const [list, { set, clear, reset }] = useList<T>([]);
        const fetch = async ()=>{
            const res = (await props.Api(params))
            set(res);
        }
        const changeKeywords = (e:React.ChangeEvent<HTMLInputElement>)=>{
            setParams({keywords: e.target.value})
        }
        useLifecycles( ()=>{
             fetch()
        })
        const editor = <>
            <a href="javascript:;">编辑</a>
            <a href='javascript:;'>查看</a>
            <a href="javascript:;">删除</a>
        </>
        return (
            <Style>
                <div className="middle">
                    <div className="left">
                        <Button>删除用户</Button>
                    </div>
                    <div className="right">
                        <SearchOutlined onClick={fetch} />
                        <Input value={params.keywords} onChange={changeKeywords}/>
                    </div>
                </div>
                <Table dataSource={list?list:[]} columns={props.columns}/>
                <br/>
                <Pagination onChange={fetch} total={50} />
            </Style>
        )
    }

 }

 export default function MyTable (){
    return(
        <>
            <TableHoc columns={[
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
            ]} Api={loginApi}></TableHoc>
        </>
    )
 }