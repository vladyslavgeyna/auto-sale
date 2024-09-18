export const PHONE_NUMBER_REGEX =
  /^(050|066|095|099|063|073|093|067|068|096|097|098|091|092|094)\s\d{3}\s\d{2}\d{2}$/; // with 2 spaces

export const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

export const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const ACCEPT_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const MAX_FILE_SIZE = 1024 * 1024 * 5;
