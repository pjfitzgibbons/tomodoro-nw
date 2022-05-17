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

    datastore = ():Datastore => { throw new NotDefinedError() }

    insert = async (newDoc:any) => {
        return this.db.insert(this.serialize(newDoc))
    }

    update = async (query:any, update:any, options?:Datastore.UpdateOptions|undefined ) => {
        return this.db.updateAsync(query, this.serialize(update), options)
    }

    updateDoc = async (doc:any) => {
        return this.db.update({id: doc.id}, {...doc, _innerObj: undefined}, {returnUpdatedDocs: true})
    }

    find = async (query?:any, projection?:any) => {
        return this.db.findAsync(query, projection)
    }

    typedMap = async (cursor: Datastore.Cursor<any>) => {
        return map(await cursor, (data:any) => this.deserialize(data))
    }

    findOne = async (query:any, projection?:any) => {
        const result = await this.db.findOneAsync(query, projection)
        return this.deserialize(result)
    }


    bindValue = (_:any):any => { throw new NotDefinedError() }

    serialize = (docOrQuery:any):any => {
        return Object.assign({}, { ...docOrQuery, _innerObj: undefined } )
    }
    
    deserialize = (value:any):any => value
}

export default AppRepo
