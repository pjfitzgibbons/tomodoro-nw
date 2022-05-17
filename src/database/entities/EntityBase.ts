
export class NotDefinedError extends Error {}

export abstract class EntityBase {
    id:number
    _innerObj: {createdAt?:Date, updatedAt?:Date} = {}

    constructor(args:any) {
        const {id, _innerObj} = args
        this.id = id
        this._innerObj = _innerObj
        Object.assign(this, args)
    }

    bindValue = (_: any):any => { throw new NotDefinedError() }


    get createdAt():Date|undefined { return this._innerObj?.createdAt }
    get updatedAt():Date|undefined { return this._innerObj?.updatedAt }


}