const { rewriteContent, generateSEO } = require('../services/aiSeoService');
const { readGoogleDoc } = require('../services/googleDocsService');
const { crawlContent } = require('../services/contentCrawlerService');

exports.importDocument = async (req, res) => {
  try {
    const { fileId, token, type, url } = req.body;
    let content;
    if (type === "web") {
      content = await crawlContent(url);
      if (!content) {
        return res.status(404).json({ error: 'Failed to fetch content from the web URL' });
      }
    } else if (type === "doc") {
      content = await readGoogleDoc(fileId, token);
      if (!content) {
        return res.status(404).json({ error: 'Document not found or failed to fetch content' });
      }
    } else {
      return res.status(400).json({ error: 'Invalid type provided' });
    }
    const shopifyData = await rewriteContent(content);
    const seoData = await generateSEO(shopifyData);
    res.status(200).json({ shopifyData, seoData });
  } catch (error) {
    console.error('Error in importDocument:', error);
    res.status(500).json({ error: 'An error occurred while importing the document' });
  }
};