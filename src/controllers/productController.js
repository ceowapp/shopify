const { createProduct } = require('../services/shopifyService');

exports.pushToShopify = async (req, res) => {
  try {
    const { shopifyData, seoData } = req.body; 
    const shopifyProduct = await createProduct(shopifyData, seoData); 
    res.send(`<p>Product pushed to Shopify successfully! Shopify ID: ${shopifyProduct.id}</p>`);
  } catch (error) {
    console.error('Error pushing product to Shopify:', error); 
    res.status(500).send('<p>Failed to push product to Shopify</p>');
  }
};