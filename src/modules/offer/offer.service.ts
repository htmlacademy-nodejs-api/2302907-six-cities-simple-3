import {inject, injectable} from 'inversify';
import {OfferServiceInterface} from './offer-service.interface.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {DocumentType, types} from '@typegoose/typegoose';
import {OfferEntity} from './offer.entity.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import mongoose from 'mongoose';


const DEFAULT_OFFERS_COUNT = 60;

@injectable()
export default class OfferService implements OfferServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
  ) {
  }

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'hostID',
            foreignField: '_id',
            as: 'host',
          }
        },
        {
          $lookup: {
            from: 'cities',
            localField: 'cityID',
            foreignField: '_id',
            as: 'city',
          }
        },
        {
          $lookup: {
            from: 'comments',
            localField: '_id',
            foreignField: 'offerID',
            as: 'comments',
          }
        },
        {
          $unset: ['rating', 'hostID', 'cityID']
        },
        {
          $addFields: {
            rating: {
              $max: [{
                $floor: {
                  $divide: [{
                    $multiply: [{
                      $avg: '$comments.rating'
                    }, 10]
                  }, 10]
                }
              }, 0]
            },
            hostName: {$first: '$host.name'},
            cityID: '$city.name'
          }
        },
        {
          $unset: ['comments', 'host', 'city', 'createdAt', 'updatedAt']
        },
      ])
      .exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(offerId)
      .aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'hostID',
            foreignField: '_id',
            as: 'host',
          }
        },
        {
          $lookup: {
            from: 'cities',
            localField: 'cityID',
            foreignField: '_id',
            as: 'city',
          }
        },
        {
          $lookup: {
            from: 'comments',
            localField: '_id',
            foreignField: 'offerID',
            as: 'comments',
          }
        },
        {
          $unset: ['rating', 'hostID', 'cityID']
        },
        {
          $addFields: {
            rating: {
              $max: [{
                $floor: {
                  $divide: [{
                    $multiply: [{
                      $avg: '$comments.rating'
                    }, 10]
                  }, 10]
                }
              }, 0]
            },
            hostName: {$first: '$host.name'},
            cityID: '$city.name'
          }
        },
        {
          $unset: ['comments', 'host', 'city', 'createdAt', 'updatedAt']
        },
      ])
      .exec();
  }

  public async find(cityIdFilter: string, count?: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = count || DEFAULT_OFFERS_COUNT;
    return this.offerModel
      .aggregate([
        {$match: {cityID: new mongoose.Types.ObjectId(cityIdFilter)}},
        {$sort: {createdAt: -1}},
        {$limit: limit},
        {
          $lookup: {
            from: 'users',
            localField: 'hostID',
            foreignField: '_id',
            as: 'host',
          }
        },
        {
          $lookup: {
            from: 'cities',
            localField: 'cityID',
            foreignField: '_id',
            as: 'city',
          }
        },
        {
          $lookup: {
            from: 'comments',
            localField: '_id',
            foreignField: 'offerID',
            as: 'comments',
          }
        },
        {
          $unset: ['rating', 'hostID', 'cityID']
        },
        {
          $addFields: {
            rating: {
              $max: [{
                $floor: {
                  $divide: [{
                    $multiply: [{
                      $avg: '$comments.rating'
                    }, 10]
                  }, 10]
                }
              }, 0]
            },
            hostName: {$first: '$host.name'},
            cityID: '$city.name'
          }
        },
        {
          $unset: ['comments', 'host', 'city', 'createdAt', 'updatedAt']
        },
      ])
      .exec();
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {'$inc': {commentCount: 1}})
      .exec();
  }

  public async exists(offerId: string): Promise<boolean> {
    return (await this.offerModel.exists({_id: offerId})) !== null;
  }

}
