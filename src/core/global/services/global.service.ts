import { Model, ModelCtor } from "sequelize-typescript";
import { FindAndCountOptions, Attributes } from "sequelize";
import getQuery, { cleanKeys, getConditions, getIncludes, getPaggination, getSearch } from "src/libs/queries";
import { NotFoundException } from "@nestjs/common";
import { FindOnePopulateDTO } from "../dto/find-one-populate.dto";
import { IUpdate } from "../interfaces/update.interface";

export interface IBaseService<M, TCreate, TFind, TUpdate> {
  create(data: TCreate): Promise<Model<TCreate, TCreate>>;
  findAll(query: TFind): Promise<{ rows: M[], count: number, skip?: number, limit?: number }>;
  findOne(data: FindOnePopulateDTO): Promise<M>;
  update(data: TUpdate): Promise<Model<any, any>>;
  remove(_id: string | number): Promise<number>
};

export class BaseService<M extends Model, TCreate, TFind, TUpdate extends IUpdate> implements IBaseService<M, TCreate, TFind, TUpdate> {
  protected Model!: ModelCtor<M>;
  protected table_name: string;
  constructor(Model: ModelCtor<M>, table_name: string) {
    this.Model = Model;
    this.table_name = table_name
  }

  async create(data: TCreate) {
    const newRecord = this.Model.build<Model<TCreate>>(data as any);
    await newRecord.validate();
    await newRecord.save();
    await newRecord.reload();
    return newRecord
  }

  async findAll(query: TFind) {
    const paggination = getPaggination(query)
    const querySequelice: Omit<FindAndCountOptions<Attributes<M>>, 'group'> = {};
    getConditions(query, querySequelice);
    const includes = getIncludes(query)
    getSearch(query, querySequelice, this.table_name)
    const data = await this.Model.findAndCountAll<M>(getQuery(query, querySequelice, paggination, includes));
    return { ...paggination, ...data }
  }

  findOne({ _id, paranoid, populate, rows }: FindOnePopulateDTO) {
    const include = getIncludes({ populate, rows });
    const attributes = rows ? cleanKeys(rows).split(",").filter(row => !row.includes('.')) : undefined;
    return this.Model.findByPk<M>(_id, { ...include, paranoid, attributes });
  }

  async update({ _id, data }: TUpdate) {
    const [affectedRows, rows] = await this.Model.update<Model<any, any>>(data, { where: { _id } as any, returning: true })
    if (affectedRows === 0) {
      throw new NotFoundException('Registro no encontrado')
    }
    return rows[0]
  }

  remove(_id: string | number) {
    return this.Model.destroy<Model<{ _id: string }>>({ where: { _id }, individualHooks: true });
  }


}
