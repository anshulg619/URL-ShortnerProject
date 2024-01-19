const express = require('express');
const routes = express.Router();

const {handleGenerateShortUrl,
    handleRedirectUsingShortID,
handleGetAnalytics} = require('../controllers/url');

routes.post("/", handleGenerateShortUrl)

routes.get("/:shortId", handleRedirectUsingShortID)

routes.get("/analytics/:shortID", handleGetAnalytics)

module.exports = routes;
