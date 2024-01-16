const mongoose = require("mongoose");
const DailySaleModels = require("../models/DailySale");
const productModels = require("../../products/models/productModels");

const getDailySale = async (req, res) => {

  try {
    if(req.body.date)
    {
      const startDate = new Date(req.body.date);
    startDate.setHours(0, 0, 0, 0);
    const todayEnd = new Date(req.body.date);
    todayEnd.setHours(23, 59, 59, 999);

    const formattedStartdate = startDate.toISOString().split('T')[0];

    const dailyData = await DailySaleModels.find({
      createdAt: { $gte: startDate, $lte: todayEnd }
    }).lean();

    const updatedDailyData = await Promise.all(
      dailyData.map(async (dailyItem) => {
        const updatedData = await Promise.all(
          dailyItem.data.map(async (product) => {
            const productDetails = await productModels.findById(product.product_Id).lean();
            const price = productDetails ? productDetails.price : null;
            return {
              ...product,
              price: price ? product.quantity * price : null
            };
          })
        );

        return {
          ...dailyItem,
          data: updatedData
        };
      })
    );

    return res.status(201).json(updatedDailyData);


    }else{
      const months = new Date(req.body.month);
      console.log(months,"hi months")
      let y=months.getFullYear();
      let m=months.getMonth();
      const startDay=new Date(y,m,1);
      console.log(startDay,"hi vai");
      startDay.setHours(0,0,0,0);
      const endDay=new Date(y,m+1,0)
      console.log(endDay,"end day");
      endDay.setHours(23,59,59,999);
      const MonthlYdata=await DailySaleModels.find({createdAt:{$gte:startDay,$lte:endDay}}).lean()
      
      console.log(JSON.stringify(MonthlYdata),"hi monthly data")

      const updatedMonthlyData = await Promise.all(
        MonthlYdata.map(async (dailyItem) => {
          const updatedData = await Promise.all(
            dailyItem.data.map(async (product) => {
              const productDetails = await productModels.findById(product.product_Id).lean();
              const price = productDetails ? productDetails.price : null;
              return {
                ...product,
                price: price ? product.quantity * price : null
              };
            })
          );
  
          return {
            ...dailyItem,
            data: updatedData
          };
        })
      );
      console.log(updatedMonthlyData,"hi updated monthly")
      return res.status(201).json(updatedMonthlyData);
    }
    
  } catch (err) {
    console.log(err, "before internal server error");
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// Controller to create a new product
// const createDailySale = async (req, res) => {
//   try {
//     let date=req.body
//     console.log("ji hello")

//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "Internal Server Error and daily sale not found" });
//   }
// };

// Controller to get a single product by ID
const single = async (req, res) => {
  try {
  } catch (error) {
    console.error("Error in getSingleProduct:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Controller to delete a product by ID
const deleteDailysale = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    res.status(404).json({ error: "no such id is found" });
  const product = await Products.findOneAndDelete({ _id: id });

  if (!product) res.status(404).json({ error: "no such product" });

  return res.status(201).json(product);
};

const updateDailysale = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such workout or id" });
  }
  const product = await Products.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!product)
    return res.status(404).json({ error: "no such product exists" });

  res.status(201).json(product);
};

// Controller to update a product by ID

module.exports = {
  getDailySale
  // createDailySale,
  // single,
  // deleteDailysale,
  // updateDailysale,
};
