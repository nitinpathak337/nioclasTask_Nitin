import { MathJax } from "better-react-mathjax";
import { Bars } from "react-loader-spinner";
import { GrPrevious, GrNext } from "react-icons/gr";
import { useEffect, useState } from "react";

import "./App.css";

const totalQuestionsArr = [1, 2, 3];

function App() {
  const [questionNo, setQuestionNo] = useState(1);
  const [questionData, setQuestionData] = useState([]);

  useEffect(() => {
    getData();
  }, [questionNo]);

  const getData = async () => {
    let questionID = null;
    setQuestionData([]);
    switch (questionNo) {
      case 1:
        questionID = "AreaUnderTheCurve_901";
        break;
      case 2:
        questionID = "BinomialTheorem_901";
        break;
      case 3:
        questionID = "DifferentialCalculus2_901";
        break;
      default:
        break;
    }
    const response = await fetch(
      `https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID=${questionID}`
    );
    const data = await response.json();
    setQuestionData(data[0]);
  };

  return (
    <div className="App">
      <h1 className="heading">Nioclass Quiz</h1>

      <p className="question-para">{`Question ${questionNo}/3`}</p>
      {questionData.length === 0 ? (
        <div className="loader-container">
          <Bars color="chocolate" />
        </div>
      ) : (
        <MathJax>
          <p className="chapter">{`Chapter : ${questionData.ChapterID}`}</p>
          <p className=" question">{`Q. ${questionData.Question}`}</p>
        </MathJax>
      )}

      <div className="btn-container">
        {questionNo > 1 ? (
          <button type="button" onClick={() => setQuestionNo(questionNo - 1)}>
            <GrPrevious />
          </button>
        ) : (
          <button type="button" disabled className="disabled">
            <GrPrevious />
          </button>
        )}
        <ul className="list-container">
          {totalQuestionsArr.map((eachItem) => {
            const activeBtn = eachItem === questionNo ? "active-btn" : "";

            return (
              <li key={eachItem}>
                <button
                  type="button"
                  onClick={() => setQuestionNo(eachItem)}
                  className={`${activeBtn}`}
                >
                  {eachItem}
                </button>
              </li>
            );
          })}
        </ul>
        {questionNo < 3 ? (
          <button type="button" onClick={() => setQuestionNo(questionNo + 1)}>
            <GrNext />
          </button>
        ) : (
          <button type="button" disabled className="disabled">
            <GrNext />
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
