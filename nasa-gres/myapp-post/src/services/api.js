const sequelize = require ('sequelize')


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







