interface ICreateUserRequest {
  email: string,
  password: string,
  user_metadata: {
    name: string,
    place: string,
    phone: string
  }
}
