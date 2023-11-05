let apiKey = 'f0e3dc82e9ebd729677c04544fce5c15';

document.addEventListener("DOMContentLoaded", function () {
    let first_City = document.querySelector("#first");
    let sec_City = document.querySelector("#sec");
    let sub_button = document.querySelector(".book");
    let status = document.querySelector(".status");
    let selection_value = document.querySelector("#cars");

    sub_button.addEventListener("click", async (e) => {
        e.preventDefault();
        e.stopPropagation();
        let geoApi = `https://api.openweathermap.org/geo/1.0/direct?q=${first_City.value}&limit=5&appid=${apiKey}`;
        let geoApi2 = `https://api.openweathermap.org/geo/1.0/direct?q=${sec_City.value}&limit=5&appid=${apiKey}`;
        let cycle_1 = 3;
        let bike_1 = 5;
        let car_1 = 10;

        if (!first_City.value) {
            return swal({
                title: "City is required.",
                icon: "warning"
            });
        } else if (!sec_City.value) {
            return swal({
                title: "City is required.",
                icon: "warning"
            });
        } else {
            let res1 = await fetch(geoApi);
            let data1 = await res1.json();
            // console.log(data1);

            let res2 = await fetch(geoApi2);
            let data2 = await res2.json();
            let lat1 = data1[0].lat;
            let lon1 = data1[0].lon;

            let lat2 = data2[0].lat;
            let lon2 = data2[0].lon;

            function limitDecimalPlaces(number, decimalPlaces) {
                return parseFloat(number.toFixed(decimalPlaces));
             }

            function calculateDistance(lat1, lon1, lat2, lon2) {
                // Convert latitude and longitude from degrees to radians
                const radiansLat1 = (lat1 * Math.PI) / 180;
                const radiansLon1 = (lon1 * Math.PI) / 180;
                const radiansLat2 = (lat2 * Math.PI) / 180;
                const radiansLon2 = (lon2 * Math.PI) / 180;
              
                // Radius of the Earth in kilometers (mean value)
                const earthRadius = 6371;
              
                // Haversine formula
                const dLat = radiansLat2 - radiansLat1;
                const dLon = radiansLon2 - radiansLon1;
              
                const a =
                  Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(radiansLat1) * Math.cos(radiansLat2) *
                  Math.sin(dLon / 2) * Math.sin(dLon / 2);
              
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                let distance = earthRadius * c; // Distance in kilometers
                // let dis = distance.toString();
                let limitedNum = limitDecimalPlaces(distance, 2);
                return limitedNum;
              }
              
              // Example usage:
              let distance = calculateDistance(lat1, lon1, lat2, lon2);
              console.log(`The distance between the two points is ${distance} kilometers.`);

              if(selection_value.value == 'cycle'){
                let price = cycle_1 * distance;
                let limitedPrice = limitDecimalPlaces(price, 2);
                status.innerHTML = `
                Your city - ${first_City.value} \n |
                Your destination - ${sec_City.value} \n |
                Distance - ${distance} \n |
                Price - ₹ ${limitedPrice}
                `
              }else if (selection_value.value == 'bike'){
                let price = bike_1 * distance;
                let limitedPrice = limitDecimalPlaces(price, 2);
                status.innerHTML = `
                Your city - ${first_City.value} \n |
                Your destination - ${sec_City.value} \n |
                Distance - ${distance} \n |
                Price - ₹ ${limitedPrice}
                `
              } else {
                let price = car_1 * distance;
                let limitedPrice = limitDecimalPlaces(price, 2);
                status.innerHTML = `
                Your city - ${first_City.value} \n |
                Your destination - ${sec_City.value} \n |
                Distance - ${distance} \n |
                Price - ₹ ${limitedPrice}
                `;
              }
              
        }
    })
});