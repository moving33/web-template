export interface User {
  id: number
  name: string
  email: string
  createdAt: Date
  updatedAt: Date
}

export interface Session {
  user: User
  expiresAt: Date
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthState {
  user: User | null
  session: Session | null
  isAuthenticated: boolean
}
