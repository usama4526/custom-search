const scrapeVideoUrls = require('../scraper/videoScraper')

exports.getSiteVideoSrc = async (req, res) => {
    console.log('posted url', req.body.url);
    try {
        const videoUrls = await scrapeVideoUrls(req.body.url);
        console.log('response from function', videoUrls);
        res.status(200).json({
            status: 'success',
            results: videoUrls.length,
            data: {
                videoUrls: videoUrls
            }
        });
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({
            status: 'error',
            message: error
        });
    }
}
