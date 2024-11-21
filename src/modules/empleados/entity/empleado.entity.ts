import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  indexes: [],
  paranoid: true,
})
  
export class Empleado extends Model<Empleado>{
  
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true
  })
  _id: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nombre: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  apellido_paterno: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  apellido_materno: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  curp: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  telefono: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  correo: string;
}
