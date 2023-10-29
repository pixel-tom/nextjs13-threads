import mongoose from "mongoose";

export interface CourseType {
  id: string;
  name: string;
  description: string;
  languages: string;
  // ... any other properties based on your schema
}

const courseSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name:{
    type: String,
    required: true,
  },
  languages:{
    type: String,
    required: true,
  },
  
  description:{
    type: String,
    required: true,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ]
});

const Course = 
mongoose.models.Course || mongoose.model("Course", courseSchema);

export default Course;

