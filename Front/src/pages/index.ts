import Home from "./Home";
import SurveyResult from "./SurveyResult";
import SurveyTest from "./SurveyTest";
import MBTIResult from "./MBTIResult";
import MBTIResultAll from "./MBTIResultAll";
import MBTITest from "./MBTITest";
import NotFound from "./NotFound";
import MBTIResultShared from "./MBTIResultShared";
import SurveyResultView from "./SurveyResultView";

export {
  Home,
  SurveyResult,
  SurveyTest,
  MBTIResult,
  MBTIResultAll,
  MBTITest,
  NotFound,
  MBTIResultShared,
  SurveyResultView,
};

window.Kakao.init(import.meta.env.VITE_KAKAO_SHARE_KEY);
window.Kakao.isInitialized(); // init되면 true, 아니면 false를 반환한다
