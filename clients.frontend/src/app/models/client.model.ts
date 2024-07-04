export class ClientResponse {
  data!: Client[]
  total!: number
  page!: number
  limit!: number
}

export class Client {
  id!: number
  firstname!: string
  lastname!: string
  phone!: string
  country!: string
}
