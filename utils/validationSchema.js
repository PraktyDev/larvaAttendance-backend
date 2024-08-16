export const adminValidationSchema = {
    image: {
        isString:{
            errorMessage: "image must be a string!"
        },
    },
    publicId: {
        isString:{
            errorMessage: "publicId must be a string!"
        },
    },
    name: {
        notEmpty:{
            errorMessage: "name cannot be empty!"
        },
        isString:{
            errorMessage: "name must be a string!"
        },
    },
    email: {
        isEmail: true,
        notEmpty:{
            errorMessage: "email cannot be empty!"
        },
    },
    password: {
        notEmpty:{
            errorMessage: "password cannot be empty!"
        },
        isString:{
            errorMessage: "password must be a string!"
        },
        isLength:{
            options:{
                min: 5,
                max: 25,
            },
            errorMessage: "password must be at least 5 characters and not greater than 25 characters"
        },
    },
    post: {
        notEmpty:{
            errorMessage: "post cannot be empty!"
        },
        isString:{
            errorMessage: "post must be a string!"
        },
    },
}

export const attendanceValidationSchema = {
    date: {
        notEmpty:{
            errorMessage: "date cannot be empty!"
        },
        isDate:{
            errorMessage: "date must be a date!"
        },
    },
    status: {
        notEmpty:{
            errorMessage: "status cannot be empty!"
        },
        isString:{
            errorMessage: "status must be a string!"
        },
    },
}

export const studentValidationSchema = {
    image: {
        isString:{
            errorMessage: "image must be a string!"
        },
    },
    publicId: {
        isString:{
            errorMessage: "publicId must be a string!"
        },
    },
    name: {
        notEmpty:{
            errorMessage: "name cannot be empty!"
        },
        isString:{
            errorMessage: "name must be a string!"
        },
    },
    studentNumber: {
        isInt: true,
        notEmpty:{
            errorMessage: "student number cannot be empty!"
        },
    },
    course: {
        notEmpty:{
            errorMessage: "course cannot be empty!"
        },
        isString:{
            errorMessage: "course must be a string!"
        },
    },
    cohort: {
        notEmpty:{
            errorMessage: "cohort cannot be empty!"
        },
        isString:{
            errorMessage: "cohort must be a string!"
        },
    },
}

export const tutorValidationSchema = {
    image: {
        isString:{
            errorMessage: "image must be a string!"
        },
    },
    publicId: {
        isString:{
            errorMessage: "publicId must be a string!"
        },
    },
    name: {
        notEmpty:{
            errorMessage: "name cannot be empty!"
        },
        isString:{
            errorMessage: "name must be a string!"
        },
    },
    email: {
        isEmail: true,
        notEmpty:{
            errorMessage: "email cannot be empty!"
        },
    },
    password: {
        notEmpty:{
            errorMessage: "password cannot be empty!"
        },
        isString:{
            errorMessage: "password must be a string!"
        },
        isLength:{
            options:{
                min: 5,
                max: 25,
            },
            errorMessage: "password must be at least 5 characters and not greater than 25 characters"
        },
    },
    course: {
        notEmpty:{
            errorMessage: "course cannot be empty!"
        },
        isString:{
            errorMessage: "course must be a string!"
        },
    },
}