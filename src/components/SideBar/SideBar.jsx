import "./SideBar.css";
import avatar from "../../images/avatar.svg";

export default function SideBar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__user-container">
        <p className="sidebar__username">NAME</p>{" "}
        <img src={avatar} alt="Terrance Tegegne" className="sidebar__avatar" />
      </div>
    </aside>
  );
}
