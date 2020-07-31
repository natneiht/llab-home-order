import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import "./Footer.css";

class Footer extends PureComponent {
  render() {
    return (
      <footer className="footer-wrap">
        <div className="container">
          <div className="sig2-head">
            <p className="sig2-head-text">
              <span className="line">&nbsp;</span>
              Liên hệ{" "}
              <span className="text-sigred hidden-xs hidden-sm">
                LLAB SERVICES
              </span>
            </p>
          </div>
          <div className="row justify-content-center">
            <div className="col-xs-12 col-sm-6 col-md-6 col-sm-push-3 col-md-push-3">
              <div
                id="text-2"
                className="widget widget_text widget-shortcode area-footer-area-1"
              >
                {" "}
                <div className="textwidget">
                  <div className="footer-address-wrapper">
                    <div className="footer-address">
                      <div className="media">
                        <div className="media-left media-middle hidden">
                          <a
                            href="https://goo.gl/maps/nL9JdnX6GKz"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span className="fa-stack fa-lg custom-fa-stack">
                              <i className="fa fa-circle fa-stack-2x fa-inverse" />
                              <i className="fa fa-map-marker fa-stack-1x" />
                            </span>
                          </a>
                        </div>
                        <div className="media-body media-middle">
                          <h3 className="media-heading">Chi nhánh 1:</h3>
                          <p>
                            365f Đường Trần Hưng Đạo, Cầu Kho, Quận 1, Hồ Chí
                            Minh, Việt Nam
                          </p>
                          <br />
                          <h3 className="media-heading">Chi nhánh 2:</h3>
                          <p>
                            386/27C Lê Văn Sỹ, Phường 14, Quận 3 (Vào hẻm 400,
                            đối diện cafe RedDoor)
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="footer-address">
                      <div className="media">
                        <div className="media-left media-middle hidden">
                          <a href="tel:+84931347467">
                            <span className="fa-stack fa-lg custom-fa-stack">
                              <i className="fa fa-circle fa-stack-2x fa-inverse" />
                              <i className="fa fa-phone fa-stack-1x" />
                            </span>
                          </a>
                        </div>
                        <div className="media-body media-middle">
                          <h3 className="media-heading">
                            Số điện thoại chi nhánh 1:
                          </h3>
                          <p>
                            <a href="tel:+84934067834">
                              0934067834 (call only)
                            </a>
                          </p>
                          <br />
                          <h3 className="media-heading">
                            Số điện thoại chi nhánh 2:
                          </h3>
                          <p>
                            <a href="tel:+84931347467">
                              0931347467 (call only)
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="footer-address">
                      <div className="media">
                        <div className="media-left media-middle hidden">
                          <a href="mailto:service@llab.vn">
                            <span className="fa-stack fa-lg custom-fa-stack">
                              <i className="fa fa-circle fa-stack-2x fa-inverse" />
                              <i className="fa fa-envelope fa-stack-1x" />
                            </span>
                          </a>
                        </div>
                        <div className="media-body media-middle">
                          <h3 className="media-heading">Mail</h3>
                          <p>
                            <a href="mailto:service@llab.vn">service@llab.vn</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="footer-address-wrapper"
                style={{ display: "none" }}
              >
                <div className="footer-address">
                  <div className="media">
                    <div className="media-left media-top">
                      <a href="https://goo.gl/maps/nL9JdnX6GKz" target="_blank">
                        <span className="fa-stack fa-lg custom-fa-stack">
                          <i className="fa fa-circle fa-stack-2x fa-inverse" />
                          <i className="fa fa-map-marker fa-stack-1x" />
                        </span>
                      </a>
                    </div>
                    <div className="media-body media-middle">
                      <h3 className="media-heading">Chi nhánh 1:</h3>
                      <p>
                        <a
                          href="https://goo.gl/maps/an6mDyjFmwF2"
                          target="_blank"
                        >
                          365f Đường Trần Hưng Đạo, Cầu Kho, Quận 1, Hồ Chí
                          Minh, Việt Nam
                        </a>
                      </p>
                      <br />
                      <h3 className="media-heading">Chi nhánh 2:</h3>
                      <p>
                        <a
                          href="https://goo.gl/maps/QGE6nnZRnRo"
                          target="_blank"
                        >
                          400 Lê Văn Sỹ (Vào hẻm 100m) , Phường 14, Quận 3, HCM
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="footer-address">
                  <div className="media">
                    <div className="media-left media-top">
                      <a href="tel:+84931347467">
                        <span className="fa-stack fa-lg custom-fa-stack">
                          <i className="fa fa-circle fa-stack-2x fa-inverse" />
                          <i className="fa fa-phone fa-stack-1x" />
                        </span>
                      </a>
                    </div>
                    <div className="media-body media-middle">
                      <h3 className="media-heading">
                        Số điện thoại chi nhánh 1:
                      </h3>
                      <p>
                        <a href="tel:+84934067834">0934067834 (call only)</a>
                      </p>
                      <br />
                      <h3 className="media-heading">
                        Số điện thoại chi nhánh 2:
                      </h3>
                      <p>
                        <a href="tel:+84931347467">0931347467 (call only)</a>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="footer-address">
                  <div className="media">
                    <div className="media-left media-middle">
                      <a href="mailto:service@llab.vn">
                        <span className="fa-stack fa-lg custom-fa-stack">
                          <i className="fa fa-circle fa-stack-2x fa-inverse" />
                          <i className="fa fa-envelope fa-stack-1x" />
                        </span>
                      </a>
                    </div>
                    <div className="media-body media-middle">
                      <h3 className="media-heading">Mail</h3>
                      <p>
                        <a href="mailto:service@llab.vn">service@llab.vn</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-copyright text-center">
            <p>Coppyright by @LLab Co.Ltd Version 2.1</p>
          </div>
        </div>
      </footer>
    );
  }
}

Footer.propTypes = {};

export default Footer;
