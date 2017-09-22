import {Table, Model, PrimaryKey, Column, DataType, AutoIncrement, HasOne, DefaultScope, Scopes} from 'sequelize-typescript'
import Profile from './Profile'

@DefaultScope({
  attributes: ['id', 'email']
})

@Scopes({
  full: {
    include: [
      () => User,
      () => Profile
    ]
  }
})

@Table
export default class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id: number

  @Column({ type: DataType.STRING })
  email: string

  @Column({ type: DataType.STRING })
  encrypted_password: string

  @HasOne(() => Profile, 'user_id')
  profile: Profile
}
