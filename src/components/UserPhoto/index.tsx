import React from "react";

import user from "../../Images/user.png";

export default function Photo() {
  return (
    <div aria-label="User photo">
      <img className="userPhoto" src={user} alt="user" />
    </div>
  );
}
