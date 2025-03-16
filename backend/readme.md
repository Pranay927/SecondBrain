Schemas 

signIn 
signUp




user
    - username
    - password

/home -> get all brains


post - > [
    image;
    link
    category : twitter | youtube | resoure | document 
    userId(ref)
    tag
]

user -> delete| update | create a new neuron | search for a <huge post> | get all posts




npm i @types/jsonwebtoken
npm i -D @types/express@4
 npm i @types/bcrypt 


1. await bcrypt.compare(password, user.password); // returns true or false

2. if(!authorization) return res.status(403).json({error: "Unauthorized"})
    try {
            const decode = jwt.verify(authorization , secret); 
        <!-- use  authorization as string if dont want to check is authorization is  undefined -->

    } 




import { v4 as uuidv4 } from "uuid";

const randomLink = uuidv4();
console.log(randomLink);  // Example: "f47ac10b-58cc-4372-a567-0e02b2c3d479"





