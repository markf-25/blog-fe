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
                    },
            posts: {
                        get: "posts",
                        detail: (id) => `posts/${id}`
            }
        },
        socket: {
            actions: {
                        CREATE_POST: "createPost",
                        DELETE_POST: "deletePost",
                        UPDATE_POST: "updatePost"
            }
        }
    }
}

//Shortcuts//

//Base//
const databaseUrl = config.api.baseUrl;

//User//
const registrationUrl = config.api.paths.user.register;
const loginUrl = config.api.paths.user.login;
const forgotPasswordUrl = config.api.paths.user.forgotPassword;
const checkResetTokenUrl = config.api.paths.user.valideToken
const resetPasswordUrl = config.api.paths.user.resetPassword;
const usernameAvailableUrl = config.api.paths.user.checkUsername;
const profileUpdateUrl = config.api.paths.user.profileUpdate

///Posts/
const getPostsUrl = config.api.paths.posts.get
const getSinglePostUrl = config.api.paths.posts
        
//User fetches//
export const registrateUser = databaseUrl + registrationUrl;
export const loginUser = databaseUrl + loginUrl;
export const forgotPassword = databaseUrl + forgotPasswordUrl;
export const checkResetToken = databaseUrl + checkResetTokenUrl
export const resetPassword = databaseUrl + resetPasswordUrl;
export const usernameValidationWithoutUsername = databaseUrl + usernameAvailableUrl;
export const profileUpdate = databaseUrl + profileUpdateUrl

//Posts fetches//
export const retrievePosts = databaseUrl + getPostsUrl
export const retrieveSinglePost = (id) => databaseUrl + getSinglePostUrl.detail(id);

//Socket actions//
export const createPostAction = config.api.socket.actions.CREATE_POST
export const deletePostAction = config.api.socket.actions.DELETE_POST
export const editPostAction = config.api.socket.actions.UPDATE_POST


export default config