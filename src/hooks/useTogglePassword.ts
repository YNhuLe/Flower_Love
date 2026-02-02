import { useState } from "react";

function useTogglePassword(initialState: boolean = false){
    const [isPasswordVisible, setIsPasswordVisible] = useState(initialState);
    const togglePass = ()=> setIsPasswordVisible(!isPasswordVisible);
    const inputType = isPasswordVisible ? "text" : "password";
    const iconLabel = isPasswordVisible ? "show": "hide";
    return {isPasswordVisible, togglePass, inputType, iconLabel};
}

export default useTogglePassword;