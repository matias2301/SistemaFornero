export interface UserRegister {    
    name: string,
    email: string,
    password: string,
    role?: string,
    state?: string,    
}
export interface RegisterResponse {
    success: boolean,
    msg: string,
    user: UserResponse
}
export interface LoginResponse {
    success: boolean,
    msg: string,
    user: UserResponse,
    token: string
}
export interface UserLogin {
    email: string,
    password: string
}
export interface UserResponse {
    id: number,
    name: string,
    email: string,
    password?: string,
    role: string,
    state: string,    
    createdAt: Date,
    updatedAt: Date,
}