const url = require('../model/url');
const ShortUniqueId = require('short-unique-id');

async function generateShourtURL(req,res){
    const originalURL = req.body.url;
    const r_url = await url.findOne({ originalURL: originalURL });
    //if originalURL already exist in database ,then return its shortID existed in dbs
    if(r_url){
        console.log('MATCHES    ....');
        console.log("FINDED URL    ....",r_url);
        return res.render('view',{
            y_url : r_url.shortURL,
            model : db_urls,
        });
    }

    //if originalURL does not exist in database, then following steps : 
    const uid = new ShortUniqueId({ length: 8 });
    const record = {
        originalURL : originalURL,
        shortURL : uid.rnd(),
        watchCount : 0,
        createdBy : req.user._id,
    }
    const newURL = new url(record);
    const saveURL = await newURL.save();
    console.log("SAVED  ....",saveURL);

    const db_urls = await url.find({createdBy : req.user._id});
    return res.render('view',{
        y_url : saveURL.shortURL,
        model : db_urls,
    });
}

async function redirectTo(req,res){
    const p_url = req.params.url; 
    const r_url = await url.findOne({ shortURL: p_url });
    if(r_url){
    console.log("before update watchCount : ",r_url.watchCount);
    let count = r_url.watchCount + 1;
    const result = await url.updateOne({ shortURL: p_url }, { watchCount : count });
    console.log("after update watchCount : ",result,"IP : ",req.ip);
    res.redirect(r_url.originalURL);
}
}

async function handleView(req,res){
    const db_urls = await url.find({createdBy : req.user._id});

    return res.render('view',{
        y_url : null,
        model : db_urls,
    });
}


module.exports = {
    generateShourtURL,
    redirectTo,
    handleView
}