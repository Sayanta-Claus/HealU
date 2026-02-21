<div align="center">
<br/>
<a href="https://heal-u-pi.vercel.app/"  target="_blank">
    <img src="/public/assets/icons/logo-full-change.svg" alt="project logo">
</a>
<div>
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextdotjs" />
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/-Appwrite-black?style=for-the-badge&logoColor=white&logo=appwrite&color=FD366E" alt="appwrite" />
  </div>

  <h3 align="center"> Patient Management Healthcare Application</h3>
</div>

## <a name="introduction">Introduction</a>

This is a healthcare patient management application which allows patients to easily register and manage their appointments with specific doctors. It has tools for scheduling, confirming and cancelling appointments, through SMS notifications all built in NEXT.js.

## <a name="tech-stack">Tech Stack</a>

- Next.js
- Appwrite
- Typescript
- TailwindCSS
- ShadCN
- Twilio

## <a name="features"> Features</a>

-> **Register as a Patient**: Users can create a profile as a patient.

-> **Book a New Appointment with Doctor**: Patients can schedule appointments with doctors at their convenience and can book multiple appointments.

-> **Manage Appointments on Admin Side**: Administrator can view and handle all scheduled appointments.

-> **Confirm,Schedule and Cancel Appointment from Admin Side**: Admins can confirm and set appointment times to ensure they are properly scheduled and have the ability to cancel them with proper reasons.

-> **SMS on Appointment Confirmation**: Patients receive SMS notifications to confirm their appointment details.

-> **File Upload Using Appwrite Storage**: Patients can upload and store documents securely within the app using Appwrite storage services.

-> **Manage and Track Application Performance Using Sentry**: The application uses Sentry to monitor and track its performance and detect any errors.

## Getting Started

Follow these steps to set up the project locally on your device.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/Sayanta-Claus/HealU.git
cd healthcare
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env.local` in the root of your project and add the following content:

```env
#APPWRITE
NEXT_PUBLIC_ENDPOINT=https://cloud.appwrite.io/v1
PROJECT_ID=
API_KEY=
DATABASE_ID=
PATIENT_COLLECTION_ID=
APPOINTMENT_COLLECTION_ID=
NEXT_PUBLIC_BUCKET_ID=
NEXT_PUBLIC_ADMIN_PASSKEY=
```

Fill the values with your actual Appwrite credentials. You can obtain these by signing up on the [Appwrite website](https://appwrite.io/).

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

## Additional Features to add

1. **Patient Dashboard**

2. **Authentication for patients**

3. **Doctor Dashbaord**
