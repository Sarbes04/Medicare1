import Doctor from "../models/DoctorSchema.js"
import Booking from "../models/BookingSchema.js";

export const updateDoctor = async(req,res)=>{
    const id = req.params.id;
    
    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );
        //the new true property ensures that we get the updated data as a response

        res.status(200).json({
            success:true,
            message: "Successfully updated",
            data: updatedDoctor,
        });
    } catch (error) {
        res.status(500).json({ success:false, message:"Failed to update"});
    }
};

export const deleteDoctor = async(req,res)=>{
    const id = req.params.id;
    
    try {
        await Doctor.findByIdAndDelete(id);

        res.status(200).json({
            success:true,
            message: "Successfully deleted",
        });
    } catch (error) {
        res.status(500).json({ success:false, message:"Failed to delete"});
    }
};

export const getSingleDoctor = async(req,res)=>{
    const id = req.params.id;
    //.populate("reviews") shows the entire review, not just the id.
    try {
        const doctor = await Doctor.findById(id)
            .populate("reviews")
            .select("-password");

        res.status(200).json({
            success:true,
            message: "Doctor found",
            data: doctor,
        });
    } catch (error) {
        res.status(404).json({ success:false, message:"No doctor found"});
    }
};

export const getAllDoctor = async(req,res)=>{    
    try {
        const {query} = req.query;
        //this query parameter is used to filter data based on specific criteria

        //this will hold the doctor records
        let doctors;
        if(query){
            //if query exists, we will query to find only approved doctors
            //and we will try to match the name or specialization according 
            //to the provided query field
            doctors = await Doctor.find({
                isApproved:'approved',
                $or: [
                    { name: {$regex: query, $options: "i"}},
                    { specialization: {$regex: query, $options: "i"}},
                ]
                //or operator searches values that match name and specialization
                //options:i helps in case intensive searching
            }).select("-password");
        }else{
            //if query parameter doesnt exist, we will find all the approved doctors
            //this will exclude password from user data
            doctors = await Doctor.find({isApproved:'approved'}).select("-password");
        }

        res.status(200).json({
            success:true,
            message: "Doctors found",
            data: doctors,
        });
    } catch (error) {
        res.status(404).json({ success:false, message:"Not found"});
    }
};

export const getDoctorProfile = async(req,res)=>{
    const doctorId = req.userId;
    
    try {
        const doctor = await Doctor.findById(doctorId); 
        if(!doctor){
            return res.status(404).json({success:false, message:'Doctor not found'});
        }
        const {password, ...rest} = doctor._doc;
        const appointments = await Booking.find({doctor:doctorId});

        res.status(200).json({
            success:true, 
            message:'Profile info is getting', 
            data:{...rest, appointments},
        });
    } catch (err) {
        res.status(500).json({ success:false, message:"Something went wrong, cannot get"});
    }
}