const usernameFormat = /^[a-zA-Z0-9]+$/;
const emailFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function isAlphaNum(name){
    return usernameFormat.test(name)
}

export function isEmail(email){
    return emailFormat.test(email)
}

export function hasNoSpaces(value) {
    return !/\s/.test(value);
}

export function isNotEmpty(value){
    return value.trim() !== ""
}

export function hasMinLength(value, minLength){
    return value.length >= minLength
}

export function hasMaxLength(value, maxLength){
    return value.length <= maxLength
}

export function areValuesMatching(value1, value2){
    return value1 === value2
}