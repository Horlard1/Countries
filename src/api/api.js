export const getCountries = async (callback)=>{
    fetch("https://restcountries.com/v2/all")
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => callback(error))
}

