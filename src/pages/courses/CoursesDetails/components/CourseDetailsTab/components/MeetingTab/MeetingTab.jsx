import React from "react";
import MeetingTabItem from "./components/MeetingTabItem/MeetingTabItem";
import MeetingTabItemSkeleton from "./components/MeetingTabItem/MeetingTabItemSkeleton.component";
import "./style/style.css";

const MeetingTab = ({ courseData, isFetcingCourseDetails }) => {
  return (
    <div className="w-100 d-flex flex-column justify-content-center align-items-center">
      {false &&
        [0, 1, 2, 3, 5, 6].map((item) => <MeetingTabItemSkeleton key={item} />)}
      {/* loaded data */}
      {!isFetcingCourseDetails &&
        courseData &&
        courseData?.length > 0 &&
        courseData.map((item, index) => (
          <MeetingTabItem
            key={index}
            itemIndex={index}
            data={courseData && item}
          />
        ))}
      <div style={{ height: "215px" }}></div>
    </div>
  );
};

export default MeetingTab;
