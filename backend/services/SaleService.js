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

            // Accumulate quantity sold and multiply soldPrice by quantitySold for total amount
            acc[product_Id].quantitySold += sale.quantitySold;
            acc[product_Id].totalAmount += parseFloat(sale.soldPrice) * sale.quantitySold;

            return acc;
        }, {});

        // Fetch product details for each product_id
        const productDetails = await Promise.all(
            Object.keys(groupedSales).map(async (productId) => {
                const product = await Products.findById(productId);
                return {
                    id: productId,
                    productName: product.productName, // Change this to the actual field name for the product name
                    totalQuantitySold: groupedSales[productId].quantitySold,
                    totalAmount: groupedSales[productId].totalAmount,
                };
            })
        );
                console.log("the returned quantity",productDetails);
        return productDetails;
    } catch (error) {
        console.error(error);
        throw new Error("Error processing daily sale data");
    }
}

module.exports = {
    dailysale,
};
