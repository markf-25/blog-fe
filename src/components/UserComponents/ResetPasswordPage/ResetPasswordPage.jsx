import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from "react"
import { validateResetToken } from "../../../services/password.service.js"

import ResetPasswordForm from "../ResetPasswordForm/ResetPasswordForm.jsx"
import styles from "./ResetPasswordPage.module.css"

const ResetPasswordPage = () => {

/*     http://localhost:5173/reset-password?token=oHV2~k.LwA */

    const [searchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(false)
    const [isTokenValid, setIsTokenValid] = useState(false)

    const validationCheck = async (resetToken) => {
        setIsLoading(true)

    try {
        const checkedToken = await validateResetToken({ token: resetToken })

        if (checkedToken?.valid) {
            setIsTokenValid(true)
        }
    } catch (error) {
        console.error("Errore nella validazione:", error)
    } finally {
        setIsLoading(false)
    }
    }

    const resetTokenToBeChecked = searchParams.get('token');

    useEffect(() => {
        validationCheck(resetTokenToBeChecked)
    }, [])

    return <>
        <div className={styles.passwordPageContainer}>
        {isLoading? <p>ATTENDERE</p> : null}
        {isTokenValid? <ResetPasswordForm resetToken={resetTokenToBeChecked}/> : <p>TOKEN NON VALIDO</p>}
        </div>
    </>
}

export default ResetPasswordPage