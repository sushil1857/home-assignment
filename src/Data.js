import axios from 'axios';
import URL from "./Constants"

export default function () {          

    return axios.all([axios.get(URL.serviceURL),
    axios.get(URL.providerURL)])
        .then(axios.spread((serviceResponse, providerResponse) => {
            return [serviceResponse.data, providerResponse.data]

        }))
        .catch(error => console.log(error))
}




