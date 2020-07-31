import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { db } from "../firebase";
import moment, { isMoment } from "moment";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "./HomePage.css";
// import { loadReCaptcha, ReCaptcha } from "react-recaptcha-google";

class HomePage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      clientName: "",
      clientAddress: "",
      clientPhoneNumber: "",
      orderInfo: "",
      // captchaOK: false,
    };
  }

  // componentDidMount() {
  //   loadReCaptcha();
  // }

  // onLoadRecaptcha() {
  //   if (this.captchaDemo) {
  //     this.captchaDemo.reset();
  //     this.captchaDemo.execute();
  //   }
  // }

  // verifyCallback(recaptchaToken) {
  //   // Here you will get the final recaptchaToken!!!
  //   this.setState({ captchaOK: true });
  //   // console.log(recaptchaToken, "<= your recaptcha token");
  // }

  submitOrder = () => {
    // console.log(this.state);
    const {
      clientAddress,
      clientName,
      clientPhoneNumber,
      orderInfo,
      // captchaOK,
    } = this.state;
    if (
      !(
        (clientAddress && clientName && clientPhoneNumber && orderInfo)
        // && captchaOK
      )
    ) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    try {
      const currentTime = new Date().getTime();
      const submitInfomation = {
        clientName,
        clientAddress,
        clientPhoneNumber,
        orderInfo,
        orderStatus: false,
        orderPrice: null,
        submitTime: currentTime,
      };
      db.collection("requests")
        .add(submitInfomation)
        .then((ref) => {
          alert("Đơn hàng đã được ghi nhận!");
          // Clear old info
          this.setState({
            clientName: "",
            clientAddress: "",
            clientPhoneNumber: "",
            orderInfo: "",
          });
        });
    } catch (error) {
      alert("Không thể tạo đơn hàng. Lỗi: " + error);
    }
  };
  render() {
    const {
      clientName,
      clientAddress,
      clientPhoneNumber,
      orderInfo,
      // captchaOK,
    } = this.state;
    return (
      <div>
        <Header />
        <div className="container main-wrapper">
          <div className="client-form">
            <div className="form-group">
              <label htmlFor="clientName">
                Tên khách hàng / Client's name:
              </label>
              <input
                type="text"
                className="form-control"
                id="clientName"
                aria-describedby="clientName"
                value={clientName}
                onChange={(e) => this.setState({ clientName: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="clientAddress">Địa chỉ/ Address:</label>
              <input
                type="text"
                className="form-control"
                id="clientAddress"
                placeholder="VD: 365F Trần Hưng Đạo, Q1"
                value={clientAddress}
                onChange={(e) =>
                  this.setState({ clientAddress: e.target.value })
                }
              />
              <small id="clientAddressHelp" className="form-text text-muted">
                Ghi rõ địa chỉ cụ thể.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="clientPhoneNumber">
                Số điện thoại/ Phone's number:
              </label>
              <input
                type="text"
                className="form-control"
                id="clientPhoneNumber"
                placeholder="VD: 0909123456"
                value={clientPhoneNumber}
                onChange={(e) =>
                  this.setState({ clientPhoneNumber: e.target.value })
                }
              />
              <small id="clientPhoneNumber" className="form-text text-muted">
                Ghi rõ số điện thoại để nhân viên liên hệ.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="clientPhoneNumber">
                Thông tin đơn hàng/ Order's information:
              </label>
              <input
                type="text"
                className="form-control"
                id="orderInfo"
                placeholder="VD: 02 cuộn Kodak Ultramax 400"
                value={orderInfo}
                onChange={(e) => this.setState({ orderInfo: e.target.value })}
              />
              <small id="orderInfo" className="form-text text-muted">
                Thông tin đơn hàng.
              </small>
            </div>
            {/* <ReCaptcha
              sitekey="6LcHx7cZAAAAADM6F46WPCIlwfb6nv0V-YaRThc9"
              onloadCallback={this.onLoadRecaptcha}
              verifyCallback={() => this.setState({ captchaOK: true })}
            /> */}
            <button
              className="btn btn-primary"
              style={{ marginTop: "5px" }}
              onClick={() => this.submitOrder()}
              // disabled={captchaOK ? false : true}
            >
              Đồng ý
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

HomePage.propTypes = {};

export default HomePage;
