const config = {
    api: {
        baseUrl: 'https://todo-pp.longwavestudio.dev/',
        paths: {
            user: {
                        register: "user/register/",
                        checkUsername: "user/check-username/",
                        login: "user/login/",
                        forgotPassword: "user/forgot-password",
                        valideToken: "user/validate-reset-token",
                        resetPassword: "user/reset-password",
                        profileUpdate: "user/profile"
                    }
        },
    }
}

//Shortcuts//

//Base//
const databaseUrl = config.api.baseUrl;

const registrationUrl = config.api.paths.user.register;
const loginUrl = config.api.paths.user.login;
const forgotPasswordUrl = config.api.paths.user.forgotPassword;
const checkResetTokenUrl = config.api.paths.user.valideToken
const resetPasswordUrl = config.api.paths.user.resetPassword;
const usernameAvailableUrl = config.api.paths.user.checkUsername;
const profileUpdateUrl = config.api.paths.user.profileUpdate
        
//Fetches//
export const registrateUser = databaseUrl + registrationUrl;
export const loginUser = databaseUrl + loginUrl;
export const forgotPassword = databaseUrl + forgotPasswordUrl;
export const checkResetToken = databaseUrl + checkResetTokenUrl
export const resetPassword = databaseUrl + resetPasswordUrl;
export const usernameValidationWithoutUsername = databaseUrl + usernameAvailableUrl;
export const profileUpdate = databaseUrl + profileUpdateUrl

export default config