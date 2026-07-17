/* ====================================== */
/* CURRENCY */
/* ====================================== */

export function formatCurrency(

  amount,

  currency = "INR",

  locale = "en-IN"

){

  if(

    amount === null ||

    amount === undefined

  ){

    return "₹0";

  }

  return new Intl
    .NumberFormat(

      locale,

      {

        style:"currency",

        currency,

        maximumFractionDigits:0,

      }

    )
    .format(amount);

}

/* ====================================== */
/* NUMBER */
/* ====================================== */

export function formatNumber(

  value,

  locale="en-IN"

){

  if(

    value === null ||

    value === undefined

  ){

    return "0";

  }

  return new Intl
    .NumberFormat(
      locale
    )
    .format(value);

}

/* ====================================== */
/* DATE */
/* ====================================== */

export function formatDate(

  value,

  locale="en-IN"

){

  if(!value){

    return "-";

  }

  return new Date(value)
    .toLocaleDateString(

      locale,

      {

        day:"2-digit",

        month:"short",

        year:"numeric",

      }

    );

}

/* ====================================== */
/* TIME */
/* ====================================== */

export function formatTime(

  value,

  locale="en-IN"

){

  if(!value){

    return "-";

  }

  return new Date(value)
    .toLocaleTimeString(

      locale,

      {

        hour:"2-digit",

        minute:"2-digit",

      }

    );

}

/* ====================================== */
/* DATETIME */
/* ====================================== */

export function formatDateTime(

  value,

  locale="en-IN"

){

  if(!value){

    return "-";

  }

  return new Date(value)
    .toLocaleString(

      locale,

      {

        day:"2-digit",

        month:"short",

        year:"numeric",

        hour:"2-digit",

        minute:"2-digit",

      }

    );

}

/* ====================================== */
/* RELATIVE TIME */
/* ====================================== */

export function formatRelativeTime(

  value

){

  if(!value){

    return "-";

  }

  const seconds =

    Math.floor(

      (
        new Date() -

        new Date(value)

      ) / 1000

    );

  const intervals = {

    year:31536000,

    month:2592000,

    week:604800,

    day:86400,

    hour:3600,

    minute:60,

  };

  for(

    const key in intervals

  ){

    const count =

      Math.floor(

        seconds /
        intervals[key]

      );

    if(count >= 1){

      return `${count} ${key}${
        count > 1
        ? "s"
        : ""
      } ago`;
    }

  }

  return "Just now";

}

/* ====================================== */
/* STRING */
/* ====================================== */

export function capitalize(

  text

){

  if(!text){

    return "";
  }

  return(

    text.charAt(0)
    .toUpperCase()

    +

    text.slice(1)
    .toLowerCase()

  );

}

export function truncate(

  text,

  length = 80

){

  if(!text){

    return "";
  }

  return text.length >
    length

    ? `${text.slice(
        0,
        length
      )}...`

    : text;

}

/* ====================================== */
/* FILE SIZE */
/* ====================================== */

export function formatFileSize(

  bytes

){

  if(!bytes){

    return "0 Bytes";
  }

  const units = [

    "Bytes",

    "KB",

    "MB",

    "GB",

  ];

  let size = bytes;

  let index = 0;

  while(

    size >= 1024 &&

    index <
    units.length-1

  ){

    size /= 1024;

    index++;

  }

  return `${size.toFixed(
    2
  )} ${units[index]}`;

}