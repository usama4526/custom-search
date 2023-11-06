const scrapeVideoUrls = require('../scraper/videoScraper')

exports.getSiteVideoSrc = async (req, res) => {
    console.log('posted url', req.body.url);
    try {
        //const videoUrls = await scrapeVideoUrls(req.body.url);
        console.log('response from function', videoUrls);
        scrapeVideoUrls(req.body.url).then(videoUrls=>{
            res.status(200).json({
                status: 'success',
                results: videoUrls.length,
                data: {
                    videoUrls: videoUrls
                }
            });
        })
    } catch (error) {

    }
}
