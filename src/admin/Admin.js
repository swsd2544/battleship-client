import classes from "./Admin.module.css";
import Card from "../components/UI/Card";
import useInput from "../hooks/useInput";
import React, { useEffect, useState } from "react";
import AdminControl from "./AdminControl";

const Admin = () => {
  const notEmpty = (item) => item.trim() !== "";
  const [adminData, setAdminData] = useState([]);
  const [login, setLogin] = useState(false);

  const {
    value: adminValue,
    onChangeHandler: adminChangeHandler,
    onBlurHandler: adminBlurHandler,
  } = useInput(notEmpty);

  const {
    value: passValue,
    onChangeHandler: passChangeHandler,
    onBlurHandler: passBlurHandler,
  } = useInput(notEmpty);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await fetch(
          "https://reactletsgo-65a5c-default-rtdb.asia-southeast1.firebasedatabase.app/admin.json"
        );
        if (!response.ok) {
          throw new Error("error detected");
        }

        const adminData = [];
        const data = await response.json();
        // console.log(data);
        adminData.push({
          name: data.name,
          pass: data.password,
        });
        setAdminData(adminData);
        // console.log(adminData[0].name);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchAdminData();
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();
    if (adminValue !== adminData[0].name || passValue !== adminData[0].pass) {
      // console.log("incorrect");
      return;
    }
    // console.log("loging");
    setLogin(true);
  };

  const loginMenu = (
    <div className={classes.container}>
      <Card className={classes.login}>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label>Enter Admin: </label>
            <input
              id="admin"
              type="name"
              value={adminValue}
              onChange={adminChangeHandler}
              onBlur={adminBlurHandler}
            />
            <label>Enter Password: </label>
            <input
              id="password"
              type="password"
              value={passValue}
              onChange={passChangeHandler}
              onBlur={passBlurHandler}
            />
          </div>
          <div className={classes.actions}>
            <button type="submit" className={classes.btn}>
              Login
            </button>
          </div>
        </form>
      </Card>
    </div>
  );

  return (
    <div>
      {login && <AdminControl />}
      {!login && loginMenu}
    </div>
  );
};

export default Admin;
