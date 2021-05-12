// function getName ('Hong Kong') {
//     return hongKong.find(() => {
//         return hongKong.name === 'Hong Kong'
//     })
// }


function showInfo(prefix:string, dataObj: object) { //dont know what prefix type is
    for (let key in dataObj){
        if (typeof dataObj[key] !== 'object') {
            console.log(`${prefix}${key}: ${dataObj[key]}`);
        } else if (Array.isArray(dataObj[key])){ //check is this array
            console.log(`**** ${key} ****`);
            for ( const item of dataObj[key]) {
                if (typeof item === 'object') { //check is this object
                    showInfo("### ", item);
                } else {
                    console.log(`${prefix}${key}: ${dataObj[key]}`);
                }
            }
        } else {
            // console.log(dataObj[key]);
            console.log(`==== ${key} ====`)
            showInfo("==== ", dataObj[key]);
        }
    }
}

const capitalize = str => str[0].toUpperCase() + str.slice(1);
function displayInfoV3(data:object) {
  for (const key in data) {
    if (typeof data[key] !== "object") {
      console.log(`${capitalize(key)}: ${data[key]}`);
    } else if (Array.isArray(data[key]) && typeof data[key][0] !== "object") {
      console.log(`${capitalize(key)}: ${data[key].join(", ")}`);
    } else {
      displayInfoV3(data[key]);
    }
  }
}


function showInfoV2(data : object){
    const keys = Object.keys(data);
    const lines : any = keys.map((key)=>{
      if (typeof data[key] !== "object") {
        return console.log(`${data[key]}`);
      } else if (Array.isArray(data[key]) && typeof data[key][0] !== "object") {
        return console.log(`**** ${key} ****`); //
        
      } else {
        return showInfoV2(data[key]);
      }
    });
    return lines.join("\n");
  }
  



function main() {
    const data = '[{"name":"Hong Kong","topLevelDomain":[".hk"],"alpha2Code":"HK","alpha3Code":"HKG","callingCodes":["852"],"capital":"City of Victoria","altSpellings":["HK","香港"],"region":"Asia","subregion":"Eastern Asia","population":7324300,"latlng":[22.25,114.16666666],"demonym":"Chinese","area":1104.0,"gini":53.3,"timezones":["UTC+08:00"],"borders":["CHN"],"nativeName":"香港","numericCode":"344","currencies":[{"code":"HKD","name":"Hong Kong dollar","symbol":"$"}],"languages":[{"iso639_1":"en","iso639_2":"eng","name":"English","nativeName":"English"},{"iso639_1":"zh","iso639_2":"zho","name":"Chinese","nativeName":"中文 (Zhōngwén)"}],"translations":{"de":"Hong Kong","es":"Hong Kong","fr":"Hong Kong","ja":"香港","it":"Hong Kong","br":"Hong Kong","pt":"Hong Kong","nl":"Hongkong","hr":"Hong Kong","fa":"هنگ‌کنگ"},"flag":"https://restcountries.eu/data/hkg.svg","regionalBlocs":[],"cioc":"HKG"}]'
    const hongKong = JSON.parse(data)[0];

    console.log(hongKong);
    // showInfo("", hongKong);
    showInfoV2(hongKong);
}

main();