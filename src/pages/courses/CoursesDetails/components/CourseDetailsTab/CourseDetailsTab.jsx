import React, { useEffect, useState } from "react";
import MeetingTab from "./components/MeetingTab/MeetingTab";
import ClassmateTab from "./components/ClassmateTab/ClassmateTab";
import CourseIntroductionTab from "./components/CourseIntroductionTab/CourseIntroductionTab";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./style/style.scss";

const CourseDetailsTab = ({ isFetcingCourseDetails, detailsData }) => {
  const [value, setValue] = useState(2);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            className="w-100"
            sx={{
              " .MuiTabs-flexContainer": {
                justifyContent: "space-around !important",
                "& button": {
                  width: "30%",
                },
              },
            }}
          >
            <Tab label="همکلاسی" {...a11yProps(0)} />
            <Tab label="معرفی دوره" {...a11yProps(1)} />
            <Tab
              label={
                detailsData?.sessions?.length > 0
                  ? `${detailsData?.sessions?.length} جلسه`
                  : "تعداد جلسات"
              }
              {...a11yProps(2)}
            />
          </Tabs>
        </Box>
        {value === 0 && (
          <Box sx={{ p: 3 }}>
            <ClassmateTab classRoomInfo={detailsData} />
          </Box>
        )}
        <TabPanel value={value} index={1}>
          <CourseIntroductionTab
            courseIntroductionData={detailsData?.introduction}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <MeetingTab
            isFetcingCourseDetails={isFetcingCourseDetails}
            courseData={detailsData?.sessions}
          />
        </TabPanel>
      </Box>
    </>
  );
};

export default CourseDetailsTab;
