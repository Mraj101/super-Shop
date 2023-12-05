const mongoose=require('mongoose')
const Schema=mongoose.Schema

const productSchema=new Schema(

            {
                _id: ObjectId,          // Unique identifier for the product
                productName: String,    // Name of the product
                description: String,    // Detailed description of the product
                price: Number,          // Cost of the product
                status: Boolean,        // Status of the product (true for 'Available', false for 'Discontinued')
                isActive: Boolean,      // Indicates if the product is currently active
                isDeleted: Boolean,     // A flag to indicate if the product is deleted
                createDate: Date,       // Date and time when the product was added to the database
                deleteDate: Date        // Date and time when the product was marked as deleted (nullable)
            }

);

module.exports=mongoose.model('product',productSchema)