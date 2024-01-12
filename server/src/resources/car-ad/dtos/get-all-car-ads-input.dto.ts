export interface GetAllCarAdsInputDto {
	carBrandId?: string
	carModelId?: string
	region?: string
	yearFrom?: string
	yearTo?: string
	priceFrom?: string
	priceTo?: string
	orderBy?: string
	limit?: string
	page?: string
}
