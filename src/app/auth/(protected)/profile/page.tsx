import { auth } from "@/auth";
import React from "react";

const ProfilePage = async () => {
  const session = await auth();
  return (
    <div>
      <h2>Profile Page</h2>
      <p>{JSON.stringify(session)}</p>
    </div>
  );
};

export default ProfilePage;
