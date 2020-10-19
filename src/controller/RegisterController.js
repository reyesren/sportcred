import RegisterView from "../view/register/RegisterView";
import RegisterSuccessView from "../view/register/RegisterSuccessView";
import UserModel from "../model/UserModel";

export const Register = ({ route, navigation }) => {
    const {msg} = route.params;

    function onRegisterPress(userInfo) {
        const {name, username, email, password} = userInfo;
        UserModel.createUserWithEmailAndPassword(
            email,
            password,
            () => {
                navigation.navigate('RegisterSuccess', {name, username, email});
            },
            (error) => {
                navigation.navigate('Register', {msg: error.message})
            });
    }

    return (
        RegisterView({onUserRegistered: onRegisterPress, msg})
    );
};


export const RegisterSuccess = ({ route, navigation }) => {
    function onWelcomePressed() {
        // navigation.navigate('Questionnaire', {name: 'Jane'})
        console.log("welcome pressed")
    }

    const {name, username, email} = route.params;

    return (
        RegisterSuccessView({onWelcomePressed, })
    );
};




// make sure to put all your business logic in the controller. Your view may contain callback functions as props
