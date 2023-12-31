// ! Do Not Edit This File

import { Icons } from "../icons";

export const UnfavoriteButton = ({ onClick, disabled }) => (
  <img
    src={Icons.Heart}
    alt=""
    className="unfavorite-button"
    style={{
      width: 40,
      border: 0,
      cursor: disabled ? "no-drop" : "pointer",
    }}
    onClick={() => {
      if (!disabled) {
        onClick();
      }
    }}
  />
);
