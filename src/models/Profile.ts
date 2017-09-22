import { Model, Table, PrimaryKey, AutoIncrement, Column, BelongsTo, DefaultScope, DataType } from 'sequelize-typescript'
import User from './User'

@DefaultScope({
  include: [{
    model: () => User,
    through: {attributes: []}
  }]
})

@Table
export default class Profile extends Model<Profile> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number

  @Column({ type: DataType.STRING })
  first_name: string

  @Column({ type: DataType.STRING })
  last_name: string

  @BelongsTo(() => User, 'user_id')
  user: User
}
