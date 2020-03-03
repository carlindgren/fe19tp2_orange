import { isWithinInterval, subDays } from 'date-fns'
import { response1 as response } from './response1'

export const titleTypes = [...new Set(response.map(item => item.title_type))];


//****ta bort alla sammanfattningar i requestet.******/
const compareArr = ["Sammanfattning natt", "Sammanfattning vecka", "Sammanfattning kväll och natt"]
let filteredResponse = response.filter(el => (compareArr.indexOf(el.title_type) === -1));
//metod för att kolla antalet per underrubrik.

const count = function (ary, classifier) {
    classifier = classifier || String;
    return ary.reduce(function (counter, item) {
        var p = classifier(item);
        counter[p] = counter.hasOwnProperty(p) ? counter[p] + 1 : 1;
        return counter;
    }, {})
};

//********************antal brott n dagar tillbaka i tiden. ********** */  
const crimesPerInterval = (n = 1) => { // n = days
    let date = Date.now()
    return filteredResponse.sort((a, b) => a.pubdate_unix - b.pubdate_unix).filter(item => {
        return isWithinInterval(parseInt(item.pubdate_unix + '000'), { start: subDays(date, n), end: date })
    })
}
let filteredResponseTwentyFour = crimesPerInterval(1)
let filteredResponseSeven = crimesPerInterval(7)
let filteredResponseThirty = crimesPerInterval(30)

const customCrimesPerInterval = (crimes, n = 1) => { // n = days
    let date = Date.now()
    return crimes.sort((a, b) => a.pubdate_unix - b.pubdate_unix).filter(item => {
        return isWithinInterval(parseInt(item.pubdate_unix + '000'), { start: subDays(date, n), end: date })
    })
}

export const customCrimeFilter = (cities, crimes) => { // ["sandv"]
    console.log("CUSTOM CRIME FILTER REACHED")
    let sortedCrimes = filteredResponse.sort((a, b) => a.pubdate_unix - b.pubdate_unix)
    let masterArray = [];
    let minorArray = [];

    cities.forEach(city => {
        const tempArray = filteredResponse.filter(crime => crime.title_location == city)
        minorArray.push(tempArray);
    })
    let cityCrimes = minorArray.flat();
    console.log(cityCrimes)
    crimes.forEach(crime => {
        const arr = cityCrimes.filter(filtcrime => filtcrime.title_type.includes(crime))
        masterArray.push(arr)

    })
    let allCrimes = masterArray.flat();
    console.log(allCrimes);

}

//************Group interval by type.*************** */
//group by type. tar just nu title_type. räknar hur många av respektive title_type som finns i arraye av objekt.
//returnerar sedan ex [{trafikolycka: 17}, {dråp: 2}] osv.
console.log('brott/per typ, 7 dagar')
const groupByType = (n) => crimesPerInterval(n).reduce((acc, it) => {
    acc[it.title_type] = acc[it.title_type] + 1 || 1;
    return acc;
}, {});

export const lastTwentyfour = groupByType(1)
export const lastSeven = groupByType(7)
export const lastThirty = groupByType(30)
/************** räknar antal brott per dag******** */

export const countPerHour = count(crimesPerInterval(1), (item => {
    let date = item.pubdate_iso8601.split('T').pop()
    let separator = date.indexOf(':')
    return date = date.substring(0, separator)
}))

export const countPerDay = count(crimesPerInterval(7), (item => {
    let date = item.pubdate_iso8601.split('T').shift()
    return date
}))

export const countPerMonth = count(crimesPerInterval(30), (item => {
    let date = item.pubdate_iso8601.split('T').shift()
    return date
}))
//antal idag.
export const accPastDayCrimes = crimesPerInterval(1).length
export const crimesTwoDaysAgo = crimesPerInterval(2).length - accPastDayCrimes
//antal senaste veckan
export const accPastSevenDaysCrimes = crimesPerInterval(7).length
export const crimesPastFourteen = crimesPerInterval(14).length - accPastSevenDaysCrimes

//antal senaste månaden
export const accPastThirtyDaysCrimes = crimesPerInterval(30).length
export const crimesPastSixty = crimesPerInterval(60) - accPastThirtyDaysCrimes

let compareStrings = ['falun', 'järfälla', "Borlänge", "ockelbo"]; // lägg till i denna vid sök på ort/ stad?

export const arrOfCities = filteredResponse.map(city => {
    return city.title_location
}) // använd för att visa upp sökresultat i formen.

const groupRelated = (api, searchArr) => {
    return api.filter(elem => {
        return searchArr.indexOf(elem.title_type.toLowerCase()) >= 0;
    })
};
let citySearch = groupRelated(filteredResponse, compareStrings)
console.log('sökresultat med array: [falun, järfälla, Borlänge, ockelbo]')
console.log(citySearch)

let trafficArray = ['trafikolycka', 'rattfylleri', 'trafikbrott', 'trafikolycka, smitning från', 'kontroll person/fordon', 'trafikolycka, singel', 'trafikhinder'];
let narcoticsArray = ['rattfylleri', 'fylleri/lob', 'alkohollagen', 'narkotikabrott']
let thievingsArray = ['stöld/inbrott', 'stöld, försök', 'stöld', 'rån, försök', 'hemfridsbrott', 'bedrägeri', 'inbrott', 'rån övrigt', 'motorfordon, anträffat stulet']
let crimeOfViolence = ['misshandel', 'dråp', 'mord', 'mord/dråp,  försök', 'mord/dråp']
let others = ['övrigt']
// count trafficrelated crimes.

const crimeTypes = {
    'trafikrelaterade brott': trafficArray,
    'Narkotikarelaterade brott': narcoticsArray,
    'Stöld': thievingsArray,
    'Våldsbrott': crimeOfViolence,
    'övrigt': others
};

// Object.keys(crimeTypes) ['traffic','narcoits}]
export const pieChartObjects = Object.keys(crimeTypes).map(crimeKey => {
    return {
        [crimeKey]: groupRelated(filteredResponse, crimeTypes[crimeKey]).length
    }
})
export const pieChartObjectsSeven = Object.keys(crimeTypes).map(crimeKey => {
    return {
        [crimeKey]: groupRelated(filteredResponseSeven, crimeTypes[crimeKey]).length
    }
})
export const pieChartObjectsTwentyFour = Object.keys(crimeTypes).map(crimeKey => {
    return {
        [crimeKey]: groupRelated(filteredResponseTwentyFour, crimeTypes[crimeKey]).length
    }
})
export const pieChartObjectsThirty = Object.keys(crimeTypes).map(crimeKey => {
    return {
        [crimeKey]: groupRelated(filteredResponseThirty, crimeTypes[crimeKey]).length
    }
})
console.log(pieChartObjects);
console.log(pieChartObjectsSeven);
console.log(Object.values(pieChartObjectsTwentyFour));
const sumOfTypedCrimes = pieChartObjects.map(obj => Object.values(obj)[0]).reduce((acc, cur) => {
    console.log(typeof cur)
    return Number(acc + cur)
}, 0)
pieChartObjects.push({ 'övrigt': filteredResponse.length - sumOfTypedCrimes });
console.log(pieChartObjects)
console.log("sum of typed: " + sumOfTypedCrimes + " sum of all: " + filteredResponse.length + " difference: " + (filteredResponse.length - sumOfTypedCrimes))


