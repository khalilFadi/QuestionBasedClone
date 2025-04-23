import '../css/menu.css';
import closeButton from '../images/XWhitebackgroundPurpleCenter.png';

export const sideMenu = ({currentPage}) => {
    return (
        <div>
            <div className="menu">
                <div className='sideBar'>
                        <div className='logoSection'>
                            <h1>QuestionRes</h1>
                            <img src={closeButton} style={{width:'20%'}}/>
                        </div>
                        <div className='selectingServer'>

                        </div>
                        <div className='dashboardMenu'>

                        </div>
                        <div className='userInfo'>
                            
                        </div>
                </div>
            </div>
        </div>
    )
}
