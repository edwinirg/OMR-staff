import { Controller, Inject, Type } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Model } from 'sequelize-typescript';
import { FindOnePopulateDTO } from '../dto/find-one-populate.dto';
import { IUpdate } from '../interfaces/update.interface';



interface IService<TCreate, TFind, TUpdate, M> {
  create(data: TCreate): Promise<Model<TCreate, TCreate>>;
  findAll(query: TFind): Promise<{ rows: M[], count: number, skip?: number, limit?: number }>;
  findOne(data: FindOnePopulateDTO): Promise<M>;
  update(data: TUpdate): Promise<Model<TUpdate, TUpdate>>;
  remove(id: string): Promise<number>
}

export interface IController<TCreate, TFind, TUpdate, M> {
  create(data: TCreate): Promise<Model<TCreate, TCreate>>;
  findAll(query: TFind): Promise<{ rows: M[], count: number, skip?: number, limit?: number }>;
  findOne(data: FindOnePopulateDTO): Promise<M>;
  update(data: TUpdate): Promise<Model<any, any>>;
  remove(id: string): Promise<number>
}

type ClassType<T> = new (...args: any[]) => T;

export function BaseController<TCreate, TFind, TUpdate extends IUpdate, Model>(
  service: Type<IService<TCreate, TFind, TUpdate, Model>>,
  prefix: string
): ClassType<IController<TCreate, TFind, TUpdate, Model>> {
  @Controller()
  class BaseControllerHost<TCreate, TFind, TUpdate extends IUpdate> implements IController<TCreate, TFind, TUpdate, Model> {
    constructor(@Inject(service) private readonly service: IService<TCreate, TFind, TUpdate, Model>) { }

    @MessagePattern(`create${prefix}`)
    create(@Payload() data: TCreate) {
      return this.service.create(data);
    }

    @MessagePattern(`findAll${prefix}`)
    findAll(@Payload() query: TFind) {
      return this.service.findAll(query);
    }

    @MessagePattern(`findOne${prefix}`)
    findOne(@Payload() data: FindOnePopulateDTO) {
      return this.service.findOne(data);
    }

    @MessagePattern(`update${prefix}`)
    update(@Payload() data: TUpdate) {
      return this.service.update(data);
    }

    @MessagePattern(`remove${prefix}`)
    remove(@Payload() id: string) {
      return this.service.remove(id);
    }
  }
  return BaseControllerHost;
}
