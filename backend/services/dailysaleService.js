const dailysaleController = require("../dailySale/controllers/dailysaleController");
const DailySaleModels = require("../dailySale/models/DailySale");
const productModels = require("../products/models/productModels");


const dailySaleService = async function (datesAndMonthes) {
  console.log("inside the services,here is the data", datesAndMonthes);

  if (datesAndMonthes.date) {
    const startDate = new Date(datesAndMonthes.date);
    startDate.setHours(0, 0, 0, 0);
    const todayEnd = new Date(datesAndMonthes.date);
    todayEnd.setHours(23, 59, 59, 999);

    const formattedStartdate = startDate.toISOString().split("T")[0];
    
    const dailyData = await DailySaleModels.find({
      createdAt: { $gte: startDate, $lte: todayEnd },
    }).lean();


    const updatedDailyData = await Promise.all(
      dailyData.map(async (dailyItem) => {
        const updatedData = await Promise.all(
          dailyItem.data.map(async (product) => {
            
            const productDetails = await productModels
              .findById(product.product_Id)
              .lean();
            const price = productDetails ? productDetails.price : null;
            return {
              ...product,
              price: price ? product.quantity * price : null,
            };
          })
        );

        return {
          ...dailyItem,
          data: updatedData,
        };
      })
    );

    return updatedDailyData;

  } else {
    const months = new Date(datesAndMonthes.month);
    console.log(months, "hi months");
    let y = months.getFullYear();
    let m = months.getMonth();
    const startDay = new Date(y, m, 1);
    console.log(startDay, "hi vai");
    startDay.setHours(0, 0, 0, 0);
    const endDay = new Date(y, m + 1, 0);
    console.log(endDay, "end day");
    endDay.setHours(23, 59, 59, 999);
    const MonthlYdata = await DailySaleModels.find({
      createdAt: { $gte: startDay, $lte: endDay },
    }).lean();

    console.log(JSON.stringify(MonthlYdata), "hi monthly data");

    const updatedMonthlyData = await Promise.all(
      MonthlYdata.map(async (dailyItem) => {
        const updatedData = await Promise.all(
          dailyItem.data.map(async (product) => {
            const productDetails = await productModels
              .findById(product.product_Id)
              .lean();
            const price = productDetails ? productDetails.price : null;
            return {
              ...product,
              price: price ? product.quantity * price : null,
            };
          })
        );

        return {
          ...dailyItem,
          data: updatedData,
        };
      })
    );
  }
};

module.exports = { dailySaleService }