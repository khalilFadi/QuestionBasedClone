import '../css/users.css';
import defult_profile_pic from '../images/Default_profile_pic.png';

const MediumUserSize = ({username, timetaken, percentage, studentAvatar}) => {

    return (
        <div className="usermedium">
            <div className="user__avatar">
                <img src={studentAvatar} />
            </div>
            <div className="user__info">
                <div className="text">
                    <h1 className='user_name'>{username}</h1>
                    <h2 className='time_taken'>{timetaken}</h2>
                </div>

            </div>
            <div className='percentage'>
                <h3 className='percentage_value'>{percentage}</h3>
                <p className='percentage_sign'>%</p>

            </div>
        </div>
    );
}
export const SmallUserSize = ({studentName, studentAvatar}) => {
    return (
        <div className="usersmall">
            <div className='image'>
                <img src={studentAvatar}/>
            </div>
            <div className='name'>
                {studentName}
            </div>
        </div>
    );
}
export default MediumUserSize;