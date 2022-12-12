import { IUser } from "../interfaces"
import bcrypt from 'bcryptjs';

interface UserSeed extends Omit<IUser, 'id' | 'state'> {}


const KunjoUser:UserSeed = {
    name: 'Kunjo Lee',
    username: 'klee',
    email: 'kunjo@gmail.com',
    pass: bcrypt.hashSync('1234'),
    address: '12 av',
    phone: '12345678',
    birthdate: '20030428',
}

const JonatanUser: UserSeed = {
    name: 'Jonatan Lee',
    username: 'jona29',
    email: 'jonatan@gmail.com',
    pass: bcrypt.hashSync('1234'),
    address: 'zona 10 residencias',
    phone: '12345678',
    birthdate: '20030428',
}

const BrandonUser: UserSeed = {
    name: 'Brandon Lee',
    username: 'kgamer',
    email: 'brandon@gmail.com',
    pass: bcrypt.hashSync('1234'),
    address: '12 av zona 5',
    phone: '12345678',
    birthdate: '20021204',
}

const jennerUser: UserSeed = {
    name: 'Jenner romero',
    username: 'jr',
    email: 'jenner@gmail.com',
    pass: bcrypt.hashSync('1234'),
    address: '1 calle zona 4',
    phone: '12345678',
    birthdate: '20021204',
}

interface SeedData {
    users: UserSeed[]
}

export const seeData:SeedData = {
    users:  [
        KunjoUser, 
        JonatanUser, 
        BrandonUser,
        jennerUser
    ]
}
