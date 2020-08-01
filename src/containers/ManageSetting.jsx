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

        // console.log(districtList);
        // const data = querySnapshot.docs.map((doc) =>
        //   Object.assign(doc.data(), { id: doc.id })
        // );
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
          <div class="form-group">
            {Object.keys(districtList).map((district) => (
              <div class="form-check" key={district}>
                <input
                  type="checkbox"
                  class="form-check-input"
                  checked={districtList[district]}
                  onClick={() => console.log(districtList[district])}
                  onChange={(e) => {
                    const newDistrictList = { ...districtList };
                    newDistrictList[district] = e.target.checked;
                    console.log(newDistrictList);
                    this.setState({ districtList: newDistrictList });
                  }}
                />
                <label class="form-check-label" htmlFor={district}>
                  {district}
                </label>
              </div>
            ))}
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
