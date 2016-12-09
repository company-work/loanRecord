import React,{ Component,PropTypes } from 'react';
import Axios from 'axios';
import Toast from 'components/toast/index.jsx';
import Loading from 'components/loading/index.jsx';
import './style.scss';

const propTypes = {
  className: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  introImg: PropTypes.string,
  defaultImg: PropTypes.string,
  imgData: PropTypes.object
};


class loanUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeCode: "",
      img: this.props.introImg,
      percent: 0,
      percentFlag: false,
      maskFlag: true
    }
  }

  componentDidMount() {
    let imgObj = this.props.imgData;
    if (!imgObj) return;
    this.state.typeCode = imgObj.typeCode;
    let defaultImg = imgObj['attachUrl'];
    if (defaultImg) {
      this.state.img = defaultImg;
    }
    this.setState(this.state);
  }

  shouldComponentUpdate(newProps, newState) {

    if (newProps.imgData) {
      let imgObj = newProps.imgData;
      newState.typeCode = imgObj.typeCode;
      let defaultImg = imgObj['attachUrl'];
      if (defaultImg) {
        newState.img = defaultImg;
        newState.maskFlag = false;
      }
    }

    if (false) {
      return false;
    } else {
      return true;
    }
  }


  preview(evt) {
    var self = this;
    var file = evt.target.files;

    let reader = new FileReader();
    reader.onload = (function (theFile) {
      return function (e) {
        self.refs.preview.title = theFile.name;
        self.refs.preview.src = e.target.result;

        let img = {
          name: theFile.name,
          data: e.target.result
        };
      }
    })(file[0]);
    reader.readAsDataURL(file[0]);

    //这里执行上传
    let imgCode = self.state.typeCode;
    let loanReqNum = kukie.getCookie("loanReqNum");
    if (!loanReqNum) return;

    let form = new FormData();
    form.append('openId', GOKU.openid);
    form.append('typeCode', imgCode);
    form.append('reqNo', loanReqNum);
    form.append('img', file[0]);

    var config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: function (progressEvent) {
        self.setState({
          percentFlag: true
        });
        var percentCompleted = progressEvent.loaded / progressEvent.total;
        let percentNum = Math.floor(percentCompleted * 100);
        self.setState({
          percent: percentNum
        });
        if (percentNum == 100) {
          self.setState({
            percentFlag: false
          });
        }
      }
    };

    Axios.post(GOKU.interFace.saveAuthImg, form, config)
      .then((res)=> {
        let data = res.data;
        if (data.succ) {
          self.setState({
            maskFlag: false
          });
          self.props.onChange && self.props.onChange(true);
        } else {
          Toast.show(data.err_msg);
        }
      })
      .catch(e=> {
        Loading.hide();
        Toast.show("服务端繁忙，请稍候...");
      });

  }

  render() {
    //初始化图片
    let img = this.state.img;

    let uploadMaskHtm;
    if (this.state.maskFlag) {
      uploadMaskHtm = <div className="upload-mask">
        <div className="upload-mask-icon"></div>
      </div>;
    }

    let percenHtm = "";
    if (this.state.percentFlag) {
      percenHtm = <div className="upload-percent">{this.state.percent}%</div>
    }

    return (
      <div className={this.props.className}>
        {percenHtm}
        <input type="file" onChange={this.preview.bind(this)} className="upload-input"/>
        {uploadMaskHtm}
        <div className="upload-view">
          <img ref="preview" src={img}/>
        </div>
      </div>
    );
  }
}

module.exports = loanUpload;
