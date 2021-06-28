import CorporateService from "./services/CorporateService"

 


export const getCorporates = async () => {
    try{
        let corporates = []
        const res = await CorporateService.getCorporates()
        const _corps = res.data.result;    
        const _corpsSplit = _corps.split("\n")
        for (var i=0 ; i < _corpsSplit.length ; i++ )
        {
            const element = _corpsSplit[i]
            if (element.trim().length > 0)
            {
                corporates.push(element.trim())
            }
        }

        return corporates

    }catch(err)
    {
        return []
    }
}