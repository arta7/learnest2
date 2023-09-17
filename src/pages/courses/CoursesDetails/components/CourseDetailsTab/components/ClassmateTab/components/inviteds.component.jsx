import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { apiCaller } from "../../../../../../../../core/custom-hooks/useApi";
import {
  buyCourse_apiCalls,
  course_apiCalls,
} from "../../../../../../../../core/services/agent";
import { toast } from "react-toastify";
import { useLoadingContext } from "../../../../../../../../core/contexts/loading/loading";
import { useLocation, useNavigate, useParams } from "react-router";
import InviteWithPhoneNumber from "../../../../../../../../components/invite-dialog/inviteWithPhoneNumber.component";
import InviteToClassRoom from "../../../../../../../../components/invite-dialog/inviteToClassRoom.component";
import { useMemo } from "react";

//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
const InvitedCard = ({ className = "", inviteCode, initedPhone, onDelete }) => {
  const handleDelete = () => {
    onDelete(inviteCode);
  };
  return (
    <div
      className={
        className +
        " p-3 rounded mt-2 shadow m-0 d-flex flex-column justify-content-start justify-content-stretch"
      }
    >
      <div className="m-0 p-0 d-flex flex-row justify-content-between justify-content-center">
        <span className="">{initedPhone}</span>
        <IconButton onClick={handleDelete} className="m-0 p-0">
          <DeleteIcon color="error" className="m-0 p-0" />
        </IconButton>
      </div>
      <div className="mt-2">
        <span className="">{`کد دعوت : ${inviteCode}`}</span>
      </div>
    </div>
  );
};
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
const Inviteds = ({ classRoomInfo }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [invitements, set_invitements] = useState();
  const [isLoading, set_isLoading] = useState(false);
  const { handleOpen, handleClose } = useLoadingContext();
  //////
  const getAllInvites = () => {
    apiCaller({
      api: course_apiCalls.apiCall_getInvitedsByUser,
      apiArguments: id,
      onSuccess: (resp) => {
        set_invitements(resp?.data?.data);
      },
    });
  };
  useEffect(() => {
    if (invitements?.length === 0 || !invitements) {
      getAllInvites();
    }
  }, []);
  //////////////////
  //////////////////
  //////////////////
  //////////////////
  //////////////////
  const deleteFromState = (code) => {
    const clonedList = JSON.parse(JSON.stringify(invitements));
    const index = clonedList.findIndex(
      (item) => item?.inviteCode?.toString() === code?.toString()
    );
    console.log(index);
    if (index >= 0) {
      clonedList.splice(index, 1);
      console.log(clonedList);
      try {
        set_invitements(clonedList);
      } catch (ex) {
        console.log(ex?.message);
      }
    }
  };
  //////////////////
  const handleDeleteInvitement = (code) => {
    apiCaller({
      api: buyCourse_apiCalls.apiCall_deleteInvitement,
      apiArguments: {
        inviteCode: code,
        classRoomId: classRoomInfo?.introduction?.classRoomId,
      },
      onStart: () => {
        handleOpen();
        set_isLoading(true);
      },
      onEnd: () => {
        handleClose();
        set_isLoading(false);
      },
      onSuccess: (resp) => {
        ////
        if (resp?.status === 200 && parseInt(resp?.data?.status) === 1) {
          deleteFromState(code);
          //navigate(location.pathname);
        } else {
          if (parseInt(resp?.data?.status) === 0) {
            toast.error(resp?.data?.message);
          }
        }
      },
    });
  };
  ////////////////
  return (
    <div className="m-0 p-0 my-3 d-flex flex-column justify-content-start align-items-stretch">
      <h2 className="fs-6 mt-3">دعوتنامه های شما :</h2>
      {invitements?.length > 0 &&
        invitements?.map((item, index) => (
          <InvitedCard
            className={
              (index === invitements?.length - 1 ? "mb-6" : "") + " mt-3"
            }
            onDelete={handleDeleteInvitement}
            key={item?.inviteCode}
            {...item}
          />
        ))}

      {(!invitements || invitements?.length === 0) && !isLoading && (
        <p className="mb-6">دعوتنامه ای برای شما ارسال نشده است .</p>
      )}

      {isLoading && <p className="mb-6">درحال بارگذاری ...</p>}

      <InviteToClassRoom getAllInvites={getAllInvites} />
    </div>
  );
};

export default Inviteds;
