const mongoose = require('mongoose');
const BlogModel = mongoose.model('Blog');

    let testRoute = (req, res) => {
        console.log(req.params);
        res.send(req.params)
    
    };
    let example = (req, res) => {
        
        /*let input = req.query;
        let id = req.query.id;
        let response = "Your request query vaue is "+ id ;*/
        console.log(req.body)
        res.send(req.body)
    };

    let getAllEntries = (req, res) => {
        
        /*let input = req.query;
        let id = req.query.id;
        let response = "Your request query vaue is "+ id ;*/
       BlogModel.find().select().lean().exec(
            (err, result )=>{

            if(err){
                res.send(err);
            }else{
                res.send(result);
            }

       })
      
    };

    let getbyId = (req, res) => {
        
        BlogModel.findOne({ 'blogId': req.params.blogId }, (err, result) => {

            if (err) {

                console.log('Error Occured.')
               
                
                res.send(result)
            } else {
               
             
                res.send(result)
            }
        })
      
    };


    module.exports ={

        testRoute : testRoute,
        example : example,
        getAllEntries : getAllEntries,
        getbyId : getbyId
    }