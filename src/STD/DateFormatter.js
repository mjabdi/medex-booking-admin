


const FormatDateFromString = (str) =>
{
    if (!str)
    {
        return ''
    }
    return `${str.substr(8,2)}-${str.substr(5,2)}-${str.substr(0,4)}`;
}

const FormatDateFromStringWithSlash = (str) =>
{
    if (!str)
    {
        return ''
    }
    return `${str.substr(8,2)}/${str.substr(5,2)}/${str.substr(0,4)}`;
}

const RevertFormatDateFromString = (str) =>
{
    if (!str)
    {
        return ''
    }
    return `${str.substr(6,4)}-${str.substr(3,2)}-${str.substr(0,2)}`;
}


const FormatDateFromStringShortYear = (str) =>
{
    if (!str)
    {
        return ''
    }
    return `${str.substr(8,2)}-${str.substr(5,2)}-${str.substr(2,2)}`;
}



module.exports = {
    FormatDateFromString : FormatDateFromString,
    FormatDateFromStringShortYear : FormatDateFromStringShortYear,
    RevertFormatDateFromString: RevertFormatDateFromString,
    FormatDateFromStringWithSlash: FormatDateFromStringWithSlash
}