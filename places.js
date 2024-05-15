const fs = require('fs');
const data = require('./BZU.json');

function sortTimeSlots(timeA, timeB) {
    const startTimeA = timeA.split(' - ')[0];
    const startTimeB = timeB.split(' - ')[0];

    const dateA = new Date(`2000-01-01 ${startTimeA}`);
    const dateB = new Date(`2000-01-01 ${startTimeB}`);

    return dateA - dateB;
}

class PlaceBZU {
    constructor(name) {
        this.name = name;
        this.Monday = [];
        this.Tuesday = [];
        this.Wednesday = [];
        this.Thursday = [];
        this.Friday = [];
        this.Saturday = [];
        this.Sunday = [];
    }
}

const AllPlaces = {};

for (const course of data) {
    const place = course.place;
    const days = course.days.split(', ');
    const time = course.time.split(', '); 
    let obj;
    if (!(place in AllPlaces)) {
        obj = new PlaceBZU(place);
        AllPlaces[place] = obj;

    } else {
        obj = AllPlaces[place];
    }
    for (const day of days) {
        if (day === "M") {
            obj.Monday.push(...time); 
        } else if (day === "T") {
            obj.Tuesday.push(...time);
        } else if (day === "W") {
            obj.Wednesday.push(...time);
        } else if (day === "R") {
            obj.Thursday.push(...time);
        } else if (day === "F") {
            obj.Friday.push(...time);
        } else if (day === "S") {
            obj.Saturday.push(...time);
        } else if (day === "N") {
            obj.Sunday.push(...time);
        }
    }
}

for (const key of Object.keys(AllPlaces)) {
    const obj = AllPlaces[key];
    obj.Monday = obj.Monday.sort(sortTimeSlots);
    obj.Tuesday = obj.Tuesday.sort(sortTimeSlots);
    obj.Wednesday = obj.Wednesday.sort(sortTimeSlots);
    obj.Thursday = obj.Thursday.sort(sortTimeSlots);
    obj.Friday = obj.Friday.sort(sortTimeSlots);
    obj.Saturday = obj.Saturday.sort(sortTimeSlots);
    obj.Sunday = obj.Sunday.sort(sortTimeSlots);
}

// Convert AllPlaces object to JSON string
const jsonData = JSON.stringify(AllPlaces, null, 2);

// Write JSON string to places.json file
fs.writeFileSync('places.json', jsonData);

console.log('Data has been written to places.json');
