import React from "react";
import ClassmateTabSearch from "./components/ClassmateTabSearch/ClassmateTabSearch";
import ClassmateAvatars from "./components/ClassmateAvatars/ClassmateAvatars";
import ClassmateCards from "./components/ClassmateCards/ClassmateCards";
import "./style/style.css";

import defImg from "../../../../../../../assets/img/babak-images/classmate-avatar.png";
import ClassMate from "../../../../../../../components/classMate/classMate.component";
import Invitement from "../../../../../../../components/Invitement-card/invitement.component";
import InviteWithPhoneNumber from "../../../../../../../components/invite-dialog/inviteWithPhoneNumber.component";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { apiCaller } from "../../../../../../../core/custom-hooks/useApi";
import { buyCourse_apiCalls } from "../../../../../../../core/services/agent";
import { useLoadingContext } from "../../../../../../../core/contexts/loading/loading";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Inviteds from "./components/inviteds.component";
import { useMemo } from "react";

const fakeClassMates = [
  { phone: "09360314540", name: "امیرمحمد حیدری", avatarUrl: defImg },
  { phone: "09360314541", name: "امیرمحمد حیدری", avatarUrl: defImg },
  { phone: "09360314542", name: "امیرمحمد حیدری", avatarUrl: defImg },
  { phone: "09360314543", name: "ssssss", avatarUrl: defImg },
  { phone: "09360314544", name: "امیرمحمد حیدری", avatarUrl: defImg },
  { phone: "09360314545", name: "امیرمحمد حیدری", avatarUrl: defImg },
  {
    phone: "09360314546",
    name: "امیرمحمد حیدری",
    avatarUrl: "https://avatars.dicebear.com/api/avataaars/02.svg",
  },
];
const ClassmateTab = ({ classRoomInfo }) => {
  ///////////////////
  const { handleOpen, handleClose } = useLoadingContext();
  const getClassRoomInfo = useMemo(() => classRoomInfo, []);
  ///////////////////
  return (
    <div className=" m-0 p-0 pb-6 d-flex flex-column justify-content-center align-items-stretch">
      {/* <ClassmateTabSearch /> */}
      {classRoomInfo?.length > 0 && (
        <>
          <ClassmateAvatars
            avatars={classRoomInfo?.map((item) => item.avatarUrl)}
          />
          <ClassmateCards classRoomInfo={classRoomInfo} />
        </>
      )}
      {/* Not IsBought */}
      {classRoomInfo?.introduction?.isBought === false && (
        // classRoomInfo?.courseInvites?.length === 0 &&
        <p className="text-justify">
          برای داشتن‌ همکلاسی که در جلسات درسی دوره ها در کنار شما حضور داشته
          باشد و از طریق بخش چت اپلیکیشن نیز بتوانید با هم به گفتگو و بررسی
          مشکلات اموزشی و تبادلات علمی بپردازید ، در هنگام خرید دوره ، حضور
          گروهی را انتخاب کنید و شماره ی تلفن همراه دوست خود را وارد نمایید تا
          دعوتنامه ای برای همکلاسی شدن با شما برای فرد مورد نظراتتان از طریق
          اپلیکیشن لرنست فرستاده شود.
        </p>
      )}
      {/* {classRoomInfo?.introduction?.isBought === false &&
        classRoomInfo?.courseInvites?.length > 0 &&
        classRoomInfo?.courseInvites?.map((item, index) => (
          <Invitement
            key={item?.name}
            className={
              (index === classRoomInfo?.courseInvites?.length - 1
                ? "mb-6"
                : "") + " my-2"
            }
            {...item}
          />
        ))} */}
      {/* IsBought */}
      {/* {classRoomInfo?.introduction?.isBought === true && (
        <InviteWithPhoneNumber
          inviteToClassRoom={true}
          inviteToCourse={false}
        />
      )} */}
      {classRoomInfo?.introduction?.isBought === true &&
        classRoomInfo?.classmates?.length === 0 && (
          <p>شما همکلاسی ای در این کلاس ندارید .</p>
        )}
      {classRoomInfo?.introduction?.isBought === true &&
        classRoomInfo?.classmates?.length > 0 &&
        classRoomInfo?.classmates?.map((item, index) => (
          <ClassMate
            key={item?.name}
            className={
              (index === classRoomInfo?.classmates?.length - 1 ? "mb-6" : "") +
              " my-2"
            }
            {...item}
          />
        ))}
      {/*==================*/}
      {/* <h2 className="fs-6 mt-3">دعوتنامه های شما :</h2> */}
      {getClassRoomInfo?.introduction?.isBought === true ? (
        <Inviteds classRoomInfo={getClassRoomInfo} />
      ) : (
        <></>
      )}
      {/* {classRoomInfo?.introduction?.isBought === true && (
        <Inviteds
          classRoomInfo={classRoomInfo}
          invitedsList={classRoomInfo?.classRoomInvites}
        />
      )} */}
      {/* {classRoomInfo?.introduction?.isBought === true &&
        invitements?.length === 0 && (
          <p>شما کسی را به این دوره دعوت نکرده اید .</p>
        )} */}
      {/* {invitements?.length > 0 &&
        invitements?.map((item, index) => (
          <div
            key={item.code}
            className={
              (index === invitements?.length - 1 ? "mb-6" : "") +
              " p-3 rounded mt-2 shadow m-0 d-flex flex-column justify-content-start justify-content-stretch"
            }
          >
            <div className="m-0 p-0 d-flex flex-row justify-content-between justify-content-center">
              <span className="">{item?.phone}</span>
              <IconButton
                onClick={() => {
                  handleDeleteInvitement(item.code);
                }}
                className="m-0 p-0"
              >
                <DeleteIcon color="error" className="m-0 p-0" />
              </IconButton>
            </div>
            <div className="mt-2">
              <span className="">{`کد دعوت : ${item?.code}`}</span>
            </div>
          </div>
        ))} */}
    </div>
  );
};

export default ClassmateTab;
