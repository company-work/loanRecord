import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory } from 'react-router'

import 'normalize.css';
import './public/style/iconfont.scss';
import './public/style/base.scss';

//引入Cookie方法
window.kukie = require('./public/lib/cookie.js');

import APP from './routes/main';
import Index from './routes/LoanRecord/index.jsx';


//定义记录的各种状态
var recordStatusData={
    "CREATED":{
      txt:"新 创 建",
      num:0,
      index:0
    },
    "NORMAL":{
      txt:"已分配BD",
      num:1,
      index:1
    },
    "TRACKING":{
      txt:"已提交尽调",
      num:2,
      index:2
    },
    "TRACKED":{
      txt:"尽调完成",
      num:3,
      index:3
    },
    "CANCELED":{
      txt:"已经作废",
      num:-1,
      index:4
    },
    "APPROVED":{
      txt:"审核通过",
      num:4,
      index:5
    },
    "SIGNED":{
      txt:"已签合同",
      num:5,
      index:6
    },
    "PRE_RELEASE":{
      txt:"已 预 发",
      num:6,
      index:7
    },
    "SELLING":{
      txt:"已经发标",
      num:7,
      index:8
    },
    "SOLD_OUT":{
      txt:"募集成功",
      num:8,
      index:9
    },
    "BACKING":{
      txt:"回 款 中",
      num:9,
      index:10
    },
    "BACKED":{
      txt:"已经回款",
      num:10,
      index:11
    },
    "OVERDUE":{
      txt:"已经逾期",
      num:11,
      index:12
    }
};

//定义路由对象
const rootRoute = {
  childRoutes: [
    {
      path: '/',
      component: APP,//路由容器
      indexRoute: {component: Index},//借款记录首页
      childRoutes: [
        //记录详情
        require('./routes/RecordDetails'),
        //借款合同
        require('./routes/LoanContract'),
        //合同详情
        require('./routes/ContractDetails')
      ]
    }
  ]
};

ReactDOM.render((
  <Router
    history={hashHistory}
    routes={rootRoute}
  />
), document.getElementById('app'));
