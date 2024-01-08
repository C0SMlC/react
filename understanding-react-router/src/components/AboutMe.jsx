import { Outlet } from "react-router-dom";
import styles from "./AboutMe.module.css";

function AboutMe() {
  return (
    <>
      <div className={styles.heading}>About Me</div>
      <Outlet />
    </>
  );
}

export default AboutMe;
