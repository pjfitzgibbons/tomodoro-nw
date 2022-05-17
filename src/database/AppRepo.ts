import Datastore from '@seald-io/nedb'
import { map } from 'lodash'
import { NotDefinedError } from './entities/EntityBase'


abstract class AppRepo {

    abstract db:Datastore

    datastoreOpts = (name:string, additionalOpts:any = {}) => {
        return {
            filename: name, 
            autoload: true, 
            timestampData: true,
            ...additionalOpts
        }
    }

    datastore = (_:string):Datastore => { throw new NotDefinedError() }

    insert = async (newDoc:any) => {
        return this.db.insertAsync(this.serialize(newDoc))
    }

    update = async (query:any, update:any, options?:Datastore.UpdateOptions|undefined ) => {
        return this.db.updateAsync(query, this.serialize(update), options)
    }

    updateDoc = async (doc:any) => {
        return await this.db.updateAsync({_id: doc._id}, doc, {returnUpdatedDocs: true})
    }

    find = async (query?:any, projection?:any) => {
        return this.db.findAsync(query, projection)
    }

    typedMap = async (cursor: Datastore.Cursor<any>) => {
        return map(await cursor, (data:any) => this.deserialize(data))
    }

    findOne = async (query:any, projection?:any) => {
        return this.db.findOneAsync(query, projection)
    }


    bindValue = (_:any):any => { throw new NotDefinedError() }

    serialize = (docOrQuery:any):any => {
        return Object.assign({}, { ...docOrQuery, _innerObj: undefined } )
    }
    
    deserialize = (value:any):any => { 
        console.log("deserialize", value)   
        return value
    }
}

export default AppRepo
