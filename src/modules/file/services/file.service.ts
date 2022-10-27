import { Injectable } from '@nestjs/common'
import { Types } from 'mongoose'
import { GridFsConfigService } from './grid-fs-config.service'
import { GridFSFile } from 'mongodb'
import { Response } from 'express'
import { NotFoundImageException } from '@/common/exceptions/http'

class ObjectId extends Types.ObjectId {}

@Injectable()
export class FileService {
	constructor(private gridFsConfigService: GridFsConfigService) {}

	async getOne(fileId: string | ObjectId): Promise<GridFSFile> {
		try {
			fileId = new ObjectId(fileId)
			const files = await this.gridFsConfigService.bucket
				.find({ _id: fileId })
				.toArray()
			if (files.length === 0 || !files[0]) return null
			return files[0]
		} catch (err) {
			throw err
		}
	}

	async getMany(fileIds: Array<string | ObjectId>): Promise<GridFSFile[]> {
		try {
			const files = await Promise.all(
				fileIds.map(fileId =>
					this.gridFsConfigService.bucket
						.find({ _id: new ObjectId(fileId) })
						.toArray()
				)
			)
			return files.map(file => file[0] ?? null)
		} catch (err) {
			throw err
		}
	}

	async render(fileId: string | ObjectId, response: Response) {
		try {
			const file = await this.getOne(fileId)
			if (!file) throw new NotFoundImageException()
			response.set({ 'Content-Type': file.contentType })
			return this.gridFsConfigService.bucket
				.openDownloadStream(new Types.ObjectId(fileId))
				.pipe(response)
		} catch (err) {
			throw err
		}
	}

	async deleteOne(fileId: string | ObjectId): Promise<true> {
		try {
			await this.gridFsConfigService.bucket.delete(new ObjectId(fileId))
			return true
		} catch (err) {
			throw err
		}
	}

	async deleteMany(fileIds: Array<string | ObjectId>): Promise<true> {
		try {
			await Promise.all(
				fileIds.map(fileId =>
					this.gridFsConfigService.bucket.delete(new ObjectId(fileId))
				)
			)
			return true
		} catch (err) {
			throw err
		}
	}
}
