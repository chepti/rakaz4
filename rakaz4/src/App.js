import React, { useState } from 'react';
import './App.css';

const goals = [
  { id: 1, text: "הטמעת סביבת ענן וכלי סביבת ענן (גוגל קלאסרום/טימס)", emoji: "☁️" },
  { id: 2, text: "קידום חשיבה מחשובית ורובוטיקה בבית הספר", emoji: "🤖" },
  { id: 3, text: "קידום שימוש בתוכנת ניהול פדגוגי (נוכחות, ציונים שוטפים וכו')", emoji: "📊" },
  { id: 4, text: "הטמעה ויישום של נושא אבטחת מידע", emoji: "🔒" },
  { id: 5, text: "הטמעה והגברת שימוש נכון בספקי התוכן שבי\"ס רכש", emoji: "📚" },
  { id: 6, text: "השתתפות בי\"ס (כיתה אחת לפחות) במיזם מחוזי אחד לפחות מתוך רשימת המיזמים המחוזיים", emoji: "🏆" }
];

const objectives = {
  1: [
    "פתיחת כיתה וירטואלית (קלאסרום/טימס) לכל כיתת אם",
    "עבודה בכיתה הוירטואלית באופן שוטף ב-2 כיתות לפחות",
    "הדרכת צוות מורים (מליאה או לפי קבוצות) לשימוש נכון בכיתה וירטואלית",
    "השתתפות במיזם בניית אתרים להטמעת כלי גוגל וסביבת ענן גוגל קלאסרום",
    "השתתפות במיזם של הטמעת סביבת ענן (מיזמים שיפורסמו בהמשך)"
  ],
  2: [
    "כיתה אחת לפחות לומדת חשיבה מחשובית ורובוטיקה במהלך שנת הלימודים (סמסטריאלי/שנתי)",
    "השתתפות בתחרות פיתוח משחקים",
    "השתתפות לפחות מורה אחד מצוות בי\"ס בהשתלמות של חשיבה מחשובית ורובוטיקה"
  ],
  3: [
    "כלל המורים יודעים כיצד לדווח נוכחות באופן בסיסי וציונים שוטפים",
    "שימוש בתכנת ניהול פדגוגי בישיבות פדגוגיות",
    "שימוש בתכנת הניהול הפדגוגי לאסיפות הורים",
    "ניהול תיק אישי של התלמידים בתוכנת הניהול הפדגוגי (אפשר בהתחלה מספר מורים או כלל הצוות)"
  ],
  4: [
    "בניית מסמך נהלים בית ספרי ע\"י הרכז בנוגע לאבטחת מידע",
    "בניית מסמך נהלים בית ספרי ע\"י רכז וצוות מורים בנוגע לאבטחת מידע",
    "בניית מסמך נהלים בית ספרי ע\"י רכז וקבוצת תלמידים מובילה בנוגע לאבטחת מידע",
    "בניית מידעון חצי שנתי להורים על נושא אבטחת מידע",
    "קיום ערב הורים בנושא",
    "קיום מליאה בית ספרית לצוות המורים על אבטחת מידע נהלים וחידוד מידע",
    "אירוע בית ספרי בשבוע גלישה בטוחה - אבטחת מידע (קפה דילמה ועוד שלל פעילויות)",
    "לעבור קורס 'מקדם הגנה' יחד עם צוות המורים"
  ],
  5: [
    "יידוע הצוות בצורה נוחה וויזואלית על ספקי התוכן שבי\"ס רכש",
    "בדיקה שהצוות והתלמידים משתמשים בספקי התוכן שנרכשו ע\"י הפקת דו\"חות מפורט למוסדות",
    "שימוש בספקי תוכן בשגרה",
    "בדיקה שכלל המורים בצוות יודעים להשתמש בספקי התוכן כראוי - הקצאת משימות, ניתוח מידע וביצוע ועוד"
  ],
  6: [
    "בי\"ס משתתף - ברמת כיתה או שכבה אחת לפחות",
    "בי\"ס מגיש תוצרים ומסיים את התהליך ומשתתף בתחרות המחוזית"
  ]
};

const App = () => {
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [nextStep, setNextStep] = useState(false);
  const [goalDetails, setGoalDetails] = useState([]);

  const handleGoalSelection = (id) => {
    if (selectedGoals.includes(id)) {
      setSelectedGoals(selectedGoals.filter(goalId => goalId !== id));
    } else {
      if (selectedGoals.length < 3) {
        setSelectedGoals([...selectedGoals, id]);
      }
    }
  };

  const handleNextStep = () => {
    setNextStep(true);
    setGoalDetails(selectedGoals.map(goalId => ({
      goalId,
      objectives: [],
      resources: '',
      partners: '',
      performanceMetrics: '',
      startDate: '',
      evaluationDate: ''
    })));
  };

  const handleDetailChange = (index, field, value) => {
    const updatedDetails = [...goalDetails];
    updatedDetails[index][field] = value;
    setGoalDetails(updatedDetails);
  };

  const handleObjectiveSelection = (goalIndex, objective) => {
    const updatedDetails = [...goalDetails];
    const objectiveList = updatedDetails[goalIndex].objectives;
    if (objectiveList.includes(objective)) {
      updatedDetails[goalIndex].objectives = objectiveList.filter(obj => obj !== objective);
    } else {
      updatedDetails[goalIndex].objectives.push(objective);
    }
    setGoalDetails(updatedDetails);
  };

  const downloadHTML = () => {
    const element = document.createElement("a");
    const file = new Blob([document.getElementById('table').outerHTML], { type: 'text/html' });
    element.href = URL.createObjectURL(file);
    element.download = "goals.html";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="App">
      {!nextStep ? (
        <div>
          <h1>בחר 3 מטרות לשנת הלימודים הקרובה</h1>
          <div className="goals-list">
            {goals.map(goal => (
              <button
                key={goal.id}
                className={`goal-button ${selectedGoals.includes(goal.id) ? 'selected' : ''}`}
                onClick={() => handleGoalSelection(goal.id)}
                disabled={selectedGoals.length >= 3 && !selectedGoals.includes(goal.id)}
              >
                {goal.emoji} {goal.text}
                {selectedGoals.includes(goal.id) && <span className="remove">✖️</span>}
              </button>
            ))}
          </div>
          {selectedGoals.length === 3 && (
            <button className="next-button" onClick={handleNextStep}>המשך לשלב הבא</button>
          )}
        </div>
      ) : (
        <div>
          <h1>מלא פרטים עבור המטרות שבחרת</h1>
          <table id="table">
            <thead>
              <tr>
                <th>מטרה</th>
                <th>יעדים</th>
                <th>משאבים</th>
                <th>שותפים</th>
                <th>מדדי ביצוע</th>
                <th>תאריך התחלה</th>
                <th>תאריך מדידה</th>
              </tr>
            </thead>
            <tbody>
              {goalDetails.map((detail, index) => (
                <tr key={index}>
                  <td>{goals.find(goal => goal.id === detail.goalId).text}</td>
                  <td>
                    {objectives[detail.goalId].map(obj => (
                      <div key={obj}>
                        <input
                          type="checkbox"
                          checked={detail.objectives.includes(obj)}
                          onChange={() => handleObjectiveSelection(index, obj)}
                        />
                        {obj}
                      </div>
                    ))}
                  </td>
                  <td>
                    <input
                      type="text"
                      value={detail.resources}
                      onChange={(e) => handleDetailChange(index, 'resources', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={detail.partners}
                      onChange={(e) => handleDetailChange(index, 'partners', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={detail.performanceMetrics}
                      onChange={(e) => handleDetailChange(index, 'performanceMetrics', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={detail.startDate}
                      onChange={(e) => handleDetailChange(index, 'startDate', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={detail.evaluationDate}
                      onChange={(e) => handleDetailChange(index, 'evaluationDate', e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="save-button" onClick={downloadHTML}>שמור והורד כקובץ</button>
        </div>
      )}
    </div>
  );
};

export default App;
