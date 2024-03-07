const moment = require("moment");
const searchMonAnValidation = (req, res, next) => {
  const keyword = req.query.keyword;
  const category_id = req.query.category_id;
  const energy_from = req.query.energy_from;
  const energy_to = req.query.energy_to;
  const protein_from = req.query.protein_from;
  const protein_to = req.query.protein_to;
  const fat_to = req.query.fat_to;
  const fat_from = req.query.fat_from;
  const cabs_from = req.query.cabs_from;
  const cabs_to = req.query.cabs_to;
  if (
    !keyword ||
    (keyword && keyword.trim() === "") ||
    (category_id && !Number.isInteger(Number(category_id))) ||
    (energy_from && !Number.isInteger(Number(energy_from))) ||
    (energy_to && !Number.isInteger(Number(energy_to))) ||
    (protein_from && !Number.isInteger(Number(protein_from))) ||
    (protein_to && !Number.isInteger(Number(protein_to))) ||
    (fat_to && !Number.isInteger(Number(fat_to))) ||
    (fat_from && !Number.isInteger(Number(fat_from))) ||
    (cabs_from && !Number.isInteger(Number(cabs_from))) ||
    (cabs_to && !Number.isInteger(Number(cabs_to)))
  ) {
    return res.status(200).send({
      status: true,
      data: [],
    });
  }
  if (
    (energy_to && energy_from && Number(energy_to) < Number(energy_from)) ||
    (protein_to && protein_from && Number(protein_to) < Number(protein_from)) ||
    (fat_to && fat_from && Number(fat_to) < Number(fat_from)) ||
    (cabs_to && cabs_from && Number(cabs_to) < Number(cabs_from))
  ) {
    return res.status(200).send({
      status: true,
      data: [],
    });
  }
  next();
};

const searchThucPhamValidation = (req, res, next) => {
  const keyword = req.query.keyword;
  const category_id = req.query.category_id;
  const energy_from = req.query.energy_from;
  const energy_to = req.query.energy_to;
  const protein_from = req.query.protein_from;
  const protein_to = req.query.protein_to;
  const fat_to = req.query.fat_to;
  const fat_from = req.query.fat_from;
  const cabs_from = req.query.cabs_from;
  const cabs_to = req.query.cabs_to;
  if (
    !keyword ||
    (keyword && keyword.trim() === "") ||
    (category_id && !Number.isInteger(Number(category_id))) ||
    (energy_from && !Number.isInteger(Number(energy_from))) ||
    (energy_to && !Number.isInteger(Number(energy_to))) ||
    (protein_from && !Number.isInteger(Number(protein_from))) ||
    (protein_to && !Number.isInteger(Number(protein_to))) ||
    (fat_to && !Number.isInteger(Number(fat_to))) ||
    (fat_from && !Number.isInteger(Number(fat_from))) ||
    (cabs_from && !Number.isInteger(Number(cabs_from))) ||
    (cabs_to && !Number.isInteger(Number(cabs_to)))
  ) {
    return res.status(200).send({
      status: true,
      data: [],
    });
  }
  if (
    (energy_to && energy_from && Number(energy_to) < Number(energy_from)) ||
    (protein_to && protein_from && Number(protein_to) < Number(protein_from)) ||
    (fat_to && fat_from && Number(fat_to) < Number(fat_from)) ||
    (cabs_to && cabs_from && Number(cabs_to) < Number(cabs_from))
  ) {
    return res.status(200).send({
      status: true,
      data: [],
    });
  }
  next();
};

const searchTop10ThucPhamValidation = (req, res, next) => {
  const keyword = req.query.keyword;
  if (
    !keyword ||
    typeof keyword !== "string" ||
    (keyword && keyword.trim() === "")
  ) {
    return res.status(200).send({
      status: true,
      data: [],
    });
  }
  next();
};

const duongChatValidation = (req, res, next) => {
  const code = req.query.code;
  if (!code || typeof code !== "string" || (code && code.trim() === "")) {
    return res.status(200).send({
      status: false,
      message: "Không tìm thấy dưỡng chất tra cứu.",
    });
  }
  next();
};

const offsetMonAnValidation = (req, res, next) => {
  const offset = req.query.offset;
  const limit = req.query.limit;
  if (!Number.isInteger(Number(offset))) {
    return res.status(201).send({
      status: false,
      message: "Offset phải là số nguyên",
    });
  }

  if (!Number.isInteger(Number(limit))) {
    return res.status(201).send({
      status: false,
      message: "Limit phải là số nguyên",
    });
  }
  next();
};

const offsetRandomMonAnValidation = (req, res, next) => {
  const limit = req.query.limit;
  const energy = req.query.energy;
  if (
    !Number.isInteger(Number(limit)) ||
    Number(limit) < 4 ||
    Number(limit) % 4 !== 0
  ) {
    return res.status(201).send({
      status: false,
      message: "Limit không hợp lệ",
    });
  }
  if (!Number.isInteger(Number(energy)) || Number(energy) < 200) {
    return res.status(201).send({
      status: false,
      message: "Energy phải là số nguyên > 200",
    });
  }
  next();
};

const offsetValidation = (req, res, next) => {
  const offset = req.query.offset;
  const limit = req.query.limit;
  const sort = req.query.sort;
  const type = req.query.type;
  const keyword = req.query.keyword;
  if (!Number.isInteger(Number(offset))) {
    return res.status(201).send({
      status: false,
      message: "Offset phải là số nguyên",
    });
  }

  if (!Number.isInteger(Number(limit))) {
    return res.status(201).send({
      status: false,
      message: "Limit phải là số nguyên",
    });
  }

  if (!type || (type && type !== "ASC" && type !== "DESC")) {
    return res.status(201).send({
      status: false,
      message: "Kiểu sắp xếp không hợp lệ",
    });
  }

  if (!sort || (sort && typeof sort !== "string")) {
    return res.status(201).send({
      status: false,
      message: "Cột dữ liệu sắp xếp không đúng",
    });
  }
  if (typeof keyword !== "string") {
    return res.status(201).send({
      status: false,
      message: "Từ khóa không hợp lệ",
    });
  }
  next();
};

const offsetFilterValidation = (req, res, next) => {
  const offset = req.query.offset;
  const limit = req.query.limit;
  const sort = req.query.sort;
  const type = req.query.type;
  const keyword = req.query.keyword;
  const status = req.query.status;
  if (!Number.isInteger(Number(offset))) {
    return res.status(201).send({
      status: false,
      message: "Offset phải là số nguyên",
    });
  }

  if (!Number.isInteger(Number(limit))) {
    return res.status(201).send({
      status: false,
      message: "Limit phải là số nguyên",
    });
  }

  if (!Number.isInteger(Number(status))) {
    return res.status(201).send({
      status: false,
      message: "Filter phải là số nguyên",
    });
  }

  if (!type || (type && type !== "ASC" && type !== "DESC")) {
    return res.status(201).send({
      status: false,
      message: "Kiểu sắp xếp không hợp lệ",
    });
  }

  if (!sort || (sort && typeof sort !== "string")) {
    return res.status(201).send({
      status: false,
      message: "Cột dữ liệu sắp xếp không đúng",
    });
  }
  if (typeof keyword !== "string") {
    return res.status(201).send({
      status: false,
      message: "Từ khóa không hợp lệ",
    });
  }
  next();
};

const offsetUserValidation = (req, res, next) => {
  const offset = req.query.offset;
  const limit = req.query.limit;
  if (!Number.isInteger(Number(offset))) {
    return res.status(201).send({
      status: false,
      message: "Offset phải là số nguyên",
    });
  }

  if (!Number.isInteger(Number(limit))) {
    return res.status(201).send({
      status: false,
      message: "Limit phải là số nguyên",
    });
  }

  next();
};

const searchKeywordValidation = (req, res, next) => {
  const keyword = req.query.keyword;
  if (typeof keyword !== "string") {
    return res.status(201).send({
      status: false,
      message: "Từ khóa không hợp lệ",
    });
  }
  next();
};

const searchKeywordFilterValidation = (req, res, next) => {
  const keyword = req.query.keyword;
  const status = req.query.status;
  if (typeof keyword !== "string") {
    return res.status(201).send({
      status: false,
      message: "Từ khóa không hợp lệ",
    });
  }
  if (!Number.isInteger(Number(status))) {
    return res.status(201).send({
      status: false,
      message: "Filter phải là số nguyên",
    });
  }
  next();
};

const checkMonAnAndNhomMonAnParamValidation = (req, res, next) => {
  const id_monan = req.query.id_monan;
  const id_nhommonan = req.query.id_nhommonan;
  if (!Number.isInteger(Number(id_monan))) {
    return res.status(201).send({
      status: false,
      message: "ID Món ăn phải là số nguyên",
    });
  }

  if (!Number.isInteger(Number(id_nhommonan))) {
    return res.status(201).send({
      status: false,
      message: "ID Nhóm Món Ăn phải là số nguyên",
    });
  }
  next();
};

const filterMonAnValidation = (req, res, next) => {
  const status = req.query.status;
  if (
    !Number.isInteger(Number(status)) ||
    (Number.isInteger(Number(status)) &&
      (Number(status) <= 0 || Number(status) > 6))
  ) {
    return res.status(200).send({
      status: true,
      data: [],
    });
  }

  next();
};

const filterThucPhamValidation = (req, res, next) => {
  const status = req.query.status;
  if (
    !Number.isInteger(Number(status)) ||
    (Number.isInteger(Number(status)) &&
      (Number(status) <= 0 || Number(status) > 5))
  ) {
    return res.status(200).send({
      status: true,
      data: [],
    });
  }

  next();
};

const filterThongKeDinhDuongValidation = (req, res, next) => {
  const thongKeType = req.query.thongKeType;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;

  if (
    thongKeType &&
    thongKeType !== "7days" &&
    thongKeType !== "15days" &&
    thongKeType !== "30days"
  ) {
    return res.status(200).send({
      status: false,
      message: "Vui lòng chọn thời gian tra cứu",
    });
  }

  if (
    !thongKeType &&
    (!startDate ||
      !moment(startDate).isValid() ||
      !endDate ||
      !moment(endDate).isValid())
  ) {
    return res.status(200).send({
      status: false,
      message: "Dữ liệu ngày nhập không hợp lệ",
    });
  }

  if (
    startDate &&
    moment(startDate).isValid(startDate) &&
    endDate &&
    moment(endDate).isValid()
  ) {
    const one = new Date(startDate);
    const two = new Date(endDate);
    const diffTime = two - one;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 31) {
      return res.status(200).send({
        status: false,
        message:
          "Khoảng cách giữa ngày không được vượt quá 31 (" + diffDays + ")",
      });
    } else if (diffDays < 0) {
      return res.status(200).send({
        status: false,
        message: "Ngày bắt đầu không thể lớn hơn ngày kết thúc",
      });
    }
  }
  next();
};

const customerGetThongKeTruyCap = (req, res, next) => {
  const thongKeType = req.query.thongKeType;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;

  if (
    thongKeType &&
    thongKeType !== "7days" &&
    thongKeType !== "15days" &&
    thongKeType !== "30days"
  ) {
    return res.status(200).send({
      status: false,
      message: "Vui lòng chọn thời gian tra cứu",
    });
  }

  if (
    !thongKeType &&
    (!startDate ||
      !moment(startDate).isValid() ||
      !endDate ||
      !moment(endDate).isValid())
  ) {
    return res.status(200).send({
      status: false,
      message: "Dữ liệu ngày nhập không hợp lệ",
    });
  }

  if (
    startDate &&
    moment(startDate).isValid(startDate) &&
    endDate &&
    moment(endDate).isValid()
  ) {
    const one = new Date(startDate);
    const two = new Date(endDate);
    const diffTime = two - one;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 31) {
      return res.status(200).send({
        status: false,
        message:
          "Khoảng cách giữa ngày không được vượt quá 31 (" + diffDays + ")",
      });
    } else if (diffDays < 0) {
      return res.status(200).send({
        status: false,
        message: "Ngày bắt đầu không thể lớn hơn ngày kết thúc",
      });
    }
  }
  next();
};

const filterThongKeUserValidation = (req, res, next) => {
  const thongKeType = req.query.thongKeType;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;

  if (
    thongKeType &&
    thongKeType !== "7days" &&
    thongKeType !== "15days" &&
    thongKeType !== "30days"
  ) {
    return res.status(200).send({
      status: false,
      message: "Vui lòng chọn thời gian tra cứu",
    });
  }

  if (
    !thongKeType &&
    (!startDate ||
      !moment(startDate).isValid() ||
      !endDate ||
      !moment(endDate).isValid())
  ) {
    return res.status(200).send({
      status: false,
      message: "Dữ liệu ngày nhập không hợp lệ",
    });
  }

  if (
    startDate &&
    moment(startDate).isValid(startDate) &&
    endDate &&
    moment(endDate).isValid()
  ) {
    const one = new Date(startDate);
    const two = new Date(endDate);
    const diffTime = two - one;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 31) {
      return res.status(200).send({
        status: false,
        message:
          "Khoảng cách giữa ngày không được vượt quá 31 (" + diffDays + ")",
      });
    } else if (diffDays < 0) {
      return res.status(200).send({
        status: false,
        message: "Ngày bắt đầu không thể lớn hơn ngày kết thúc",
      });
    }
  }
  next();
};

const filterThongKeTruyCapValidation = (req, res, next) => {
  const thongKeType = req.query.thongKeType;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;

  if (
    thongKeType &&
    thongKeType !== "7days" &&
    thongKeType !== "15days" &&
    thongKeType !== "30days"
  ) {
    return res.status(200).send({
      status: false,
      message: "Vui lòng chọn thời gian tra cứu",
    });
  }

  if (
    !thongKeType &&
    (!startDate ||
      !moment(startDate).isValid() ||
      !endDate ||
      !moment(endDate).isValid())
  ) {
    return res.status(200).send({
      status: false,
      message: "Dữ liệu ngày nhập không hợp lệ",
    });
  }

  if (
    startDate &&
    moment(startDate).isValid(startDate) &&
    endDate &&
    moment(endDate).isValid()
  ) {
    const one = new Date(startDate);
    const two = new Date(endDate);
    const diffTime = two - one;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 31) {
      return res.status(200).send({
        status: false,
        message:
          "Khoảng cách giữa ngày không được vượt quá 31 (" + diffDays + ")",
      });
    } else if (diffDays < 0) {
      return res.status(200).send({
        status: false,
        message: "Ngày bắt đầu không thể lớn hơn ngày kết thúc",
      });
    }
  }
  next();
};

const filterThongKeMonAnValidation = (req, res, next) => {
  const thongKeType = req.query.thongKeType;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;

  if (
    thongKeType &&
    thongKeType !== "7days" &&
    thongKeType !== "15days" &&
    thongKeType !== "30days"
  ) {
    return res.status(200).send({
      status: false,
      message: "Vui lòng chọn thời gian tra cứu",
    });
  }

  if (
    !thongKeType &&
    (!startDate ||
      !moment(startDate).isValid() ||
      !endDate ||
      !moment(endDate).isValid())
  ) {
    return res.status(200).send({
      status: false,
      message: "Dữ liệu ngày nhập không hợp lệ",
    });
  }

  if (
    startDate &&
    moment(startDate).isValid(startDate) &&
    endDate &&
    moment(endDate).isValid()
  ) {
    const one = new Date(startDate);
    const two = new Date(endDate);
    const diffTime = two - one;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 31) {
      return res.status(200).send({
        status: false,
        message:
          "Khoảng cách giữa ngày không được vượt quá 31 (" + diffDays + ")",
      });
    } else if (diffDays < 0) {
      return res.status(200).send({
        status: false,
        message: "Ngày bắt đầu không thể lớn hơn ngày kết thúc",
      });
    }
  }
  next();
};

module.exports = {
  searchMonAnValidation,
  searchThucPhamValidation,
  searchTop10ThucPhamValidation,
  duongChatValidation,
  offsetMonAnValidation,
  checkMonAnAndNhomMonAnParamValidation,
  filterMonAnValidation,
  filterThucPhamValidation,
  filterThongKeDinhDuongValidation,
  filterThongKeUserValidation,
  filterThongKeMonAnValidation,
  offsetValidation,
  searchKeywordValidation,
  offsetUserValidation,
  offsetFilterValidation,
  searchKeywordFilterValidation,
  filterThongKeTruyCapValidation,
  offsetRandomMonAnValidation,
};
