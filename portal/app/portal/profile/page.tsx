"use client";

import {
  IconPencilMinus,
  IconBuildingStore,
  IconUserCircle,
} from "@tabler/icons-react";
import "@/css/profile.css";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next/client";
import Image from "next/image";
import { jwtDecode } from "jwt-decode";
import { splitFullName } from "@/utils/splitFullName";
import usePersonalDetailsModalStore from "@/context/personalDetailsModal";
import PersonalDetails from "@/components/Modals/profile/PersonalDetails";
import useSecurityModalStore from "@/context/securityModal";
import Security from "@/components/Modals/profile/Security";
import Avatar from "@/components/Modals/profile/Avatar";
import useAvatarModalStore from "@/context/avatarModal";


type TokenTypes = {
  user_id: string;
  account_type: string;
  wallet_id: string;
  full_name: string;
  avatar: string;
  email: string;
};

function Profile() {
  const [user, setUser] = useState<TokenTypes | null>(null);
  const { setPersonalDetailsModalActive, detailsUpdated } =
    usePersonalDetailsModalStore();
  const { setSecurityModalActive } = useSecurityModalStore();
  const {setAvatarModalActive} = useAvatarModalStore()

  useEffect(() => {
    // Retrieve and decode the token after the component mounts
    const token = getCookie("token") as string | undefined;
    if (token) {
      try {
        const decodedToken = jwtDecode<TokenTypes>(token);
        setUser(decodedToken);
      } catch (err) {
        console.error("Error decoding token", err);
      }
    }
  }, [detailsUpdated]);

  if (!user) {
    return <></>;
  }

  const { userFirstName, userLastName } = splitFullName(user.full_name);

  return (
    <>
      <div className="profile-page custom-scrollbar flex flex-col gap-4">
        <div className="content-container profile-overview flex gap-2 items-center">
          <span className="profile-icon flex items-center justify-center">
            <Image
              src={require(`@/public/avatars/${user.avatar}.png`)}
              alt={user.full_name}
            />
          </span>

          <span className="flex flex-col gap-2">
            <span className="font-normal">{user.full_name}</span>
            <span className="flex gap-2 items-center user-account-type">
              {user.account_type === "Merchant" ? (
                <IconBuildingStore />
              ) : (
                <IconUserCircle />
              )}
              {user.account_type}
            </span>
          </span>

          <span onClick={setAvatarModalActive} className="edit-btn ml-auto cursor-pointer flex gap-1 items-center">
            Edit
            <IconPencilMinus />
          </span>
        </div>

        <div className="content-container flex flex-col personal-details">
          <h3 className="flex items-center">
            Personal Information
            <span
              onClick={setPersonalDetailsModalActive}
              className="edit-btn ml-auto cursor-pointer flex gap-1 items-center"
            >
              Edit
              <IconPencilMinus />
            </span>
          </h3>

          <div className="info flex flex-col gap-4">
            <div className="row flex gap-4">
              <div className="input-group flex flex-col gap-1">
                <label className="opacity-60 font-normal" htmlFor="">
                  First Name
                </label>
                <input readOnly type="text" name="name" value={userFirstName} />
              </div>

              <div className="input-group flex flex-col gap-1">
                <label className="opacity-60 font-normal" htmlFor="">
                  Last Name
                </label>
                <input readOnly type="text" name="name" value={userLastName} />
              </div>
            </div>

            <div className="row flex gap-4">
              <div className="input-group flex flex-col gap-1">
                <label className="opacity-60 font-normal" htmlFor="">
                  Email
                </label>
                <input readOnly type="email" name="email" value={user.email} />
              </div>

              <div className="input-group flex flex-col gap-1">
                <label className="opacity-60 font-normal" htmlFor="">
                  Phone
                </label>
                <input
                  readOnly
                  type="text"
                  name="phone"
                  value="+265 888 88 88 88"
                />
              </div>
            </div>

            <div className="row flex gap-4">
              <div className="input-group flex flex-col gap-1">
                <label className="opacity-60 font-normal" htmlFor="">
                  Account Type
                </label>
                <input
                  readOnly
                  type="email"
                  name="email"
                  value={user.account_type}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="content-container flex flex-col personal-details">
          <h3 className="flex items-center">
            Security
            <span
              onClick={setSecurityModalActive}
              className="edit-btn ml-auto cursor-pointer flex gap-1 items-center"
            >
              Edit
              <IconPencilMinus />
            </span>
          </h3>

          <div className="row flex gap-4">
            <div className="input-group flex flex-col gap-1">
              <label className="opacity-60 font-normal" htmlFor="">
                Password
              </label>
              <input
                className="password-input"
                readOnly
                type="password"
                name="password"
                value="1234567"
              />
            </div>

            <div className="input-group flex flex-col gap-1 opacity-80 cursor-not-allowed">
              <label
                className="opacity-60 cursor-not-allowed font-normal"
                htmlFor=""
              >
                2-Factor Authentication
              </label>
              <span className="checkbox">{/* <IconCheck /> */}</span>
            </div>
          </div>
        </div>
      </div>

      <PersonalDetails />
      <Security />
      <Avatar />
    </>
  );
}

export default Profile;
