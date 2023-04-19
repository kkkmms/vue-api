const db = require("../../plugins/mysql");
const TABLE = require("../../util/TABLE");
const STATUS = require("../../util/USERSTATUS");
const { resData, resData2, rescurrentTime, isEmpty } = require("../../util/lib");
const moment = require('moment');

const getUser = async (id) => {
  try {
    const query = `SELECT * FROM ${TABLE.USER} WHERE id=?`;
    const values = [id];
    const [rows] = await db.execute(query, values);
    return rows[0];
  } catch (e) {
    console.log(e.message);
    return resData(STATUS.E99.result, STATUS.E99.resultDesc, moment().format('LT'));
  }
};

const UserLogin = async (id, pw) => {
  try {
    const query = `SELECT * FROM ${TABLE.USER} WHERE id=? AND pw=?`;
    const values = [id, pw];
    const [rows] = await db.execute(query, values);
    return rows[0];
  } catch (e) {
    console.log(e.message);
    return null;
  }
};

const deleteUser = async (id) => {
  try {
    const query = `DELETE FROM ${TABLE.USER} WHERE id=?`;
    const values = [id];
    const [rows] = await db.execute(query, values);
    return rows.affectedRows;
  } catch (e) {
    console.log(e.message);
    return resData(STATUS.E4.result, STATUS.E4.resultDesc, moment().format("LT"));
  }
};

const userController = {
  create: async (req) => {
    const { id, pw, email } = req.body;
    if (isEmpty(id) || isEmpty(pw) || isEmpty(email)) {
      return resData(STATUS.E1.result, STATUS.E1.resultDesc, moment().format('LT'));
    }

    const user = await getUser(id);
    if (user) {
      return resData(STATUS.E2.result, STATUS.E2.resultDesc, moment().format('LT'));
    }

    try {
      const query = `INSERT INTO user (id, pw, email) VALUES (?,?,?)`;
      const values = [id, pw, email];
      const [rows] = await db.execute(query, values);
      if (rows.affectedRows == 1) {
        return resData2(
          STATUS.S1.result,
          STATUS.S1.resultDesc,
          moment().format('LT'),
        );
      }
    } catch (e) {
      console.log(e.message);
      return resData(STATUS.E99.result, STATUS.E99.resultDesc, moment().format('LT'));
    }
  },

  list: async (req) => {
    const { id, pw } = req.body;
    if (isEmpty(id) || isEmpty(pw)) {
      return resData(STATUS.E4.result, STATUS.E4.resultDesc, moment().format('LT'));
    }

    const user = await UserLogin(id, pw);
    if (!user) {
      return resData(STATUS.E3.result, STATUS.E3.resultDesc, moment().format('LT'));
    }

    const { ud } = user;
    if (isEmpty(ud)) {
      return resData2(STATUS.S2.result, `${id}님 환영합니다.`, STATUS.S3.resultDesc, moment().format('LT'));
    }

    return resData(
      STATUS.S2.result,
      `${id}님 환영합니다.`,
      moment().format('LT'),
      {"작성하신 게시글": user.ud}
    );
  },
  update: async (req) => {
    const { id, pw, ud } = req.body;
    if (isEmpty(id) || isEmpty(pw)) {
      return resData(
        STATUS.E4.result,
        STATUS.E4.resultDesc,
        moment().format("LT")
      );
    }
    else if (isEmpty(ud)) {
      return resData(
        STATUS.E5.result,
        STATUS.E5.resultDesc,
        moment().format("LT")
      )
    }

    const user = await getUser(id);
    if (!user || user.pw !== pw) {
      return resData(
        STATUS.E3.result,
        STATUS.E3.resultDesc,
        moment().format("LT")
      );
    }

    try {
      const query = `UPDATE ${TABLE.USER} SET ud=? WHERE id=?`;
      const values = [ud, id];
      const [rows] = await db.execute(query, values);
      if (rows.affectedRows == 1) {
        return resData(
          STATUS.S4.result,
          STATUS.S4.resultDesc,
          moment().format('LT'),
          {id, "게시글": ud},
        );
      }
    } catch (e) {
      console.log(e.message);
      return resData(STATUS.E4.result, STATUS.E4.resultDesc, moment().format('LT'));
    }
  },

  delete: async (req) => {
    const { id, pw } = req.body;
    if (isEmpty(id) || isEmpty(pw)) {
      return resData(STATUS.E1.result, STATUS.E1.resultDesc, moment().format("LT"));
    }

    const user = await getUser(id);
    if (!user || user.pw !== pw) {
      return resData(STATUS.E3.result, STATUS.E3.resultDesc, moment().format("LT"));
    }

    const deletedRows = await deleteUser(id);
    if (deletedRows === 0) {
      return resData(STATUS.E4.result, STATUS.E4.resultDesc, moment().format("LT"));
    }

    return resData(
      STATUS.S6.result,
      STATUS.S6.resultDesc,
      moment().format("LT")
    );
  }
};

module.exports = userController;