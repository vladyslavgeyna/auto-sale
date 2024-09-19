export const getPrettyPhoneNumber = (phoneNumber: string) => {
  let input = phoneNumber.replace(/\D/g, "");

  if (input.length > 3 && input.length <= 6)
    input = input.replace(/(\d{3})(\d{1,3})/, "$1 $2");
  else if (input.length > 6)
    input = input.replace(/(\d{3})(\d{3})(\d{1,4})/, "$1 $2 $3");

  return input;
};
