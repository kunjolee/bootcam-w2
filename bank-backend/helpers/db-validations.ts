import { User } from "../models"

export const existUserEmail = async ( email: string ) => {

    const existEmail = await User.findOne({
        where: {
            email
        }
    });

    if (existEmail) return Promise.reject( `${ email } already exist` );
}

export const existUserName = async ( username: string) => {
    const existUser = await User.findOne({
        where: {
            username
        }
    })

    if (existUser) return Promise.reject(`${ username } already exist`)
}

export const existUserById = async ( id: string ) => {

    const existUser = await User.findByPk( id );


    if (!existUser) return Promise.reject(`There is no user with ${ id } ID`);
}