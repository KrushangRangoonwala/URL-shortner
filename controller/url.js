const url = require('../model/url');
const ShortUniqueId = require('short-unique-id');

async function generateShourtURL(req,res){
    const rurl = await url.find({});
    const originalURL = req.body.url;
    const r_url = await url.findOne({ originalURL: originalURL });
    //if originalURL already exist in database ,then return its shortID existed in dbs
    if(r_url !== null){
        console.log('MATCHES    ....');
        console.log("FINDED URL    ....",r_url);
        return res.render('view',{
            y_url : r_url.shortURL,
            model : rurl,
        });
    }

    //if originalURL does not exist in database, then following steps : 
    const uid = new ShortUniqueId({ length: 8 });
    const record = {
        originalURL : originalURL,
        shortURL : uid.rnd(),
        watchCount : 0,
    }
    const newURL = new url(record);
    const saveURL = await newURL.save();
    console.log("SAVED  ....",saveURL);
    return res.render('view',{
        y_url : saveURL.shortURL,
        model : rurl,
    });
}

async function redirectTo(req,res){
    const p_url = req.params.url; 
    const r_url = await url.findOne({ shortURL: p_url });
    if(r_url){
    let count = r_url.watchCount + 1;
    console.log("Count : ",count,"IP : ",req.ip);
    const result = await url.updateOne({ shortURL: p_url }, { watchCount : count });
    res.redirect(r_url.originalURL);
}
}

async function handleView(req,res){
    const rurl = await url.find({});
    // console.log(rurl);
    return res.render('view',{
        y_url : null,
        model : rurl,
    });
}


module.exports = {
    generateShourtURL,
    redirectTo,
    handleView
}