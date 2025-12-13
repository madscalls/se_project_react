import "./SideBar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function SideBar({ onEditProfile, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  const userName = currentUser?.name || "";
  const userAvatar = currentUser?.avatar || "";
  const firstLetter = userName ? userName[0].toUpperCase() : "";

  return (
    <aside className="sidebar">
      <div className="sidebar__user-container">
        {userAvatar ? (
          <img src={userAvatar} alt={userName} className="sidebar__avatar" />
        ) : (
          <div className="sidebar__avatar-placeholder">{firstLetter}</div>
        )}

        <p className="sidebar__username">{userName}</p>

        <button
          type="button"
          className="sidebar__edit-btn"
          onClick={onEditProfile}
        >
          Edit profile
        </button>
        <button
          type="button"
          className="sidebar__signout-btn"
          onClick={onSignOut}
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}
