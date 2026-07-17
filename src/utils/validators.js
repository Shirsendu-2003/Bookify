/* ====================================== */
/* REGEX */
/* ====================================== */

const EMAIL_REGEX =

  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PHONE_REGEX =

  /^[6-9]\d{9}$/;

const PASSWORD_REGEX =

  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

/* ====================================== */
/* BASIC VALIDATORS */
/* ====================================== */

export const isRequired =

  (value)=>{

    if(

      value === null ||

      value === undefined ||

      value === ""

    ){

      return false;

    }

    return true;

  };

export const validateEmail =

  (email)=>{

    if(!email){

      return
      "Email is required";

    }

    return EMAIL_REGEX
      .test(email)

      ? null

      : "Invalid email address";

  };

export const validatePhone =

  (phone)=>{

    if(!phone){

      return
      "Phone number required";

    }

    return PHONE_REGEX
      .test(phone)

      ? null

      : "Invalid phone number";

  };

export const validatePassword =

  (password)=>{

    if(!password){

      return
      "Password required";

    }

    if(

      !PASSWORD_REGEX
      .test(password)

    ){

      return `

Password must contain:

• 8+ characters
• uppercase
• lowercase
• number

`;

    }

    return null;

  };

export const validateName =

  (name)=>{

    if(!name){

      return
      "Name required";

    }

    if(

      name.trim().length < 2

    ){

      return
      "Name too short";

    }

    return null;

  };

/* ====================================== */
/* AUTH VALIDATION */
/* ====================================== */

export function validateLogin(

  values

){

  const errors = {};

  const emailError =

    validateEmail(
      values.email
    );

  if(emailError){

    errors.email =
      emailError;

  }

  if(

    !values.password

  ){

    errors.password =
      "Password required";

  }

  return errors;

}

export function validateRegister(

  values

){

  const errors = {};

  const nameError =
    validateName(
      values.name
    );

  const emailError =
    validateEmail(
      values.email
    );

  const passwordError =
    validatePassword(
      values.password
    );

  if(nameError){

    errors.name =
      nameError;

  }

  if(emailError){

    errors.email =
      emailError;

  }

  if(passwordError){

    errors.password =
      passwordError;

  }

  if(

    values.password !==
    values.confirmPassword

  ){

    errors.confirmPassword =

      "Passwords do not match";

  }

  return errors;

}

/* ====================================== */
/* BOOKING VALIDATION */
/* ====================================== */

export function validateBooking(

  values

){

  const errors = {};

  if(

    !values.service

  ){

    errors.service =
      "Service required";

  }

  if(

    !values.date

  ){

    errors.date =
      "Date required";

  }

  if(

    !values.time

  ){

    errors.time =
      "Time required";

  }

  if(

    !values.address

  ){

    errors.address =
      "Address required";

  }

  return errors;

}

/* ====================================== */
/* PAYMENT VALIDATION */
/* ====================================== */

export function validatePayment(

  values

){

  const errors = {};

  if(

    !values.amount ||

    Number(
      values.amount
    ) <= 0

  ){

    errors.amount =

      "Invalid amount";

  }

  if(

    !values.method

  ){

    errors.method =

      "Payment method required";

  }

  return errors;

}

/* ====================================== */
/* HELPER */
/* ====================================== */

export const hasErrors =

  (errors)=>{

    return Object.keys(
      errors
    ).length > 0;

  };