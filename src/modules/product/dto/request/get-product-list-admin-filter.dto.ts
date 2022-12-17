import * as Joi from 'joi'
import { objectIdPattern } from '@/common/validators'

enum SortBy {
	_id = '_id',
	name = 'name',
	originalPrice = 'originalPrice',
	updatedAt = 'updatedAt',
	saleOfWeek = 'saleOfWeek',
	changedAmount = 'changedAmount',
	categoryName = 'categoryName',
}

export enum SortOrder {
	ASC = 'asc',
	DESC = 'desc',
}

export class GetProductListAdminFilterDto {
	keyword?: string
	category?: string
	sortBy?: SortBy
	sortOrder?: SortOrder
}

export const GetProductListAdminFilterDtoSchema =
	Joi.object<GetProductListAdminFilterDto>({
		keyword: Joi.string().min(1).optional(),
		category: Joi.string().pattern(objectIdPattern).optional(),
		sortBy: Joi.string()
			.valid(...Object.values(SortBy))
			.optional(),
		sortOrder: Joi.string()
			.valid(...Object.values(SortOrder))
			.optional(),
	})
