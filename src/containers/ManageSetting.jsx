import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Header from "../components/Header";
import { Redirect } from "react-router";
import { signOut } from "../functions";
import { db } from "../firebase";
import "./ManageOrders.css";
import { Link } from "react-router-dom";

class ManageSetting extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      districtList: [],
      loading: true,
    };
  }

  async componentDidMount() {
    db.collection("options")
      .doc("districtList")
      .get()
      .then((querySnapshot) => {
        const responseData = querySnapshot.data();
        this.setState({
          districtList: responseData,
          loading: false,
        });
      });
  }

  saveSetting = () => {
    db.collection("options")
      .doc("districtList")
      .set(this.state.districtList)
      .then(() => {
        alert("Đã lưu lại tùy chọn!");
        window.location = "/admin";
      })
      .catch((err) => alert(`Lỗi: ${err}`));
  };

  render() {
    const { isLogin } = this.props;
    const { districtList, loading } = this.state;
    const localLoginStatus = localStorage.getItem("loginStatus");
    if (!isLogin && !localLoginStatus) return <Redirect to="login" />;
    if (loading) return <div>Loading...</div>;
    return (
      <div>
        <Header />
        <div className="container">
          <h3>Tùy chọn</h3>
          <div className="row nav-bar">
            <div className="col-10"></div>
            <div className="col-2" style={{ textAlign: "center" }}>
              <Link to="/admin">Orders</Link>
              {` | `}
              <Link
                onClick={() => {
                  signOut();
                  window.location = "/login";
                  //   this.setState({ loginInfo: loginResult });
                }}
              >
                Logout
              </Link>
            </div>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Khu vực</th>
                <th scope="col">Phí ship</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(districtList).map((district) => (
                <tr key={district}>
                  <td>
                    {" "}
                    <input
                      type="checkbox"
                      checked={districtList[district]["active"]}
                      onChange={(e) => {
                        const newDistrictList = { ...districtList };
                        newDistrictList[district]["active"] = e.target.checked;
                        this.setState({ districtList: newDistrictList });
                      }}
                    />
                  </td>
                  <td>{district}</td>
                  <td>
                    <input
                      className="form-control"
                      type="text"
                      value={districtList[district]["price"]}
                      onChange={(e) => {
                        const newDistrictList = { ...districtList };
                        newDistrictList[district]["price"] = Number(
                          e.target.value
                        );
                        this.setState({ districtList: newDistrictList });
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="form-group">
            <button
              style={{ marginTop: "25px" }}
              className="btn btn-primary"
              onClick={() => this.saveSetting()}
            >
              Đồng ý
            </button>
          </div>
        </div>
      </div>
    );
  }
}

ManageSetting.propTypes = {};

export default ManageSetting;
