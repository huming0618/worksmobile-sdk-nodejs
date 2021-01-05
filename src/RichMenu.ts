declare module RichMenuSpec {

    export interface Size {
        width: number;
        height: number;
    }

    export interface Bounds {
        x: number;
        y: number;
        width: number;
        height: number;
    }

    export interface Action {
        type: string;
        label: string;
        text: string;
    }

    export interface Area {
        bounds: Bounds;
        action: Action;
    }

    export class RichMenuObject {
        size: Size;
        name: string;
        areas: Area[];
    }

}

class RichMenu {
    private menu:RichMenuSpec.RichMenuObject = new RichMenuSpec.RichMenuObject()

    constructor(name:string){
        this.menu.name = name
    }


    addArea(bounds:RichMenuSpec.Bounds, action:RichMenuSpec.Action){
        this.menu.areas.push({
            bounds, action
        })
    }

    getJSON(){
        return this.menu
    }
}

export class RichMenuFactory {
    static create(name:string):RichMenu {
        return new RichMenu(name)
    }
}

