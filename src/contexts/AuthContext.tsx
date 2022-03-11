import { createContext, ReactElement, ReactNode, useEffect, useState } from "react"
import { recoverUserInformation, signInRequest } from "../services/auth";
import { setCookie, parseCookies } from 'nookies'
import Router from 'next/router'
import { api } from "../services/api";

type AuthContextType = {
   user: UserInfo | null,
   isAuthenticated: boolean,
   signIn: (data: SignInData) => Promise<void>
}

type SignInData = {
   email: string,
   password: string
}

type UserInfo = {
   email: string,
   name: string,
   avatar: string
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: any) {
   const [user, setUser] = useState<UserInfo | null>(null)

   const isAuthenticated = !!user

   useEffect(() => {

      const { 'next-jwt-token': token } = parseCookies()

      if (token) {
         recoverUserInformation().then(response => setUser(response.user))
      }

      // Above is a syntax sugar for
      //const cookies = parseCookies()
      //const token = cookies['next-jwt-token']
   }, [])

   //In case another part of the application, other than login screen, need to authenticate
   //this function will be available in context
   async function signIn({ email, password }: SignInData) {
      const { token, user: UserInfo } = await signInRequest({
         email,
         password
      })

      setCookie(undefined, 'next-jwt-token', token, {
         maxAge: 60 * 60  //one hour 
      })

      api.defaults.headers['Authentication'] = `Bearer ${token}`

      setUser(user)

      Router.push('/dashboard')

   }

   return (
      <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
         {children}
      </AuthContext.Provider>
   )
}