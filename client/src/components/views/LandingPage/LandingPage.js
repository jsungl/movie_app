import Auth from '../../../hoc/auth';
import { useSelector } from "react-redux";


function LandingPage() {
    const user = useSelector(state => state.user);
    console.log(user);

    if(user.userData) {
        return (
            <div style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                <div>
                    {user.userData.isAuth ? <span>반갑습니다. {user.userData.name}</span> : <span>시작페이지</span>}
                </div>
                
            </div>
        );
    }
}

export default Auth(LandingPage, null)