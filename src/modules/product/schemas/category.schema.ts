import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import SlugGenerator from 'mongoose-slug-generator'

@Schema({ versionKey: false, _id: false })
export class Category {
	@Prop({ type: String })
	image: string

	@Prop({ type: String, required: true })
	name: string

	@Prop({ type: String, slug: 'name', unique: true })
	slug: string
}

export const CategorySchema = SchemaFactory.createForClass(Category)

CategorySchema.plugin(SlugGenerator)
