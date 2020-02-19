import { isWithinInterval, subDays, isThisMonth, isThisWeek } from 'date-fns'
import { response as response } from './response'


// ***************** PER LÄN ********************* //

export const responsePerCounty = [
    {
        "administrative_area_level_1": "Blekinge län",
        "numEvents": 2127
    },
    {
        "administrative_area_level_1": "Dalarnas län",
        "numEvents": 4891
    },
    {
        "administrative_area_level_1": "Gotlands län",
        "numEvents": 610
    },
    {
        "administrative_area_level_1": "Gävleborgs län",
        "numEvents": 3572
    },
    {
        "administrative_area_level_1": "Hallands län",
        "numEvents": 4772
    },
    {
        "administrative_area_level_1": "Jämtlands län",
        "numEvents": 8380
    },
    {
        "administrative_area_level_1": "Jönköpings län",
        "numEvents": 6803
    },
    {
        "administrative_area_level_1": "Kalmar län",
        "numEvents": 3065
    },
    {
        "administrative_area_level_1": "Kronobergs län",
        "numEvents": 2622
    },
    {
        "administrative_area_level_1": "Norrbotten County",
        "numEvents": 1
    },
    {
        "administrative_area_level_1": "Norrbottens län",
        "numEvents": 11437
    },
    {
        "administrative_area_level_1": "Skåne län",
        "numEvents": 13278
    },
    {
        "administrative_area_level_1": "Stockholm County",
        "numEvents": 4
    },
    {
        "administrative_area_level_1": "Stockholms län",
        "numEvents": 17562
    },
    {
        "administrative_area_level_1": "Södermanlands län",
        "numEvents": 3676
    },
    {
        "administrative_area_level_1": "Uppsala County",
        "numEvents": 1
    },
    {
        "administrative_area_level_1": "Uppsala län",
        "numEvents": 3981
    },
    {
        "administrative_area_level_1": "Värmlands län",
        "numEvents": 6303
    },
    {
        "administrative_area_level_1": "Västerbottens län",
        "numEvents": 12154
    },
    {
        "administrative_area_level_1": "Västernorrlands län",
        "numEvents": 10626
    },
    {
        "administrative_area_level_1": "Västmanlands län",
        "numEvents": 5784
    },
    {
        "administrative_area_level_1": "Västra Götaland",
        "numEvents": 1
    },
    {
        "administrative_area_level_1": "Västra Götalands län",
        "numEvents": 11767
    },
    {
        "administrative_area_level_1": "Örebro län",
        "numEvents": 6051
    },
    {
        "administrative_area_level_1": "Östergötlands län",
        "numEvents": 7232
    }
]

export const titleTypes = [...new Set(response.map(item => item.title_type))];

//metod för att kolla antalet per underrubrik.
// ex
const count = function (ary, classifier) {
    classifier = classifier || String;
    return ary.reduce(function (counter, item) {
        var p = classifier(item);
        counter[p] = counter.hasOwnProperty(p) ? counter[p] + 1 : 1;
        return counter;
    }, {})
};


//group by type. tar just nu title_type. räknar hur många av respektive title_type som finns i arraye av objekt.
//returnerar sedan ex [{trafikolycka: 17}, {dråp: 2}] osv.
export const groupByType = () => response.reduce((acc, it) => {
    acc[it.title_type] = acc[it.title_type] + 1 || 1;
    return acc;
}, {});



// trafikrelaterade alltså alla key som innehåller 'trafik'.
export const trafficRelated = () => {
    const allData = groupByType();

    let typeNames = Object.keys(allData).filter((propertyName) =>
        (propertyName.toLowerCase().indexOf("trafik") !== -1)
    );
    return Object.keys(allData)
        .filter(key => typeNames.includes(key))
        .reduce((obj, key) => {
            obj[key] = allData[key];
            return obj;
        }, {});
}
/***********antal brott / brottsrubrik********** */
const titleCount = count(response, function (item) {
    return item.title_type
});
console.log('antal brott per brottsrubrik')
console.log(titleCount)
/*********************************************** */



//********************antal brott IDAG/ veckan från sönda, månad********** */  
const crimesPerInterval = (n = 1) => { // n = days
    let date = Date.now()
    return response.sort((a, b) => a.pubdate_unix - b.pubdate_unix).filter(item => {
        return isWithinInterval(parseInt(item.pubdate_unix + '000'), { start: subDays(date, n), end: date })
    })
}
let crimesToday = crimesPerInterval(1)
console.log(crimesToday)
export const countPerHour = count(crimesPerInterval(), function (item) {
    let date = item.pubdate_iso8601.split('T').pop()
    let separator = date.indexOf(':')
    return date = date.substring(0, separator)
})
/************** räknar antal brott per dag******** */
//använda för att visa senaste månaden samt veckans brott.

export const countPerDay = count(crimesPerInterval(7), function (item) {
    let date = item.pubdate_iso8601.split('T').shift()
    return date
})
console.log('antal brott per dag')
console.log(countPerDay)

//antal idag.
export const accPastDayCrimes = crimesPerInterval(1).length
//antal senaste veckan
export const accPastSevenDaysCrimes = crimesPerInterval(7).length
//antal senaste månaden
export const accPastThirtyDaysCrimes = crimesPerInterval(30).length

/*let crimesThisMonth = crimesPerInterval(isThisMonth)
console.log('crimes this week')
console.log(crimesThisWeek)
console.log('crimes this month')
console.log(crimesThisMonth)
/********************antal brott per stad******* */
const areaCount = count(response, function (item) {
    return item.title_location
})
console.log('antal brott / stad')
console.log(areaCount)
/********************************************** */


//********************************************** */
// IDÉ -  för varje stad användaren lägger in, lägg till i arrayen och sök!!
//använd för att filtrera ut titlar ex. alla trafikrelaterade brott.
let compareStrings = ['falun', 'järfälla', "Borlänge", "ockelbo"]; //osv ...
//går in i arrayen med objekt. kollar om vår jämförelse-array ovan har ett indexof() > 0
//vilket betyder att den finns i arrayen. 
let searchResult = response.filter(elem => {
    return compareStrings.indexOf(elem.title_location.toLowerCase()) >= 0;
});
console.log('sökresultat med array: [falun, järfälla, Borlänge, ockelbo]')
console.log(searchResult);

//skapa en array med alla värden på städer. för att kunna visa för användaren.
//använda denna för sökfiltrering??
let arrOfCities = response.map(city => {
    return city.title_location
})

// values.sort((a,b)=>a.attr-b.attr)


/******************************************' */


/* export const pastWeeksCrimes = () => {
    let amount = 0;
    response.forEach(date => {
        if (isThisWeek(parseFloat(date.pubdate_unix + '000'))) {
            amount += 1
        }
    })
    return amount
}

//senaste månaden
export const pastMonthsCrimes = () => {
    let amount = 0;
    response.forEach(date => {
        if (isThisMonth(parseFloat(date.pubdate_unix + '000'))) {
            amount += 1
        }
    })
    return amount
} */
/*********************************************** */