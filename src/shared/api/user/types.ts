
export interface IUserData {
    id: string,
    email: string,
    first_name: string,
    last_name: string,
    avatar: string,
}

export interface IUsersPageData {
    page: number,
    per_page: number,
    total: number,
    total_pages: number,
    data: IUserData[]
}