import ChangePasswordForm from "../forms/ChangePasswordForm";
import UploadAvatarForm from "../forms/UploadAvatarForm";

export default function Account(props) {
    return (
        <div>
            <h1>Account</h1>
            <UploadAvatarForm />
            <ChangePasswordForm />
        </div>
    );
}
