
export class NotDefinedError extends Error {}

export abstract class EntityBase {

    _innerObj: {createdAt?:Date, updatedAt?:Date} = {}

    constructor(args:any) {
        this._innerObj = args
        Object.assign(this, args)
    }

    bindValue = (_: any):any => { throw new NotDefinedError() }


    get createdAt():Date|undefined { return this._innerObj?.createdAt }
    get updatedAt():Date|undefined { return this._innerObj?.updatedAt }


}