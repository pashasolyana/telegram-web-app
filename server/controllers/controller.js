const Model = require('../models/model')

module.exports.getAbonent = async (req, res) =>{
    try {
        const {id} = req.params;

        if(!id){
            return res.status(400).json({message : 'Invalid credentials'})
        }
        
        const abonent = await Model.Abonent.findOne({
            where : {id : id},
        })
        if(!abonent) {
            return res.status(404).json({message : "Такого абонента не существует"})
        }
        const counters = await Model.Counter.findAll(
            {
                where: {abonentId: abonent.id},
                order: [
                    ['id', 'ASC']
                ],
                raw: true 
            }
        )
        res.status(200).json({counters})
    } catch (error) {
        console.log(error)
        res.status(500).send('Some error')
    }
}

module.exports.updateCounter = async (req, res) =>{
    try {
        const {counterId} = req.params;
        const {value} = req.body;
        if(!value){
            return res.status(400).json({message : 'Invalid credentials'})
        }
        const [count,result] = await Model.Counter.update(
            {value : value},
            {
                where : {id : counterId},
                returning: true
            }
        );
        res.status(200).json({result})
    } catch (error) {
        console.log(error)
        res.status(500).send('Some error')
    }
}