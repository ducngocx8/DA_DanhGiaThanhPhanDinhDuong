import React, { memo } from "react";
function Footer() {
  return (
    <footer className="flex_center" style={{ backgroundColor: "var(--blue)" }}>
      <div className="_1200px flex" style={{ padding: "30px 0px" }}>
        <div className="footer_left" style={{ flex: 3, color: "#fff" }}>
          <h3 className="pd-10_0">Giới Thiệu</h3>
          <p>
            Chất dinh dưỡng rất quan trọng đối với sức khỏe cũng như sự tăng
            trưởng và phát triển về tầm vóc và trí tuệ của cơ thể. Sở hữu chế độ
            ăn được cung cấp đầy đủ chất dinh dưỡng sẽ giúp cơ thể khỏe mạnh và
            tránh nguy cơ mắc phải nhiều loại bệnh lý.
          </p>
        </div>
        <div
          className="footer_mid"
          style={{ flex: 4, color: "#fff", textAlign: "center" }}
        >
          <h3 className="pd-10_0">Hotline Liên Hệ</h3>
          <div>
            <p>
              <a
                href="tel:0378544081"
                style={{
                  textDecoration: "none",
                  color: "#f19f01",
                  fontWeight: 700,
                }}
              >
                0378544081 (Đức Ngọc)
              </a>
            </p>
            <p>Từ thứ Hai đến thứ Bảy (08:00 - 17:00)</p>
            <p>Chủ nhật (08:00 - 12:00)</p>
          </div>
        </div>
        <div className="footer_right" style={{ flex: 3, color: "#fff" }}>
          <h3 className="pd-10_0">Tiện Ích Tra Cứu</h3>
          <div>
            <p>Tra cứu thực phẩm, món ăn</p>
            <p>Tin tức, bài viết dinh dưỡng</p>
            <p>Dưỡng chất món ăn, thực phẩm</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
