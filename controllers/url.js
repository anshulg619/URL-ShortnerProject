const short_id = require("short-id");

const URL = require("../models/url");

async function handleGenerateShortUrl(req, res){
    const body = req.body;
    if(!body.url){
        return res.status(400).json({
            error: "Url is required"
        })
    }

    const shortID= short_id.generate();
    await URL.create({
        shorturl: shortID,
        redirectUrl: body.url,
        visitHistory: []

    })

    return res.json({id: shortID})
}

async function handleRedirectUsingShortID(req, res){
    const shortID = req.params.shortID;

    const entry = await URL.findOneAndUpdate(
        {
            shortID
        },
        {
            $push:{
                visitHistory:{timestamp:Date.now()}
            }
        }
    )

    return res.redirect(entry.redirectUrl);
}


async function handleGetAnalytics(req, res){
    const shortID = req.params.shortId;
    const result = await URL.findOne({ shortID  })

    return  res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    })
}
module.exports = { 
    handleGenerateShortUrl, handleRedirectUsingShortID, handleGetAnalytics,
}