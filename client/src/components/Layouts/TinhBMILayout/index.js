import React, { useState } from "react";
import {} from "../../../api";
import { notify } from "../../../Utils/Title";
import RenderNhomThucPham from "../Product/RenderNhomThucPham";
export default function TinhBMILayout() {
  const [chieuCaoChoose, setChieuCaoChoose] = useState("");
  const [canNangChoose, setCanNangChoose] = useState("");
  const [ketQua, setKetQua] = useState("");

  const handleTraCuu = () => {
    setKetQua("");
    if (
      chieuCaoChoose === "" ||
      isNaN(chieuCaoChoose) ||
      Number(chieuCaoChoose) <= 0
    ) {
      notify(false, "Chiều cao không hợp lệ");
    } else if (
      canNangChoose === "" ||
      isNaN(canNangChoose) ||
      Number(canNangChoose) <= 0
    ) {
      notify(false, "Cân nặng không hợp lệ");
    } else {
      const chieu_cao = Number(chieuCaoChoose) / 100;
      const result = Number(canNangChoose) / (chieu_cao * chieu_cao);
      setKetQua(result.toFixed(2));
    }
  };

  const renderKetQua = () => {
    const gay_binh_thuong =
      ". Sau khi có được lượng calo cần thiết cho cơ thể, bạn có thể cộng thêm khoảng 200 kcal nếu muốn giảm 0.25kg/ tuần hoặc 500 kcal nếu muốn tăng 0.5kg/ tuần.";
    const beo_phi =
      ". Sau khi tính được lượng calo cần thiết cho cơ thể, bạn có thể trừ đi khoảng 200 kcal nếu muốn giảm 0.25kg/ tuần hoặc 500 kcal nếu muốn giảm 0.5kg/ tuần.";
    if (ketQua !== "") {
      if (ketQua < 16) {
        return (
          <p>
            <span style={{ color: "green" }}>Kết quả: </span>{" "}
            <span style={{ color: "blue" }}>{ketQua}</span>. Thuộc loại: Gầy độ 3 {gay_binh_thuong}
          </p>
        );
      } else if (ketQua >= 16 && ketQua < 17) {
        return (
          <p>
            <span style={{ color: "green" }}>Kết quả: </span>{" "}
            <span style={{ color: "blue" }}>{ketQua}</span>. Thuộc loại: Gầy độ
            2 {gay_binh_thuong}
          </p>
        );
      } else if (ketQua >= 17 && ketQua < 18.5) {
        return (
          <p>
            <span style={{ color: "green" }}>Kết quả: </span>{" "}
            <span style={{ color: "blue" }}>{ketQua}</span>. Thuộc loại: Gầy độ
            1 {gay_binh_thuong}
          </p>
        );
      } else if (ketQua >= 18.5 && ketQua < 25) {
        return (
          <p>
            <span style={{ color: "green" }}>Kết quả: </span>{" "}
            <span style={{ color: "blue" }}>{ketQua}</span>. Thuộc loại: Bình
            thường {gay_binh_thuong}
          </p>
        );
      } else if (ketQua >= 25 && ketQua < 30) {
        return (
          <p>
            <span style={{ color: "green" }}>Kết quả: </span>{" "}
            <span style={{ color: "blue" }}>{ketQua}</span>. Thuộc loại: Tiền
            béo phì {beo_phi}
          </p>
        );
      } else if (ketQua >= 30 && ketQua < 35) {
        return (
          <p>
            <span style={{ color: "green" }}>Kết quả: </span>{" "}
            <span style={{ color: "blue" }}>{ketQua}</span>. Thuộc loại: Béo phì
            độ 1 {beo_phi}
          </p>
        );
      } else if (ketQua >= 35 && ketQua < 40) {
        return (
          <p>
            <span style={{ color: "green" }}>Kết quả: </span>{" "}
            <span style={{ color: "blue" }}>{ketQua}</span>. Thuộc loại: Béo phì
            độ 2 {beo_phi}
          </p>
        );
      } else if (ketQua >= 40) {
        return (
          <p>
            <span style={{ color: "green" }}>Kết quả: </span>{" "}
            <span style={{ color: "blue" }}>{ketQua}</span>. Thuộc loại: Béo phì
            độ 3 {beo_phi}
          </p>
        );
      }
    }
  };

  return (
    <div className="favorite_book_list flex_center mg-10_0">
      <div
        className="_1200px bg-white pd-10"
        style={{ display: "flex", minHeight: "85vh" }}
      >
        {/* Flex 3 */}
        <div style={{ flex: 3 }}>
          <div
            className="favorite_book_list_icon_title"
            style={{ padding: "5px 0px", borderBottom: "1px solid #007bff" }}
          >
            <img
              src={"./icons/data_thucpham.png"}
              className="icon_sach"
              alt={"icon_du_lieu_thuc_pham"}
            />
            <span className="favorite_book_list_title mg-l-10">
              Kiểm tra chỉ số BMI Online
            </span>
          </div>
          <div className="favorite_book_item mg-10_0">
            {/* Content */}
            <p>
              BMI (viết tắt của Body Mass Index) là chỉ số khối cơ thể được tính
              bằng cân nặng (kg) chia cho bình phương của chiều cao (mét), để
              đánh giá được tình trạng cơ thể: gầy, cân đối, thừa cân, béo phì
              của một người trưởng thành.
            </p>
            <img
              style={{
                width: "100%",
                marginBottom: "10px",
              }}
              src="/images/bmi.jpg"
              alt="bmi"
            />
            <p>
              - Chỉ số BMI của bạn dưới 18,5: Bạn đang gặp phải tình trạng thiếu
              cân, vì thế nên áp dụng các phương pháp ăn uống và luyện tập để
              tăng trọng lượng cơ thể.
            </p>
            <p>
              - Chỉ số BMI của bạn là 18,5 đến 24,9: Bạn đang sở hữu cân nặng
              khỏe mạnh, cần duy trì quá trình ăn uống và sinh hoạt như thường
              ngày.
            </p>
            <p>
              - Chỉ số BMI của bạn là 25 đến 29,9: Bạn đang trong tình trạng
              thừa cân, cần áp dụng thực đơn ăn kiêng hợp lý cùng việc luyện tập
              khoa học để lấy lại vóc dáng chuẩn nhất.
            </p>
            <p>
              - Chỉ số BMI của bạn từ 30 trở lên: Bạn đang bị béo phì và tình
              trạng này có thể khiến bạn gặp rất nhiều vấn đề về sức khỏe cũng
              như trong sinh hoạt.
            </p>
            <p>
              <span style={{ color: "red" }}>Lưu ý:</span> Chỉ số BMI không áp
              dụng cho phụ nữ có thai, vận động viên, người tập thể hình
            </p>
            <p>
              Nhập thông tin chiều cao, cân nặng rồi nhấn "<b>Xem kết quả</b>"
            </p>
            <div style={{ marginBottom: 20 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: "30%",
                    marginRight: 10,
                  }}
                >
                  <label className="form-label">Chiêu cao (cm)</label>
                  <input
                    onChange={(e) => setChieuCaoChoose(e.target.value)}
                    className="form-control"
                    type="number"
                    defaultValue={chieuCaoChoose}
                    placeholder="VD: 120"
                  />
                </div>

                <div
                  style={{
                    width: "30%",
                    marginLeft: 10,
                  }}
                >
                  <label className="form-label">Cân nặng (kg)</label>
                  <input
                    onChange={(e) => setCanNangChoose(e.target.value)}
                    className="form-control"
                    type="number"
                    defaultValue={canNangChoose}
                    placeholder="VD: 55"
                  />
                </div>
              </div>

              <div
                style={{
                  marginTop: 10,
                  textAlign: "center",
                }}
              >
                <button
                  onClick={() => {
                    handleTraCuu();
                  }}
                  style={{
                    whiteSpace: "nowrap",
                    marginLeft: 10,
                    marginTop: 0,
                  }}
                  className="btn_buynow"
                >
                  Xem kết quả
                </button>
              </div>
              <div style={{ textAlign: "center", marginTop: 10 }}>
                {renderKetQua()}
              </div>
            </div>
          </div>
        </div>
        {/* FLEX 1 */}
        <div
          style={{
            flex: 1,
            marginLeft: 20,
          }}
        >
          {/* Right */}
          <div
            className="category_title bg-primary color-white"
            style={{
              padding: "5px 10px",
            }}
          >
            Nhóm thực phẩm
          </div>
          <RenderNhomThucPham />
        </div>
      </div>
    </div>
  );
}
