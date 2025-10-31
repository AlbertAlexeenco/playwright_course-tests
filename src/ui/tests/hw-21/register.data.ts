

interface ICredentials {
    username: string;
    password: string;
}

enum NOTIFICATIONS  {
    REGISTER_SUCCESS = "Successfully registered! Please, click Back to return on login page",
    REGISTER_FAIL_NO_VALID_DATA = "Please, provide valid data",
    REGISTER_FAIL_USERNAME_IS_REQUIRED = "Username is required",
    REGISTER_FAIL_USERNAME_NOT_3_CHAR =  "Username should contain at least 3 characters",
    REGISTER_FAIL_USERNAME = "Prefix and postfix spaces are not allowed is username",
    REGISTER_FAIL_USERNAME_IS_IN_USE = "Username is in use",
    REGISTER_FAIL_PASSWORD_IS_REQUIRED = "Password is required",
    REGISTER_FAIL_PASSWORD_NOT_8_CHAR = "Password should contain at least 8 characters",
    REGISTER_FAIL_PASSWORD_NO_LOWERCASE_CHAR = "Password should contain at least one character in lower case",
    REGISTER_FAIL_PASSWORD_WITH_PREFIX_OR_POSTFIX = "Prefix and postfix spaces are not allowed is username",
}

interface IUserData {
    testName: string;
    credentials: ICredentials;
    errorMessage: NOTIFICATIONS
}

const validCredentials: ICredentials = {
    username: "Alick_Alex_1993_Fall",
    password: "123456AAaa"
}

const invalidTestData : IUserData[] = [
     {
        testName: "Register when username and password are empty",
        credentials: {username: "", password: ""},
        errorMessage: NOTIFICATIONS.REGISTER_FAIL_NO_VALID_DATA
    },
    {
        testName: "Register when username is empty",
        credentials: {username: "", password: "123456Aa"},
        errorMessage: NOTIFICATIONS.REGISTER_FAIL_USERNAME_IS_REQUIRED
    },
    {
        testName: "Register when username less than 3 characters",
        credentials: {username: "al", password: "123456Aa"},
        errorMessage: NOTIFICATIONS.REGISTER_FAIL_USERNAME_NOT_3_CHAR
    },
    {
        testName: "Register when username is with space prefix",
        credentials: {username: " alick", password: "123456Aa"},
        errorMessage: NOTIFICATIONS.REGISTER_FAIL_PASSWORD_WITH_PREFIX_OR_POSTFIX
    },
    {
        testName: "Register when username is with space postfix",
        credentials: {username: "alick ", password: "123456Aa"},
        errorMessage: NOTIFICATIONS.REGISTER_FAIL_PASSWORD_WITH_PREFIX_OR_POSTFIX
    },
    {
        testName: "Register when username consist of only spaces",
        credentials: {username: "     ", password: "123456Aa"},
        errorMessage: NOTIFICATIONS.REGISTER_FAIL_PASSWORD_WITH_PREFIX_OR_POSTFIX
    },
    {
        testName: "Register when password is empty",
        credentials: {username: "Alick12345", password: ""},
        errorMessage: NOTIFICATIONS.REGISTER_FAIL_PASSWORD_IS_REQUIRED
    },
    {
        testName: "Register when password is less than 8 characters",
        credentials: {username: "Alick12345", password: "Aa123"},
        errorMessage: NOTIFICATIONS.REGISTER_FAIL_PASSWORD_NOT_8_CHAR
    },
    // {
    //     testName: "Register when password is without uppercase letter",
    //     credentials: {username: "Alick12345", password: "aaaaa111111"},
    //     errorMessage: NOTIFICATIONS.
    // },
    {
        testName: "Register when password is without lowercase letter",
        credentials: {username: "Alick12345", password: "AAAAAA111111"},
        errorMessage: NOTIFICATIONS.REGISTER_FAIL_PASSWORD_NO_LOWERCASE_CHAR
    },
    {
        testName: "Register when password consist of only spaces",
        credentials: {username: "Alick12345", password: "            "},
        errorMessage: NOTIFICATIONS.REGISTER_FAIL_PASSWORD_IS_REQUIRED
    },
] 


export default invalidTestData;
