import ChangePasswordForm from "../forms/ChangePasswordForm";
import UploadAvatarForm from "../forms/UploadAvatarForm";

function Account(props) {
    return (
        <div>
            <h1>Account</h1>
            <UploadAvatarForm />
            <ChangePasswordForm />
        </div>
    );
}

export default Account;
