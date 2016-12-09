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
        require('./routes/ContractDetails'),
        //合同签署
        require("./routes/ContractSign")
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
