const mongoose = require ('mongoose')

mongoose.set('strictQuery', true);

mongoose.connect('mongodb://localhost:27017/datanasas_db', { useNewUrlParser: true});
const Datanasa = require('../models/nasq')


const apising = async () => {

    try {
        console.log ('ejecutando get api')

        const response = await fetch('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=rSh0ehaPICNZIsJm1SviRDM8htSODgGEMg2mRArq');
        const data = await response.json()

        const dataPhoto = data.photos

        const newList = dataPhoto.map(rover => (
            {
                idNasa: rover.id, 
                camera: rover.camera,
                img_src: rover.img_src,
                eart_date: rover.eart_date
            }
        ));
        const itemsToCreate = []
        const existeditems = await Datanasa.find();
        for (const item of newList) {
            const existed = existeditems.find((existeditem) => existeditem.idNasa === item.idNasa)
            if (!existed){
                itemsToCreate.push(item)
            }
        }
        if (itemsToCreate > 0) {
            await Datanasa.insertMany(itemsToCreate);
            console.log('data saved')
        }
        return [...existeditems.concat(itemsToCreate)];
    
    } catch(error){
        console.log(error)
    }
}

module.exports = apising







// const roverMars = require('../models/nasq.js')
// const { createDatanasa} = require('../controllers/nc.js')
// async function api () {


// try {

//     const response = await fetch( 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=rSh0ehaPICNZIsJm1SviRDM8htSODgGEMg2mRArq')
//     // const data = 
//     // await response.json()
//     // console.log("hello world")
//     // for (let i = 0; i < 10; i++) {
//         const nasaData = {
//             // photos_id: data ["photos"] [i].id,
//             // camera_id: data ["photos"] [i].camera.id,
//             // camera_name: data["photos"] [i].camera.name,
//             // img_url: data["photos"] [i].img_src,
//         }
//         createDatanasa(nasaData)
//     // }
// }
// catch (error) {
//     console.log('Failed')
//     }


// const API_KEY = 'rSh0ehaPICNZIsJm1SviRDM8htSODgGEMg2mRArq';
// const ROVER_NAME = 'curiosity';
// const SOL = 1000;

// const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${ROVER_NAME}/photos?sol=${SOL}&api_key=${API_KEY}`;

// fetch(url)
//   .then(response => response.json())
//   .then(data => {
//     console.log(data);
    
//   })
//   .catch(error => {
//     console.error(error);
//   });
// }
// module.exports = api()