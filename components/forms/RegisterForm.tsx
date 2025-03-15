"use client"
 import { useState } from 'react';
// import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
} from "@/components/ui/form";
import { Doctors, GenderOptions, IdentificationTypes, PatientFormDefaultValues } from '@/constants';
import { registerPatient } from "@/lib/actions/patient.actions";
import { PatientFormValidation } from '@/lib/validation';
import { zodResolver } from "@hookform/resolvers/zod";
// import { RadioGroupIndicator } from '@radix-ui/react-radio-group';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomFormField from "../CustomFormField";
import FileUploader from '../FileUploader';
import SubmitButton from "../SubmitButton";
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { SelectItem } from '../ui/select';
import { FormFieldType } from './PatientForm';



 
const RegisterForm=({user}:{user:User})=> {
  const router = useRouter()
  // 1. Define your form.
  const [isLoading, setIsLoading] = useState(false)


  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
        ...PatientFormDefaultValues,
      name: "",
      email: "",
      phone: "",
    },
  })
 
  // 2. Define a submit handler.
  const onSubmit=async(values: z.infer<typeof PatientFormValidation>)=> {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log("HEY");
    setIsLoading(true);

    let formData;

    if(values.identificationDocument && values.identificationDocument.length>0){
        const blobFile=new Blob([values.identificationDocument[0]],{type:values.identificationDocument[0].type});
        formData=new FormData();
        formData.append('blobfile',blobFile);
        formData.append('filename',values.identificationDocument[0].name)
    }   
    try{
      const patientData={
        ...values,
        userId:user.$id,
        birthDate:new Date(values.birthDate),
        identificationDocument:formData,

      }
      //@ts-ignore
      const patient=await registerPatient(patientData);
      if(patient){
        router.push(`/patients/${user.$id}/new-appointment`)
      }
    }catch(error){
      console.log(error);
    }
    setIsLoading(false);
    // console.log(values)
  }
  return(
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
      <section className=" space-y-4">
                <h1 className="header">Welcome</h1>
                <p className="text-dark-700">Tell us more about yourself</p>
      </section>
      <section className=" space-y-6">
                {/* <h1 className="header">Welcome</h1> */}
                <div className='mb-9 space-y-1'>
                <h2 className="sub-header">Personal Information</h2>

                </div>
      </section>
     <CustomFormField fieldType={FormFieldType.INPUT} name="name" label="Full name" placeholder="John Doe" iconSrc="/assets/icons/user.svg" iconAlt="user" control={form.control}/>
     {/* <CustomFormField fieldType={FormFieldType.INPUT} name="email" label="email" placeholder="johndoe@gmail.com" iconSrc="/assets/icons/email.svg" iconAlt="email" control={form.control}/>
     <CustomFormField fieldType={FormFieldType.PHONE_INPUT} name="phone" label="phone number" placeholder="1234567890" control={form.control}/> */}
      <div className='flex flex-col gap-6 xl:flex-row'>
      <CustomFormField fieldType={FormFieldType.INPUT} name="email" label="Email" placeholder="johndoe@gmail.com" iconSrc="/assets/icons/email.svg" iconAlt="email" control={form.control}/>
      <CustomFormField fieldType={FormFieldType.PHONE_INPUT} name="phone" label="Phone Number" placeholder="1234567890" control={form.control}/>
      </div>
      <div className='flex flex-col gap-6 xl:flex-row'>
      <CustomFormField fieldType={FormFieldType.DATE_PICKER} name="birthDate" label="Date of Birth" control={form.control}/>
      <CustomFormField fieldType={FormFieldType.SKELETON} name="gender" label="Gender" control={form.control}
      renderSkeleton={(field)=>(
        <FormControl>
            <RadioGroup className='flex h-11 gap-6 xl:justify-between'
            onValueChange={field.onChange}
            defaultValue={field.value}>
                {GenderOptions.map((option)=>(<div key={option}
                className='radio-group'>
                    <RadioGroupItem 
                    value={option}
                    id={option}
                    />
                    <Label htmlFor={option}
                    className="cursor-pointer">
                        {option}
                    </Label>
                    
                </div>))}
            </RadioGroup>
        </FormControl>
  )}
      />
      </div>
       
      <div className='flex flex-col gap-6 xl:flex-row'>
      <CustomFormField fieldType={FormFieldType.INPUT} name="address" label="Address" placeholder="14th Street, Kolkata" control={form.control}/>
      <CustomFormField fieldType={FormFieldType.INPUT} name="occupation" label="Occupation" placeholder="Software Engineer" control={form.control}/>
      </div>

      <div className='flex flex-col gap-6 xl:flex-row'>
      <CustomFormField fieldType={FormFieldType.INPUT} name="emergencyContactName" label="Emergency Contact Name" placeholder="Guardian's Name" control={form.control}/>
      <CustomFormField fieldType={FormFieldType.PHONE_INPUT} name="emergencyContactNumber" label="Emergency Contact Number" placeholder="1234567890" control={form.control}/>
      </div>
      
      <section className=" space-y-6">
                <div className='mb-9 space-y-1'>
                <h2 className="sub-header">Medical Information</h2>
                </div>
      </section> 
      
      <CustomFormField fieldType={FormFieldType.SELECT} name="primaryPhysician" label="Primary Physician" placeholder="Select a physician" control={form.control}>
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
      <div className='flex flex-col gap-6 xl:flex-row'>
      <CustomFormField fieldType={FormFieldType.INPUT} name="insuranceProvider" label="Insurance Provider" placeholder="LIC" control={form.control}/>
      <CustomFormField fieldType={FormFieldType.INPUT} name="insurancePolicyNumber" label="Insurance Policy Number" placeholder="xyz12345678" control={form.control}/>
      </div>

      <div className='flex flex-col gap-6 xl:flex-row'>
      <CustomFormField fieldType={FormFieldType.TEXTAREA} name="allergies" label="Allergies" placeholder="Brinjal, shrimp etc..." control={form.control}/>
      <CustomFormField fieldType={FormFieldType.TEXTAREA} name="currentMedication" label="Current Medication(if any)" placeholder="Paracetamol 600mg, etc" control={form.control}/>
      </div>


      <div className='flex flex-col gap-6 xl:flex-row'>
      <CustomFormField fieldType={FormFieldType.TEXTAREA} name="familyMedicalHistory" label="Family Medical History" placeholder="Father had ..." control={form.control}/>
      <CustomFormField fieldType={FormFieldType.TEXTAREA} name="pastMedicalHistory" label="Past Medical History" placeholder="Cancer..." control={form.control}/>
      </div>


      <section className=" space-y-6">
                <div className='mb-9 space-y-1'>
                <h2 className="sub-header">Identification and Verification</h2>
                </div>
      </section> 

      <CustomFormField fieldType={FormFieldType.SELECT} name="identificationType" label="Identification Type" placeholder="Select an identification type" control={form.control}>
        {IdentificationTypes.map((type)=>(
            <SelectItem key={type}
            value={type}>
                    {type}
                </SelectItem>
                
        ))}
      </CustomFormField>

      <CustomFormField fieldType={FormFieldType.INPUT} name="identificationNumber" label="Identification Number" placeholder="8888444422" control={form.control}/>

      <CustomFormField fieldType={FormFieldType.SKELETON} name="identificationDocument" label="Scanned copy of Identification Document" control={form.control}
      renderSkeleton={(field)=>(
        <FormControl>
            <FileUploader files={field.value}
            onChange={field.onChange}/>
        </FormControl>
  )}
      />




<section className=" space-y-6">
                <div className='mb-9 space-y-1'>
                <h2 className="sub-header">Consent and Privacy</h2>
                </div>
      </section> 

      <CustomFormField fieldType={FormFieldType.CHECKBOX} name="treatmentConsent" label="I agree to the terms and conditions of treatment" control={form.control}/>

       <CustomFormField fieldType={FormFieldType.CHECKBOX} name="disclosureConsent" label="I agree to the terms and conditions of disclosure" control={form.control}/>

        <CustomFormField fieldType={FormFieldType.CHECKBOX} name="privacyConsent" label="I agree to the terms and conditions of privacy policy" control={form.control}/>  

        
      <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
    </form>
  </Form>
  )
}
export default RegisterForm