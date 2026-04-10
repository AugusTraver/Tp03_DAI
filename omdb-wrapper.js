import axios from "axios";
const APIKEY = "f91110dc";
const OMDBSearchByPage = async (searchText, page = 1) => {
    let returnObject = {
        respuesta: false,
        cantidadTotal: 0,
        datos: []
    };

    let url = "http://www.omdbapi.com/?" + "apikey=" + APIKEY + "&s=" + searchText + "&page=" + page;

    console.log(url)
    const apiResponse = await axios.get(url)
    returnObject.respuesta = true;
    returnObject.datos = apiResponse.data.Search;
    returnObject.cantidadTotal = apiResponse.data.totalResults || null;
    return returnObject;
};




const OMDBSearchComplete = async (searchText) => {
    let returnObject = {
        respuesta: false,
        cantidadTotal: 0,
        datos: []
    };
    let pagina = 1

    let url = 'http://www.omdbapi.com/?' + 'apikey=' + APIKEY + '&s=' + searchText + '&page=' + pagina

    let response = await axios.get(url)

    returnObject.cantidadTotal = response.data.totalResults;

    let CantidadDePaginasARecorrer = Math.ceil(returnObject.cantidadTotal / 10);

    for (let i = 0; i <= CantidadDePaginasARecorrer; i++) {
        let url = 'http://www.omdbapi.com/?' + 'apikey=' + APIKEY + '&s=' + searchText + '&page=' + pagina
        let response = await axios.get(url)

        if (response.data.Response === "True") {
            returnObject.respuesta = true;
            returnObject.datos = returnObject.datos.concat(response.data.Search);
        }
        pagina++
    }
    return returnObject;

};




const OMDBGetByImdbID = async (imdbID) => {
    let returnObject = {
        respuesta: false,
        cantidadTotal: 0,
        datos: {}
    };
    let url = 'http://www.omdbapi.com/?' + 'apikey=' + APIKEY + '&' + 'i=' + imdbID

let response = await axios.get(url)

if(response.data.Response === "True"){
    returnObject.respuesta = true;
    returnObject.datos = response.data;
}


return returnObject;
};

export { OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID };