export interface Root {
  status: boolean
  data: Daum[]
  message: string
}

export interface Daum {
  userid: number
  firstname: string
  lastname: string
  countrycode: string
  mobileno: string
  emailid: string
  password: string
  entrytime: any
  updatetime: any
  status: any
}
