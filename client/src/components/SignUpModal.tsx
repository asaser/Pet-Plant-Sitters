import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { SignUpCredentials } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";
import { Box, Button, Modal } from "@mui/material";
import TextInputField from "./form/TextInputField";

import styleUtils from "../styles/utils.module.css";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

interface SignUpModalProps {
    onDismiss: () => void,
    onSignUpSuccesful: (user: User) => void,
}

const SignUpModal = ({ onDismiss, onSignUpSuccesful}: SignUpModalProps) => {
    const { register, handleSubmit, formState: {errors, isSubmitting }} = useForm<SignUpCredentials>();
    
    async function onSubmit(credentials: SignUpCredentials) {
        try {
            const newUser = await NotesApi.signUp(credentials);
            onSignUpSuccesful(newUser);
        } catch (error) {
            alert(error);
            console.log(error);
        }
    }
    return (
        <Modal
            open
            onClose={onDismiss}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <form onSubmit={handleSubmit(onSubmit)}>    
                    <TextInputField 
                        name="username"
                        label="Username"
                        type="text"
                        placeholder="Username"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.username}
                    /> 
                    <TextInputField 
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="Email"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.email}
                    /> 
                    <TextInputField 
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="Password"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.password}
                    /> 
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className={styleUtils.width100}
                    >
                        Sign Up
                    </Button>
                </form>
            </Box>
        </Modal>
    );
}

export default SignUpModal;