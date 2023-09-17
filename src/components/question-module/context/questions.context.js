import React, { useState, useEffect } from "react";
import {
  useClassRoomSetStateContext,
  useClassRoomStateContext,
} from "../../../core/contexts/classRoom/classRoom";
////////////
const QuestionsContext = React.createContext();
////////////
const QuestionsContextProvider = ({ children, data }) => {
  ////////////////
  const { classRoomInfo, sessionLearningData } = useClassRoomStateContext();
  const { set_sessionLearningData, changeTypeId } =
    useClassRoomSetStateContext();
  ///////////////
  const [questions, set_questions] = useState([]);
  const [curentQuestion, set_curentQuestion] = useState();

  const [baseAnsweringType, set_baseAnsweringType] = useState();
  const [typeId, set_typeId] = useState();
  const [pageDataOnFinishQuestions, set_pageDataOnFinishQuestions] = useState();
  const [finish, set_finish] = useState(false);
  const [lessonId, set_lessonId] = useState();
  const [learningId, set_learningId] = useState();
  const [responseTime, set_responseTime] = useState();
  const [examFinishState, set_examFinishState] = useState(false);
  ////////////
  const resetModuleData = () => {};
  ////////////

  return <>{children}</>;
};

export default QuestionsContextProvider;
