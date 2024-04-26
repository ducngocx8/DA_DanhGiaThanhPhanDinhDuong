import React from "react";
import { Link } from "react-router-dom";
import "../../../../css/Header.css";
import "../../../../css/App.css";
export default function ChildHeader() {
  return (
    <header
      className="_100vw"
      style={{
        backgroundColor: "#2196F3",
      }}
    >
      <div className="_1200px flex_between">
        <ul className="ul_menu">
          <li className="li_menu">
            <Link className="link_menu" to={"/"}>
              Trang chủ
            </Link>
          </li>
          <li className="li_menu">
            <Link className="link_menu" to={"/dinh-duong"}>
              Tra cứu thực phẩm
            </Link>
          </li>
          <li className="li_menu">
            <Link className="link_menu" to={"/duong-chat"}>
              Tra cứu dưỡng chất
            </Link>
          </li>
          <li className="li_menu">
            <Link className="link_menu" to={"/nhu-cau-dinh-duong"}>
              Nhu cầu dinh dưỡng
            </Link>
          </li>
          <li className="li_menu">
            <Link className="link_menu" to={"/duong-chat-mon-an"}>
              Dưỡng chất món ăn
            </Link>
          </li>
          <li className="li_menu">
            <Link className="link_menu" to={"/tin-tuc"}>
              Tin dinh dưỡng
            </Link>
          </li>
          <li className="li_menu">
            <Link className="link_menu" to={"#"}>
              Tiện ích tra cứu
            </Link>
            <ul className="sub_menu">
              <li>
                <Link title="Chỉ số đường huyết" to="/chi-so-duong-huyet">
                  Chỉ số đường huyết
                </Link>
              </li>
              <li>
                <Link title="Tính BMI" to="/bmi-online">
                  Tính BMI
                </Link>
              </li>
            </ul>
          </li>
          <li className="li_menu">
            <Link className="link_menu" to={"/goi-y-thuc-don"}>
              Gợi ý thực đơn
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
