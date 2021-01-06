declare module RichMenuSpec {
    interface Size {
        width: number;
        height: number;
    }
    interface Bounds {
        x: number;
        y: number;
        width: number;
        height: number;
    }
    interface Action {
        type: string;
        label: string;
        text: string;
    }
    interface Area {
        bounds: Bounds;
        action: Action;
    }
    class RichMenuObject {
        size: Size;
        name: string;
        areas: Area[];
    }
}
declare class RichMenu {
    private menu;
    constructor(name: string);
    addArea(bounds: RichMenuSpec.Bounds, action: RichMenuSpec.Action): this;
    getJSON(): RichMenuSpec.RichMenuObject;
}
export default class RichMenuFactory {
    static create(name: string): RichMenu;
}
export {};
