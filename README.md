# Busbud Coding Challenge

Adapted from a real coding challenge from a tech startup: [Busbud Backend Coding Challenge](https://github.com/busbud/coding-challenge-backend-c)

## Features
- uses React and Redux to read User prompts
- the endpoint returns an array of scored suggested matches
    - the suggestions are sorted by descending score
    - each suggestion has a score between 0 and 10 (inclusive) indicating confidence in the suggestion (10 is most confident)
    - each suggestion has a name which can be used to disambiguate between similarly named locations
    - each suggestion has a latitude and longitude
- the caller's location can optionally be supplied via querystring parameters `latitude` and `longitude` to help improve relative scores

### Sample responses

#### Near match

    name: Londo
    latitude: 43.70011
    longitude: -79.4163
```
{
  "suggestions": [
    {
      "name": "London, ON, Canada",
      "latitude": "42.98339",
      "longitude": "-81.23304",
      "score": 0.9
    },
    {
      "name": "London, OH, USA",
      "latitude": "39.88645",
      "longitude": "-83.44825",
      "score": 0.5
    },
    {
      "name": "London, KY, USA",
      "latitude": "37.12898",
      "longitude": "-84.08326",
      "score": 0.5
    },
    {
      "name": "Londontowne, MD, USA",
      "latitude": "38.93345",
      "longitude": "-76.54941",
      "score": 0.3
    }
  ]
}
```

#### No match

    name: SomeRandomCityInTheMiddleOfNowhere

```
No suggestions
```
