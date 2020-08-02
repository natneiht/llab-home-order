import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import MaterialTable from "material-table";
import moment from "moment";
import { db } from "../firebase";
import { Redirect } from "react-router";
import { signOut, formatCurrency } from "../functions";
import "./ManageOrders.css";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import DoneIcon from "../svg/done.svg";

class ManageOrders extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      orderList: [],
      hideComplete: false,
      loading: true,
    };
  }

  async componentDidMount() {
    db.collection("requests")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) =>
          Object.assign(doc.data(), { id: doc.id })
        );
        this.setState({ orderList: data, loading: false });
      });
  }

  updateOrderDetail = (id, detail) => {
    db.collection("requests").doc(id).set(detail);
    // .then((result) => console.log(result))
    // .catch((err) => console.log(err));
  };

  removeOrder = (id) => {
    const result = window.confirm("Bạn có chắc chắn xóa đơn hàng này không?");
    if (!result) return;
    db.collection("requests")
      .doc(id)
      .delete()
      .then(() => alert("Đã xóa thành công!"))
      .catch((err) => alert("Lỗi: " + err));
  };

  render() {
    const { orderList, loading, hideComplete } = this.state;
    const { isLogin } = this.props;
    const localLoginStatus = localStorage.getItem("loginStatus");
    let renderList;
    if (!isLogin && !localLoginStatus) return <Redirect to="login" />;
    // console.log(orderList);
    if (loading) return <div>Loading...</div>;
    const columns = [
      { title: "Tên KH", field: "clientName", type: "string" },
      { title: "Số điện thoại", field: "clientPhoneNumber", type: "string" },
      { title: "Địa chỉ", field: "clientAddress", type: "string" },
      { title: "Khu vực", field: "clientDistrict", type: "string" },
      { title: "Đơn hàng", field: "orderInfo" },
      {
        title: "Ngày",
        field: "submitTime",
        type: "date",
        render: (data) =>
          moment(data["submitTime"]).format("DD/MM/YYYY h:mm:ss a"),

        defaultSort: "desc",
      },
      {
        title: "Ship",
        field: "shippingPrice",
        render: (data) =>
          data["shippingPrice"] ? formatCurrency(data["shippingPrice"]) : null,
      },
      {
        title: "Thành tiền",
        field: "orderPrice",
        render: (data) =>
          data["orderPrice"] ? formatCurrency(data["orderPrice"]) : null,
      },

      {
        title: "Tình trạng",
        field: "orderStatus",
        lookup: { true: "Đã xong", false: "Đang chờ" },
      },
      // { title: "Ngày", field: "submitDateString", hidden: false },
    ];
    if (hideComplete) {
      renderList = orderList.filter((item) => item["orderStatus"] == "false");
    } else {
      renderList = orderList;
    }
    // console.log(renderList);
    return (
      <div>
        <Header />
        <div className="container-lg">
          <div className="row nav-bar">
            <div className="col-10">
              <input
                type="checkbox"
                value={hideComplete}
                onClick={(e) =>
                  this.setState({ hideComplete: e.target.checked })
                }
              />{" "}
              Ẩn các đơn hàng đã hoàn thành
            </div>
            <div className="col-2" style={{ textAlign: "center" }}>
              <Link to="/setting">Setting</Link>
              {` | `}
              <Link
                to="/login"
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
          <div className="col-lg-12 admin-wrapper">
            <MaterialTable
              title="Danh sách đơn hàng"
              columns={columns}
              data={renderList}
              options={{
                pageSize: renderList.length < 25 ? renderList.length : 25,
                exportButton: true,
                exportAllData: false,
              }}
              editable={{
                // onRowAdd: (newData) =>
                //   new Promise((resolve) => {
                //     setTimeout(() => {
                //       resolve();
                //       const requestList = [...this.state.requestList];
                //       requestList.push(newData);
                //       this.setState({ requestList });
                //     }, 600);
                //   }),
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve) => {
                    setTimeout(() => {
                      resolve();
                      let newRenderList = [...renderList];
                      this.updateOrderDetail(oldData.id, newData);
                      newRenderList[newRenderList.indexOf(oldData)] = newData;
                      this.setState({ orderList: newRenderList });
                    }, 600);
                  }),
                onRowDelete: (oldData) =>
                  new Promise((resolve) => {
                    setTimeout(() => {
                      resolve();
                      let newRenderList = [...renderList];
                      this.removeOrder(oldData.id);
                      newRenderList.splice(newRenderList.indexOf(oldData), 1);
                      this.setState({ orderList: newRenderList });
                    }, 600);
                  }),
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

ManageOrders.propTypes = {};

export default ManageOrders;
