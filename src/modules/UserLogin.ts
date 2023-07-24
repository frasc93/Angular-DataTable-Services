export interface User {
    id: number
    username: string
    email: string
    firstName: string
    lastName: string
    gender: string
    image: string
    token: string
}

export interface UserLogin {
    username: string
    password: string
}