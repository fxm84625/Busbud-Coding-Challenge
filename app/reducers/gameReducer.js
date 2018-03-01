import cityDataRaw from '../cities-canada-usa.json';
import stringSimilarity from 'string-similarity';
const { sqrt, pow } = Math;

// Convert the data from an array of arrays into objects for each city
// The Object's keys will be the first line of the data array ( id, name, latitude, longitude )
const cityObjKeys = cityDataRaw[0];
const cityObjArr = [];
for( let i = 1; i < cityDataRaw.length; i++ ) {
    const cityObj = {};
    for( let j = 0; j < cityDataRaw[i].length; j++ ) {
        cityObj[ cityObjKeys[j] ] = cityDataRaw[i][j];
    }
    cityObjArr.push( cityObj );
}

function checkStringSimilarity( str1, str2 ) {
    // Compares two strings
    // Returns a number score from 0-10, with a higher score meaning a better match
    return +((stringSimilarity.compareTwoStrings( str1, str2 ) * 10).toFixed(3));
}

function checkNumPairSimilarity( numA1, numA2, numB1, numB2 ) {
    // Compares two coordinate pairs
    // Returns a number score from 0-10, with a higher score meaning a closer number pair
    const dist = sqrt( pow( numA1 - numB1, 2 ) + pow( numA2 - numB2, 2 ) );
    if( dist > 2 ) return 0;
    return +(( ( 2 - dist ) * 5 ).toFixed(3));
}

function searchData( inputCityName, inputLatitude, inputLongitude ) {
    // Searches through the .tsv file, looking for the closest matches for the user's inputted city name, latitude (optional), and longitude (optional)
    let matchingCities = [];
    for( let i = 0; i < cityObjArr.length; i++ ) {
        const scoredCityObj = {};
        scoredCityObj.key = cityObjArr[i].id;
        scoredCityObj.name = cityObjArr[i].name + ', ' + cityObjArr[i].tz.split( '/' )[1] + ', ' + cityObjArr[i].country;
        scoredCityObj.lat = cityObjArr[i].lat;
        scoredCityObj.long = cityObjArr[i].long;
        const nameScore = checkStringSimilarity( inputCityName, cityObjArr[i].name );
        const coordScore = checkNumPairSimilarity( inputLatitude, inputLongitude, cityObjArr[i].lat, cityObjArr[i].long );
        scoredCityObj.score = ( nameScore > coordScore ? nameScore : coordScore );
        if( scoredCityObj.score >= 5 ) matchingCities.push( scoredCityObj );
    }
    matchingCities = matchingCities.sort( ( a, b ) => ( b.score - a.score ) );
    return matchingCities;
}

const defaultState = {
    cityArr: [],
    userInput: '',
    userLatitude: '',
    userLongitude: ''
};

const wordLettersReducer = ( state = defaultState, action ) => {
    switch( action.type ) {
        case 'CHAR_ADDED': {
            const newInputWord = state.userInput + action.letter;
            return {
                cityArr: state.cityArr,
                userInput: newInputWord,
                userLatitude: state.userLatitude,
                userLongitude: state.userLongitude,
            };
        }
        case 'LAT_CHAR_ADDED': {
            const newInputLatitude = state.userLatitude + action.letter;
            return {
                cityArr: state.cityArr,
                userInput: state.userInput,
                userLatitude: newInputLatitude,
                userLongitude: state.userLongitude,
            };
        }
        case 'LONG_CHAR_ADDED': {
            const newInputLongitude = state.userLongitude + action.letter;
            return {
                cityArr: state.cityArr,
                userInput: state.userInput,
                userLatitude: state.userLatitude,
                userLongitude: newInputLongitude,
            };
        }
        case 'CHAR_REMOVED': {
            const newInputWord = state.userInput.slice( 0, -1 );
            return {
                cityArr: state.cityArr,
                userInput: newInputWord,
                userLatitude: state.userLatitude,
                userLongitude: state.userLongitude,
            };
        }
        case 'LAT_CHAR_REMOVED': {
            const newInputLatitude = state.userLatitude.slice( 0, -1 );
            return {
                cityArr: state.cityArr,
                userInput: state.userInput,
                userLatitude: newInputLatitude,
                userLongitude: state.userLongitude,
            };
        }
        case 'LONG_CHAR_REMOVED': {
            const newInputLongitude = state.userLongitude.slice( 0, -1 );
            return {
                cityArr: state.cityArr,
                userInput: state.userInput,
                userLatitude: state.userLatitude,
                userLongitude: newInputLongitude,
            };
        }
        case 'SEARCH_CITIES': {
            return {
                cityArr: searchData( state.userInput, state.userLatitude, state.userLongitude ),
                userInput: '',
                userLatitude: '',
                userLongitude: '',
            };
        }
        default:
            return state;
    }
};

export default wordLettersReducer;
