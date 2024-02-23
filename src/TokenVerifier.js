import UserService from "./services/UserService";

export async function getUserIdFromToken(token)
{
    try{
       const res  = await UserService.checkToken({token: token})
       if (res.data.status === 'OK')
        {
            return {username: res.data.userId, forename: res.data.forename, surname: res.data.surname, roles:res.data.roles, isDoctor: res.data.isDoctor, lastLoginTimeStamp: res.data.lastLoginTimeStamp}
        }
       else
        {
            return null
        }
    }
    catch(err)
    {
        return null
    }
  
}