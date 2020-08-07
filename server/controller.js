module.exports = {
    create: (req, res, next) => {
        const db = req.app.get('db');
        const {productName, price, imageUrl} = req.body;

        db.create_product([productName, price, imageUrl])
        .then( () => {
            res.sendStatus(200) 
        })
        .catch(err => {
            res.status(500).send({errorMessage: "Something went wrong."});
            console.log(err)
        });
    },
    getOne: ( req, res, next ) => {
        const db = req.app.get('db');
        const {id} = req.params;

        db.get_product(id)
        .then( product => res.status(200).send(product) )
        .catch( err => {
            res.status(500).send({errorMessage: "Something went wrong."});
            console.log(err)
        });
    },
    getAll: (req,res,next) => {
        const db = req.app.get('db');

        db.get_inventory()
        .then(inventory => res.status(200).send(inventory) )
        .catch( err => {
            res.status(500).send({errorMessage: "Something went wrong."});
            console.log(err)
        });
    },
    update: (req, res, next) => {
        const db = req.app.get('db');
        const {id} = req.params;
        const { productName, price, imageUrl} = req.body;

        db.update_product([id, productName, price, imageUrl])
        .then( () => res.sendStatus(200) )
        .catch( err => {
            res.status(500).send({errorMessage: "Something went wrong."});
            console.log(err)
        });
    },
    delete: (req,res,next) => {
        const db = req.app.get('db');
        const {id} = req.params;
        
        db.delete_product(id)
        .then(() => res.sendStatus(200) )
        .catch ( err => {
            res.status(500).send({errorMessage: "Something went wrong."});
            console.log(err)
        })
    }
}