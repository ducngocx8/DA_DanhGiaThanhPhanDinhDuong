import React, { Fragment, useEffect, useState } from "react";
import "../../css/Toast.css";
import "../../css/Custom.css";
import AccountLeft from "../../components/Layouts/Account/AccountLeft";
import { ADMIN_CODE, ApiLink, notify } from "../../Utils/Title";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CartUser({ children, active_id }) {
  let [loading, setLoading] = useState(false);
  let [username, setUsername] = useState("");
  let [role, setRole] = useState("");
  let navigate = useNavigate();
  useEffect(() => {
    async function checkPermission() {
      const response = await axios.get(`${ApiLink.domain + "/check/all"}`, {
        withCredentials: true,
      });
      if (response.data.status) {
        setLoading(true);
        setUsername(response.data.username);
        setRole(response.data.role);
        console.log("active_id", active_id);
        if (active_id !== 1 && response.data.role === ADMIN_CODE) {
          return navigate("/account/info", { replace: true });
        }
      } else {
        notify(false, response.data.message);
        if (response.data.must === "login") {
          return navigate("/account/login", { replace: true });
        } else return navigate("/", { replace: true });
      }
    }
    checkPermission();
  }, [navigate, active_id]);

  return (
    <Fragment>
      {!loading ? (
        ""
      ) : (
        <Fragment>
          <AccountLeft active_id={active_id} role={role} />
          {React.cloneElement(children, { username: username })}
        </Fragment>
      )}
    </Fragment>
  );
}
