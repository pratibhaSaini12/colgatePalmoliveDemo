
const fs = require('fs');

module.exports = {
    upploadImage(req, res, err){
        try{
            const dataJson = JSON.stringify(req.body)
            console.log("dataJson=========",dataJson )
            fs.writeFileSync('notes.json',dataJson)
            return res.status(200).json({
                data: res
            })
        }catch(e){

        }
      
    }
}
