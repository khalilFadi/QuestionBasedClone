import '../css/questionEdit.css';
import settingIcon from '../images/settings_icon.png';
const QuestionsEditPanel = ({quesitonNumber, questionText, averageScore}) => {
    return (
        <div className='questionsEditsPanel'>
            <div className='questionInfo'>
                <div className='text'>
                    <h3><bold className='questionStyle'>Question {quesitonNumber}:</bold></h3>
                    <h3 className='questionText'>{questionText}</h3>
                </div>

                <img className='settings' src={settingIcon}/>

                <div className='percentage'>
                    <h1>{averageScore}</h1>
                    <h1>%</h1>

                </div>
                
            </div>
        </div>
    );
}
export default QuestionsEditPanel;