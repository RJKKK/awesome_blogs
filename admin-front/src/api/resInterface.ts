export interface LoginRes {
    token: string
}

export interface UserInfoRes{
    account: string
    avatar: string
    name: string
    email: string
}

export interface registerRes {

}

export interface userListRes {
    list: (UserInfoRes & { key: number })[],
    total: number
}


