import React from "react";
import {Button, Table, Input} from 'antd'
import {SearchOutlined} from '@ant-design/icons'
import styled from "styled-components";
import {TableProps as RcTableProps} from "rc-table/lib/Table";
import {ColumnsType} from "antd/lib/table/interface";
import {useLifecycles, useList, useSetState} from 'react-use'
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

 export default function EnhanceTable<T extends object>(){
    return (props: {
        columns: ColumnsType<T>;
        Api: Promise<Function>; }) => {
        const [params,setParams] = useSetState({
            keywords:'',
            pageSize:10,
            pageNumber:1
        });
        const {state,fetch} = useApi<T>(async function()  {
            const res = (await props.Api)(params)
            return {...res,list:res.list.map((val: T, index: number)=>{
                    return{...val,key:index as number}
                })}
        })
        useLifecycles(async ()=>{
            await fetch()
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
                        <SearchOutlined onClick={fetch} /><Input/>
                    </div>
                </div>
                <Table dataSource={state.value?state.value.list:[]} columns={props.columns}/>

            </Style>
        )
    }

 }