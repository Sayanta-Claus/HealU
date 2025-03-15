"use client"
 import { useState } from 'react';
// import { Button } from "@/components/ui/button"
import {
    Form,
} from "@/components/ui/form";
import { Doctors } from '@/constants';
import { createAppointment } from '@/lib/actions/appointment.actions';
// import { createUser } from "@/lib/actions/patient.actions";
import { getAppointmentSchema } from '@/lib/validation';
import { zodResolver } from "@hookform/resolvers/zod";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { SelectItem } from '../ui/select';
import { FormFieldType } from './PatientForm';



 
const AppointmentForm=({
    userId,patientId,type
}:{
    userId:string;
    patientId:string;
    type:"create" | "cancel" | "schedule";

})=> {
  const router = useRouter()
  // 1. Define your form.
  const [isLoading, setIsLoading] = useState(false)

  const AppointmentFormValidation=getAppointmentSchema(type);

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician:"",
      schedule:new Date(),
      reason:"",
      note:"",
        cancellationReason:"",
    },
  })
 
  // 2. Define a submit handler.
  const onSubmit=async(values: z.infer<typeof AppointmentFormValidation>)=> {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log("HEY");
    setIsLoading(true);
    let status;
    switch(type){
        case 'schedule':
            status='scheduled';
            break;
        default:
                status='pending';
                break;
    }



    try{
      if(type==='create' && patientId){
        const appointmentData={
            userId,
            patient:patientId,
            primaryPhysician:values.primaryPhysician,
            schedule:new Date(values.schedule),
            reason:values.reason!,
            note:values.note,
            status: status as Status
        }
        const appointment = await createAppointment(appointmentData);
        if(appointment){
            form.reset();
            router.push(`/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`)
        }
      }

      
    }catch(error){
      console.log(error);
    }
    setIsLoading(false);
    // console.log(values)
  }

  let buttonLabel;
  switch(type){
    case "create":
      buttonLabel="Request Appointment";
      break;
    case "cancel":
      buttonLabel="Cancel Appointment"
      break;
    case "schedule":
        buttonLabel="Schedule Appointment";
        break;

  }

  return(
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
      <section className="mb-12 space-y-4">
                <h1 className="header">New Appointment</h1>
                <p className="text-dark-700">Request a new appointment</p>
      </section>

    {type !=="cancel" && (
        <>
            <CustomFormField fieldType={FormFieldType.SELECT} name="primaryPhysician" label="Doctor" placeholder="Select a doctor" control={form.control}>
        {Doctors.map((doctor)=>(
            <SelectItem key={doctor.name}
            value={doctor.name}>
                <div className='flex cursor-pointer
                items-center gap-2'>
                    <Image
                    src={doctor.image}
                    width={32}
                    height={32}
                    alt={doctor.name}
                    className='rounded-full
                    border border-dark-500'/>
                    <p>{doctor.name}</p>
                </div>
                </SelectItem>
                
        ))}
      </CustomFormField>
      <CustomFormField
      fieldType={FormFieldType.DATE_PICKER}
      control={form.control}
      name="schedule"
      label="Expected appointment date"
      showTimeSelect
      dateFormat='dd/MM/yyyy h:mm aa'
      >

      </CustomFormField>
      <div className='flex flex-col gap-6 xl:flex-row'>
        <CustomFormField fieldType={FormFieldType.TEXTAREA} name="reason" label="Reason for appointment" placeholder="Enter reason for appointment" control={form.control}/>
        <CustomFormField fieldType={FormFieldType.TEXTAREA} name="note" label="Notes" placeholder="Enter notes" control={form.control}/>
      </div>
        </>
    )}

    {type==="cancel" && (
        <CustomFormField fieldType={FormFieldType.TEXTAREA} name="cancellationReason" label="Reason for cancellation" placeholder="Enter reason for cancellation" control={form.control}/>
    )}

     {/* <CustomFormField fieldType={FormFieldType.INPUT} name="name" label="Full name" placeholder="John Doe" iconSrc="/assets/icons/user.svg" iconAlt="user" control={form.control}/>
     <CustomFormField fieldType={FormFieldType.INPUT} name="email" label="email" placeholder="johndoe@gmail.com" iconSrc="/assets/icons/email.svg" iconAlt="email" control={form.control}/>
     <CustomFormField fieldType={FormFieldType.PHONE_INPUT} name="phone" label="phone number" placeholder="1234567890" control={form.control}/>
       */}
      
      <SubmitButton isLoading={isLoading}
      className={`${type==='cancel'?
        'shad-danger-btn':'shad-primary-btn'
      } w-full`}
      >
        {buttonLabel}
      </SubmitButton>
    </form>
  </Form>
  )
}
export default AppointmentForm