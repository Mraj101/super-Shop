const DailySale = require('../dailySale/models/DailySale');
const Products = require('../products/models/productModels'); // Import your Products model

async function dailysale(data) {
    try {
        // Group the sales data by product_id
        const groupedSales = data.reduce((acc, sale) => {
            const product_Id = sale.product_Id;

            if (!acc[product_Id]) {
                acc[product_Id] = {
                    product_Id: product_Id,
                    quantitySold: 0,
                    totalAmount: 0,
                };
            }

            // Accumulate quantity sold and total amount
            acc[product_Id].quantitySold += sale.quantitySold;
            acc[product_Id].totalAmount += parseFloat(sale.soldPrice);
            console.log("accur",acc)
            return acc;
        }, {});

        // Fetch product details for each product_id
        const ProductIdArray=Object.keys(groupedSales)

        const productDetails = ProductIdArray.map(async (productId) => {
            const product = await Products.findById(productId);
            return {  productDetails: {
                "_id": product._id,
                "productName": "Iphone 14",
                "price": 800,
            }};
        });



    

        // Convert the groupedSales object to an array
        // const processedData = Object.values(groupedSales);

        // return { processedData };
        return productDetails
    } catch (error) {
        console.error(error);
        throw new Error("Error processing daily sale data");
    }
}

module.exports = {
    dailysale,
};
