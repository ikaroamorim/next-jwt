import { v4 as uuid } from 'uuid'

type signInRequest = {
   email: string;
   password: string;
}

const delay = (amount = 750) => new Promise(resolve => setTimeout(resolve, amount))

export async function signInRequest(data: signInRequest) {
   await delay()

   return {
      token: uuid(),
      user: {
         name: 'Ikaro Amorim',
         email: 'ikaro.amorim@gmail.com',
         avatar: 'https://github.com/ikaroamorim.png'
      }
   }
}

export async function recoverUserInformation() {
   await delay()

   return {
      user: {
         name: 'Ikaro Amorim',
         email: 'ikaro.amorim@gmail.com',
         avatar: 'https://github.com/ikaroamorim.png'
      }
   }
}