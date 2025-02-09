import { Schema , model , models } from 'mongoose';

const UserSchema =  new Schema({
  clerkId: {
  type: String, // Unique identifier from Clerk
  required: true,
  unique: true
  // role: 'admin' | 'student'; 
},
email: {
  type: String,
  required: true,
  unique: true,
},
username: {
  type: String,
  required: true,
},
photo: {
  type: String,
  required: true,
},
firstName: {
  type: String,
},
lastName: {
  type: String,
},
});

// Utility function to get the User collection
const User = models?.User || model("User",UserSchema);

export default User