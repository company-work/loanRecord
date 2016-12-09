import React,{ Component,PropTypes } from 'react';
import ReactDOM from 'react-dom';
import './style.scss';

let loanLoading = {
  show:function(text){
    let txt = text;
    let self = this;
    let toastDom = document.createElement("div");
    toastDom.setAttribute("id", "LoanLoading");
    document.body.appendChild(toastDom);


    ReactDOM.render((
      <div className='loan-loading'>
        <div className="loan-loading-warp">
          <div className="loan-loading-img"></div>
          <div className="loan-loading-txt">{txt}</div>
        </div>
      </div>
    ), document.getElementById('LoanLoading'));

  },
  hide:function(){
    var toastDom = document.getElementById('LoanLoading');
    if (toastDom) {
      toastDom.parentNode.removeChild(toastDom);
    }
  }
};



module.exports = loanLoading;
