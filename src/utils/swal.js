import Swal from "sweetalert2";

import {
  ALERT_TIMER,
} from "./constants";

/* ====================================== */
/* BASE CONFIG */
/* ====================================== */

const baseConfig = {

  confirmButtonColor:
    "#2563eb",

  cancelButtonColor:
    "#dc2626",

  reverseButtons:true,

};

/* ====================================== */
/* SUCCESS */
/* ====================================== */

export async function showSuccess(

  title="Success",

  text="Operation completed."

){

  return Swal.fire({

    ...baseConfig,

    icon:"success",

    title,

    text,

    confirmButtonText: "OK",

    timer:
      ALERT_TIMER.SUCCESS,

    showConfirmButton:
      false,

  });

}

/* ====================================== */
/* ERROR */
/* ====================================== */

export async function showError(

  title="Error",

  text="Something went wrong."

){

  return Swal.fire({

    ...baseConfig,

    icon:"error",

    title,

    text,

    timer:
      ALERT_TIMER.ERROR,

  });

}

/* ====================================== */
/* WARNING */
/* ====================================== */

export async function showWarning(

  title="Warning",

  text="Please review."

){

  return Swal.fire({

    ...baseConfig,

    icon:"warning",

    title,

    text,

  });

}

/* ====================================== */
/* CONFIRM */
/* ====================================== */

export async function showConfirm({

  title="Are you sure?",

  text="You won't be able to undo this.",

  confirmText="Confirm",

  cancelText="Cancel",

}){

  return Swal.fire({

    ...baseConfig,

    icon:"question",

    title,

    text,

    showCancelButton:true,

    confirmButtonText:
      confirmText,

    cancelButtonText:
      cancelText,

  });

}

/* ====================================== */
/* DELETE */
/* ====================================== */

export async function showDeleteConfirm(){

  return showConfirm({

    title:
      "Delete Item?",

    text:
      "This action cannot be reversed.",

    confirmText:
      "Delete",

    cancelText:
      "Keep",

  });

}

/* ====================================== */
/* LOADING */
/* ====================================== */

export function showLoading(

  title="Loading..."

){

  Swal.fire({

    title,

    allowEscapeKey:false,

    allowOutsideClick:false,

    didOpen:()=>{

      Swal.showLoading();

    },

  });

}

/* ====================================== */
/* CLOSE */
/* ====================================== */

export function closeSwal(){

  Swal.close();

}

/* ====================================== */
/* TOAST */
/* ====================================== */

const Toast =
  Swal.mixin({

    toast:true,

    position:
      "top-end",

    showConfirmButton:
      false,

    timer:3000,

    timerProgressBar:true,

  });

export function toastSuccess(

  message

){

  return Toast.fire({

    icon:"success",

    title:message,

  });

}

export function toastError(

  message

){

  return Toast.fire({

    icon:"error",

    title:message,

  });

}

export function toastInfo(

  message

){

  return Toast.fire({

    icon:"info",

    title:message,

  });

}

export function toastWarning(

  message

){

  return Toast.fire({

    icon:"warning",

    title:message,

  });

}