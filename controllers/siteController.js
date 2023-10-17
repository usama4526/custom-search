
const Site = require('../models/siteModel')


// 2) Route handlers
exports.getAllSites = async (req,res)=> {
        //route handler
        const allSites = await Site.find()
        try {
            // EXECUTE QUERY
            res.status(200).json({
                status: 'success',
                results: allSites.length,
                data: {
                    sites: allSites
                }
            })
        }
        catch (err) {
            res.status(404).json({
                status: 'failed',
                message: err
            }) 
        }

}

exports.createSite = async (req, res)=>{
    console.log(req.body);
    try {
        const newSite = await Site.create(req.body)
        res.status(201).json({
            status: 'success',
            data: {
                site: newSite
            }
        })
    }
    catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err // dont send string, is example only
        })
    }

}


exports.deleteSite = async (req,res)=>{
    try {
        await Site.findByIdAndDelete(req.params.id)
        //check id to validate if it exists
        res.status(204).json({
        status: 'success',
        message: 'Deleted Successfuly!'
        })
    } catch (error) {
        res.status(404).json({
            status: 'failed',
            message: error
        })        
    }

}
