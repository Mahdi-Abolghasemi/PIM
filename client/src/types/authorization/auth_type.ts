export type authLogin_type = {
    userName: string,
    password: string,
}

export type authResult_type = {
    success: boolean,
    userName: string,
    token: string,
}