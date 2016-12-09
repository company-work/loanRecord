import React from 'react';
import Loading from 'components/loading/index.jsx';
import Toast from 'components/toast/index.jsx';
import Axios from 'axios';

//本地模拟测试，联调的时候删掉
import Mock from 'mockjs';
import './style.scss';
import {browserHistory } from 'react-router'
class RecordList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      curRecord: {
        money: "10000",
        time: "2",
        status: "完善信息",
        date: "2016.11.10"
      },
      recordList: [
        {
          money: "10000",
          time: "2",
          status: "失效",
          date: "2016.11.10"
        },
        {
          money: "100000",
          time: "2",
          status: "已完成",
          date: "2016.11.10"
        }
      ]
    }
  }

  go() {
    window.location.href = "http://192.168.2.246:8000/loanHome";
  }

  componentDidMount() {
    Loading.show("正在提交...");
    var self = this;
    //本地模拟生成的数据，联调的时候删除
    Mock.mock('/loanAmount', 'get', {
      'stat|1': true,
      'msg': '请求返回的msg',
      'result': {
        curRecord: null,
        recordList: [
          {
            money: "10000",
            time: "4",
            status: "1失效",
            date: "2016.11.10"
          },
          {
            money: "100000",
            time: "2",
            status: "已完成",
            date: "2016.11.10"
          }
        ]
      }
    });

    Axios.get(GOKU.interFace.recordList, {
        params: {
          openId: GOKU.openId,
          clientNo: GOKU.clientNo,
          loanType: GOKU.loanType
        }
      })
      .then(res => {
        //隐藏loading
        Loading.hide();

        let data = res.data;
        if (data.succ) {
          let result = data.result;
          let len = result.length;
          let recordArr = [];
          for (var i = 0; i < len; i++) {
            var obj = {};
            obj.money = result[i]['loanAmt'];
            obj.time = result[i]['loanLimit'];
            obj.status = result[i]['state'];
            obj.date = result[i]['reqDate'];
            recordArr.push(obj);
          }
          self.setState({
            curRecord: null,
            recordList: recordArr
          })
        } else {
          Toast.show(data.err_msg);
        }
      })
      .catch(err => {
        Loading.hide();
        Toast.show("服务端繁忙，请稍候...");
        console.log("Ajax error");
      });
  }

  render() {

    let curRecordData = this.state.curRecord;
    let oldRecordData = this.state.recordList;
    let curRecordHtm;
    let oldRecordHtm;
    if (curRecordData != null) {
      curRecordHtm = <div className="cur-record">
        <div className="record-box">
          <div className="box-left">
            <p>{oldRecordData.money}元</p>
            <div>{oldRecordData.time}期</div>
          </div>
          <div className="box-right">
            <p onClick={this.go.bind(this)}>{oldRecordData.status} <i className="iconfont icon-right"></i></p>
            <div>{oldRecordData.date}</div>
          </div>
        </div>
      </div>
    } else {
      curRecordHtm = <div className="cur-record-null">历史贷款记录</div>
    }


    if (oldRecordData != null) {
      oldRecordHtm = oldRecordData.map((item, index)=> {
        return (
          <li key={index}>
            <div className="record-box">
              <div className="box-left">
                <p>{item.money}元</p>
                <div>{item.time}期</div>
              </div>
              <div className="box-right">
                <p>{item.status}</p>
                <div>{item.date}</div>
              </div>
            </div>
          </li>
        )
      })
    }

    return (
      <div className="page-recordlist">
        {curRecordHtm}
        <ul className="record-list">
          {oldRecordHtm}
        </ul>
      </div>
    );
  }
}
module.exports = RecordList;

