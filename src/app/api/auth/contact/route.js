import Contact from "@/models/Contact";
import connect from "@/utils/db";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export const POST = async(request) => {
    const {name,email,message} = await request.json();

    console.log("Name: ", name);
    console.log("Email: ", email);
    console.log("Message: ", message);


    try {
        await connect();
        await Contact.create({name, email, message});
        return NextResponse.json({
        msg: ["Message sent successfully"], 
        success: true,
       })
    } catch (error) {
        if(error instanceof mongoose.Error.ValidationError){
            let errorList = [];
            for(let e in error.errors){
                errorList.push(error.errors[e].message);
            }
            console.log(errorList)
            return NextResponse.json({msg: errorList})
        }
        else {
            return NextResponse.json(error);
        }
    }
}