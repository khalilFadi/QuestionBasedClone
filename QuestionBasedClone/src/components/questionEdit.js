import '../css/questionEdit.css';
import settingIcon from '../images/settings_icon.png';
import axios from 'axios';
// import { useMyContext } from '../MyContext.js';

const QuestionsEditPanel = ({quesitonNumber, questionText, averageScore, onClick}) => {
    return (
        <div className='questionsEditsPanel'>
            <div className='questionInfo'>
                <div className='text'>
                    <h3><bold className='questionStyle'>Question {quesitonNumber}:</bold></h3>
                    <h3 className='questionText'>{questionText}</h3>
                </div>

                <img className='settings' src={settingIcon} onClick={onClick}/>

                <div className='percentage'>
                    <h1>{averageScore}</h1>
                    <h1>%</h1>

                </div>
            </div>
        </div>
    );
}
export const QuestionMedium = ({question}) => {
    return (
        <div className='questionMedium'>
            <div className='sideColor'  style={{ backgroundColor: question.mark === 1 ? 'green' : 'red' }}>
            </div>
            <div className='leftside'>
                <h1 className='question'><bold className="text">Question:</bold> {question.questionText}</h1>
                <h1 className='answer'>{question.answer}</h1>
            </div>
            <h1 className='time'>{(question.time).toFixed(2)}</h1>
        </div>
    );
}
export default QuestionsEditPanel;