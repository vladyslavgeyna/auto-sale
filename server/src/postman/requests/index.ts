import { getCarAdById } from "./get-car-ad-by-id";
import { getCarAdsRequest } from "./get-car-ads";
import { getCarBrandsRequest } from "./get-car-brands";
import { getCarModelsByCarBrandIdRequest } from "./get-car-models-by-car-brand-id";
import { loginRequest } from "./login";
import { registerRequest } from "./register";

export const requests = [
  getCarAdsRequest,
  getCarBrandsRequest,
  getCarModelsByCarBrandIdRequest,
  getCarAdById,
  loginRequest,
  registerRequest,
];
