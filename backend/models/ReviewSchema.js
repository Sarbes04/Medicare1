import mongoose from "mongoose";
import Doctor from "./DoctorSchema.js";

const reviewSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0.0,
      max: 5.0,
      default: 0.0,
    },
  },
  { timestamps: true }
);

//is a middleware function that executes before any query stream
//is used to populate the user information
reviewSchema.pre(/^find/, function (next){
  this.populate({
    path: 'user',
    select: "name photo",
  });
  next();
});

 
reviewSchema.statics.calcAverageRatings = async function(doctorId){
  //this here refers to the current review 
  //for finding out avg and total rating we will find mongoDB aggregation
  //pipelines, it provides many mathematical functions
  const stats = await this.aggregate([{
    //first we will match the review associated with the specific doctor
    $match:{doctor:doctorId}
  },
  {
    //then it groups the reviews based on the doctorId
    $group:{
      _id:'$doctor',
      numOfRating:{$sum:1},
      avgRating:{$avg:'$rating'}
    }
  }])
  //console.log(stats); 
  //we need to update these ratings in the doctor's data
  await Doctor.findByIdAndUpdate(doctorId, {
    totalRating: stats[0].numOfRating,
    averageRating: stats[0].avgRating,
  });  
}

//to see the stats, we need to call the function
//it is a middleware that executes when a review gets saved
reviewSchema.post('save', function(){
  this.constructor.calcAverageRatings(this.doctor)  
});

export default mongoose.model("Review", reviewSchema);
