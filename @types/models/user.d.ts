declare module 'models' {
  export namespace models {
    namespace user {
      interface Attributes {
        id?: number
        email?: string
        password?: string
        passwordConfirmation?: string
        createdAt?: Date
        updatedAt?: Date
      }

      interface RawAttributes {
        id?: number
        email?: string
        password?: string
        passwordConfirmation?: string
        createdAt?: Date
        updatedAt?: Date
      }
    }
  }
}
