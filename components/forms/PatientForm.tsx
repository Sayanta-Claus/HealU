"use client"
 import { useState } from 'react';
// import { Button } from "@/components/ui/button"
import {
  Form,
} from "@/components/ui/form";
import { createUser } from "@/lib/actions/patient.actions";
import { UserFormValidation } from '@/lib/validation';
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
 export enum FormFieldType{
    INPUT='input',
    TEXTAREA='textarea',
    PHONE_INPUT='phoneInput',
    CHECKBOX='checkbox',
    DATE_PICKER='datePicker',
    SELECT='select',
    SKELETON='skeleton',
 }






 
const PatientForm=()=> {
  const router = useRouter()
  // 1. Define your form.
  const [isLoading, setIsLoading] = useState(false)


  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })
 
  // 2. Define a submit handler.
  const onSubmit=async({name,email,phone}: z.infer<typeof UserFormValidation>)=> {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log("HEY");
    setIsLoading(true);
    try{
      const userData={
        name,email,phone
      };
      const user = await createUser(userData);
      if(user){
        router.push(`/patients/${user.$id}/register`)
      }
      // console.log({user})
    }catch(error){
      console.log(error);
    }
    // setIsLoading(false);
    // console.log(values)
  }
  return(
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
      <section className="mb-12 space-y-4">
                <h1 className="header">Hi there 👋 </h1>
                <p className="text-dark-700">Schedule your first appointment</p>
      </section>
     <CustomFormField fieldType={FormFieldType.INPUT} name="name" label="Full name" placeholder="John Doe" iconSrc="/assets/icons/user.svg" iconAlt="user" control={form.control}/>
     <CustomFormField fieldType={FormFieldType.INPUT} name="email" label="email" placeholder="johndoe@gmail.com" iconSrc="/assets/icons/email.svg" iconAlt="email" control={form.control}/>
     <CustomFormField fieldType={FormFieldType.PHONE_INPUT} name="phone" label="phone number" placeholder="1234567890" control={form.control}/>
      
      
      <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
    </form>
  </Form>
  )
}
export default PatientForm