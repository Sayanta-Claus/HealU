// import PatientForm from '@/components/forms/PatientForm';
import AppointmentForm from '@/components/forms/AppointmentForm';
import { getPatient } from '@/lib/actions/patient.actions';
import Image from 'next/image';
// import Link from 'next/link';
export default async function NewAppointment({params:{userId}}:SearchParamProps) {
  const patient= await getPatient(userId);
    return (
   <div className="flex h-screen max-h-screen">
    {/*  OTP verification */}
    <section className="remove-scrollbar container my-auto">
      <div className="sub-container max-w-[860px] flex-1 justify-between">
        <Image
        src="/assets/icons/logo-full-change.svg"
        height={1000}
        width={1000}
        alt="HealU Logo"
        className="mb-12 h-10 w-fit"
        />


        <AppointmentForm
        type="create"
        userId={userId}
        patientId={patient.$id}
        />
        
          <p className='copyright mt-10 py-12'>
          © 2025 HealU. All rights reserved.
          </p>
          
        
        

      </div>

    </section>


    <Image src="/assets/images/appointment-img.png"
    height={1000}
    width={1000}
    alt="apppointment"
    className='side-img max-w-[390px] bg-bottom'
    />
   </div>
  );
}
