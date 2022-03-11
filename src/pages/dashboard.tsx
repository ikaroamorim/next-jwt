import { GetServerSideProps } from "next"
import Head from "next/head"
import { parseCookies } from "nookies"
import { useContext, useEffect } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { api } from "../services/api"
import { getAPIClient } from "../services/axios"

export default function Dashboard() {
   const { user } = useContext(AuthContext)

   useEffect(() => {
      //api.get('/users')
   }, [])





   return (
      <>
         <Head>
            <title>Dashboard</title>
         </Head>
         <main>
            <h1>Olá</h1>

            <h2>{user?.name}</h2>
         </main>
      </>)
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
   //console.log(ctx.req.cookies)

   const apiClient = getAPIClient(ctx);

   const { ['next-jwt-token']: token } = parseCookies(ctx)

   if(!token){
      return {
         redirect: {
            destination:'/', 
            permanent: false
         }
      }
   }

   //await apiClient.get('/users')



   return {
      props: {}
   }
}