import React, { useState, useEffect } from "react";
import Invitement from "../Invitement-card/invitement.component";
///////
///////
///////
const Invitements = ({ invitementsList = [] }) => {
  const [invitements, set_invitements] = useState();
  useEffect(() => {
    if (invitementsList?.length > 0) {
      set_invitements(invitementsList);
    }
  }, [invitementsList]);
  const handleRejectInvitement = (code) => {
    const clonedList = JSON.parse(JSON.stringify(invitements));
    const index = clonedList.findIndex(
      (item) => item?.inviteCode?.toString() === code?.toString()
    );
    console.log(index);
    if (index >= 0) {
      clonedList.splice(index, 1);
      console.log(clonedList);
      set_invitements(clonedList);
    }
  };
  useEffect(() => {
    console.log(invitements);
  }, [invitements]);
  //

  return (
    <section className="m-0 p-0 my-3 d-flex flex-column justify-content-start align-items-stretch">
      <h2 className="text-center fs-5 fw-bold">دعوتنامه ها</h2>
      <div
        style={{ overflowY: "auto" }}
        className=" scrollbar-hidden m-0 mt-1 p-3 d-flex flex-column justify-content-start align-items-stretch"
      >
        {invitements?.length > 0 &&
          invitements?.map((item, index) => (
            <Invitement
              className={
                (index === invitements?.length - 1 ? "mb-6" : "") + " mt-3"
              }
              onRejected={handleRejectInvitement}
              key={item?.callerName}
              {...item}
            />
          ))}
        {(!invitements || invitements?.length === 0) && (
          <p>دعوتنامه ای برای شما ارسال نشده است .</p>
        )}
      </div>
    </section>
  );
};

export default Invitements;
