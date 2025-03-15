import dotenv from 'dotenv';
import * as sdk from 'node-appwrite';
dotenv.config();
export const{
    NEXT_PUBLIC_PROJECT_ID,NEXT_PUBLIC_API_KEY,NEXT_PUBLIC_DATABASE_ID,NEXT_PUBLIC_PATIENT_COLLECTION_ID,NEXT_PUBLIC_DOCTOR_COLLECTION_ID,
    NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID,
    NEXT_PUBLIC_BUCKET_ID,
    NEXT_PUBLIC_ENDPOINT
}=process.env;
// console.log(process.env.NEXT_PUBLIC_PROJECT_ID,process.env.NEXT_PUBLIC_API_KEY,process.env.NEXT_PUBLIC_DATABASE_ID,process.env.NEXT_PUBLIC_PATIENT_COLLECTION_ID,process.env.NEXT_PUBLIC_DOCTOR_COLLECTION_ID,process.env.NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID,process.env.NEXT_PUBLIC_BUCKET_ID,process.env.NEXT_PUBLIC_ENDPOINT)

const client = new sdk.Client();

client
    .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_PROJECT_ID!)
    .setKey(process.env.NEXT_PUBLIC_API_KEY!);
 
    export const users= new sdk.Users(client);    
 export const databases= new sdk.Databases(client);  
 export const storage= new sdk.Storage(client);
 export const messaging= new sdk.Messaging(client);








// import dotenv from 'dotenv';
// import * as sdk from 'node-appwrite';
// dotenv.config();
// // Extract environment variables
// export const {
//     PROJECT_ID,
//     API_KEY,
//     DATABASE_ID,
//     PATIENT_COLLECTION_ID,
//     DOCTOR_COLLECTION_ID,
//     APPOINTMENT_COLLECTION_ID,
//     NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
//     NEXT_PUBLIC_ENDPOINT: ENDPOINT
// } = process.env;
// console.log({PROJECT_ID,API_KEY,DATABASE_ID,PATIENT_COLLECTION_ID,DOCTOR_COLLECTION_ID,APPOINTMENT_COLLECTION_ID,BUCKET_ID,ENDPOINT})
// if (!PROJECT_ID || !API_KEY || !ENDPOINT) {
//     throw new Error('Missing required environment variables');
//     // console.log('Missing required environment variables');
// }

// // Initialize Appwrite client
// const client = new sdk.Client();

// client
//     .setEndpoint(ENDPOINT)
//     .setProject(PROJECT_ID)
//     .setKey(API_KEY);

// // Initialize Appwrite services
// export const users = new sdk.Users(client);
// export const databases = new sdk.Databases(client);
// export const storage = new sdk.Storage(client);
// export const messaging = new sdk.Messaging(client);

 



