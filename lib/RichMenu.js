"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RichMenu {
    constructor(name) {
        this.menu = new RichMenuSpec.RichMenuObject();
        this.menu.name = name;
    }
    addArea(bounds, action) {
        this.menu.areas.push({
            bounds, action
        });
        return this;
    }
    getJSON() {
        return this.menu;
    }
}
class RichMenuFactory {
    static create(name) {
        return new RichMenu(name);
    }
}
exports.default = RichMenuFactory;
