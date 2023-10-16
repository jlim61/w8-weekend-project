import { v4 as uuidv4 } from 'uuid'

// ==================================================================================Classes==================================================================================

abstract class InventoryItem {

    private _id: string;
    private _name: string;
    private _price: number;
    private _description: string;
    private _quantity: number;

    constructor(_name: string, _price: number, _description: string) {
        this._id = uuidv4();
        this._name = _name;
        this._price = _price;
        this._description = _description;
        this._quantity = 0
    }

// getters and setters
    public get id(): string {
        return this._id;
    }

    // made a setter but I don't think it should be allowed to be set because it might not be unique
    // anymore so I commented it out, but had it here to meet requirements
    // public set id(id: string) {
    //     this._id = id;
    // }

    public get name(): string {
        return this._name;
    }

    public set name(name: string) {
        this._name = name;
    }

    public get price(): number {
        return this._price;
    }

    public set price(price: number) {
        this._price = price;
    }

    public get description(): string {
        return this._description;
    }

    public set description(description: string) {
        this._description = description;
    }

    public get quantity(): number {
        return this._quantity;
    }

    public set quantity(quantity: number) {
        this._quantity = quantity;
    }

}


class Weapon extends InventoryItem {

    private _damage: number
    private _range: boolean

    constructor(name: string, price: number, description: string, _damage: number, _range: boolean) {
        super(name, price, description)
        this._damage = _damage
        this._range = _range
    }

// getters and setters
    public get damage(): number {
        return this._damage
    }

    public set damage(damage: number) {
        this._damage = damage
    }

    public get range(): boolean {
        return this._range
    }

    public set range(range: boolean) {
        this._range = range
    }
}

class Armor extends InventoryItem {

    private _defense: number

    constructor(name: string, price: number, description: string, _defense: number) {
        super(name, price, description)
        this._defense = _defense
    }

// getters and setters
    public get defense(): number {
        return this._defense
    }

    public set defense(defense: number) {
        this._defense = defense
    }
}

class Character {

    private _id: string
    private _name: string
    private _archtype: string
    private _fightingStyle: 'melee' | 'ranged'
    private _inventory: InventoryItem[]
    private container: HTMLElement
    private characterDiv: HTMLDivElement

    constructor(_name: string, _archtype: string, _fightingStyle: 'melee' | 'ranged', _inventory: InventoryItem[] = []){
        this._id = uuidv4()
        this._name = _name
        this._archtype = _archtype
        this._fightingStyle = _fightingStyle
        this._inventory = _inventory
        this.container = document.querySelector('main')!
        this.characterDiv = document.querySelector('.character-div')!
    }
// getters amd setters
    public get id(): string {
        return this._id;
    }

    // made a setter but I don't think it should be allowed to be set because it might not be unique
    // anymore so I commented it out, but had it here to meet requirements
    // public set id(id: string) {
    //     this._id = id;
    // }

    public get name(): string {
        return this._name;
    }

    public set name(name: string) {
        this._name = name;
    }

    public get archtype(): string {
        return this._archtype;
    }

    public set archtype(archtype: string) {
        this._archtype = archtype;
    }

    public get fightingStyle(): 'melee' | 'ranged' {
        return this._fightingStyle;
    }

    public set fightingStyle(fightingStyle: 'melee' | 'ranged') {
        this._fightingStyle = fightingStyle;
    }

    public get inventory(): InventoryItem[] {
        return this._inventory;
    }

    public set inventory(inventory: InventoryItem[]) {
        this._inventory = inventory;
    }

// ========Character Class Methods========

    static createRPGCharacter(name: string, archtype: string): Character{
        return new Character(name, archtype, 'melee')
    }

    addToInventory(inventoryItem: InventoryItem): void {
        const existingItem = this._inventory.find(item => item.name === inventoryItem.name)
        if (existingItem){
            existingItem.quantity += 1
        } else {
            inventoryItem.quantity = 1
            this._inventory.push(inventoryItem)
        }
    }

    removeFromInventory(inventoryItem: InventoryItem) {
        this._inventory = this._inventory.filter(item => item.name !== inventoryItem.name)
    }

    removeQuantityFromInventory(inventoryItem: InventoryItem, quantityToRemove: number) {
        const item = this._inventory.find(item => item.id === inventoryItem.id);
    
        if (item && item.quantity >= quantityToRemove) {
            item.quantity -= quantityToRemove;
        } else if (item && item.quantity === 0) {
            this._inventory = this._inventory.filter(item => item.name !== inventoryItem.name)
        }
    }
    
    inventoryValue(): number{
        let total = 0
        this._inventory.forEach(item => {
            total += item.price
        })
        console.log(`Total Inventory Value: ${total} Coins`)
        return total
    }

    inventoryHTMLElement(): HTMLElement {
        this.characterDiv.innerHTML = ''
        for (const item of this._inventory) {
            const itemDiv = this.createItemDiv(item)
            itemDiv.className = 'created-item-div'
            this.characterDiv.appendChild(itemDiv)
        }
        return this.characterDiv
    }

    createItemDiv(item: InventoryItem): HTMLDivElement {
        const itemDiv = document.createElement('div')
        itemDiv.className = 'item-div'
        const p = document.createElement('p')
        this.updatePText(p, item)
        itemDiv.appendChild(p)
        this.addItemButtons(itemDiv, item)
        return itemDiv
    }

    updatePText(p: HTMLParagraphElement, item: InventoryItem): void {
        p.innerText = `${item.name}
        Price: ${item.price} Coins
        Description: ${item.description}
        Quantity: ${item.quantity}`
    }

    addItemButtons(div: HTMLDivElement, item: InventoryItem): void {
        const buttonContainer = document.createElement('div');
        const removeOneItemButton = document.createElement('button');
        removeOneItemButton.innerText = 'Remove One';
        const removeAllItemButton = document.createElement('button');
        removeAllItemButton.innerText = 'Remove All';
        this.addRemoveEventListeners(item, removeOneItemButton, removeAllItemButton);
        buttonContainer.append(removeOneItemButton, removeAllItemButton);
        div.appendChild(buttonContainer);
    }

    addRemoveEventListeners(item: InventoryItem, removeOneItemButton: HTMLButtonElement, removeAllItemButton: HTMLButtonElement): void {
        removeOneItemButton.addEventListener('click', () => {
            this.removeQuantityFromInventory(item, 1);
            this.inventoryHTMLElement();
        });

        removeAllItemButton.addEventListener('click', () => {
            this.removeFromInventory(item);
            this.inventoryHTMLElement();
        });
    }
}

class Inventory {

    private _items: InventoryItem[]
    private container: HTMLElement
    private shopDiv: HTMLDivElement
    private inventoryDiv: HTMLDivElement

    constructor(_items: InventoryItem[]){
        this._items = _items
        this.container = document.querySelector('main')!
        this.shopDiv = document.querySelector('.shop-div')!
        this.inventoryDiv = document.querySelector('.inventory-div')!
    }

// getters and setters
    public get items(): InventoryItem[] {
        return this._items
    }

    public set items(items: InventoryItem[]) {
        this._items = items
    }

// ========Inventory Class Methods========
    showItems():HTMLElement {
        this.shopDiv.innerHTML = ''
        for (const item of this._items) {
            const inventoryItemDiv = this.createInventoryItemDiv(item)
            inventoryItemDiv.className = 'inventory-item-div'
            this.shopDiv.appendChild(inventoryItemDiv)
        }
        return this.shopDiv
    }

    createInventoryItemDiv(item: InventoryItem): HTMLDivElement {
        const inventoryItemDiv = document.createElement('div')
        const p = document.createElement('p')
        this.updatePText(p, item)
        inventoryItemDiv.appendChild(p)
        return inventoryItemDiv
    }

    updatePText(p: HTMLParagraphElement, item: InventoryItem): void {
        p.innerText = `${item.name}
        Price: ${item.price} Coins
        Description: ${item.description}
        Quantity: ${item.quantity}`
    }

    updateInventory():HTMLElement{
        this.inventoryDiv.innerHTML = ''
        if (this._items) {
            for (const item of this._items) {
                const inventoryItemDiv = this.createInventoryItemDivWithButtons(item)
                inventoryItemDiv.className = 'inventory-item-div'
                this.inventoryDiv.appendChild(inventoryItemDiv)
            }
        } else {this.inventoryDiv.innerHTML = 'Inventory is empty'}

        return this.inventoryDiv
    }

    createInventoryItemDivWithButtons(item: InventoryItem): HTMLDivElement {
        const inventoryItemDiv = document.createElement('div')
        const p = document.createElement('p')
        this.updatePText(p, item)
        inventoryItemDiv.appendChild(p)
        this.addItemButtons(inventoryItemDiv, item)
        return inventoryItemDiv
    }

    addItemButtons(div: HTMLDivElement, item: InventoryItem): void {
        const buttonContainer = document.createElement('div');
        const removeOneItemButton = document.createElement('button');
        removeOneItemButton.innerText = 'Remove One';
        const removeAllItemButton = document.createElement('button');
        removeAllItemButton.innerText = 'Remove All';
        this.addRemoveEventListeners(item, removeOneItemButton, removeAllItemButton);
        buttonContainer.append(removeOneItemButton, removeAllItemButton);
        div.appendChild(buttonContainer);
    }

    addRemoveEventListeners(item: InventoryItem, removeOneItemButton: HTMLButtonElement, removeAllItemButton: HTMLButtonElement): void {
        removeOneItemButton.addEventListener('click', () => {
            this.removeQuantityFromInventory(item, 1);
            this.updateInventory();
        });

        removeAllItemButton.addEventListener('click', () => {
            this.removeFromInventory(item);
            this.updateInventory();
        });
    }

    removeFromInventory(inventoryItem: InventoryItem) {
        this._items = this._items.filter(item => item.name !== inventoryItem.name)
    }

    removeQuantityFromInventory(inventoryItem: InventoryItem, quantityToRemove: number) {
        const item = this._items.find(item => item.id === inventoryItem.id);
    
        if (item && item.quantity >= quantityToRemove) {
            item.quantity -= quantityToRemove;
        } else if (item && item.quantity === 0) {
            this._items = this._items.filter(item => item.name !== inventoryItem.name)
        }
    }

    createRPGItems(character: Character): InventoryItem[]{
        const starterItem1 = new Weapon('Starter Sword', 1, 'A sword great for beginners', 5, false);
        starterItem1.quantity += 1
        const starterItem2 = new Armor('Starter Platebody', 1, 'A great beginner armor', 5);
        starterItem2.quantity += 1
        const starterItem3 = new Armor('Starter Platelegs', 1, 'A great beginner armor', 5)
        starterItem3.quantity += 1
        character.addToInventory(starterItem1)
        character.addToInventory(starterItem2)
        character.addToInventory(starterItem3)
        return character.inventory
    }
}

class Shop {

    private _items: InventoryItem[]

    constructor(_items: InventoryItem[]){
        this._items = _items
    }

// getters and setters
    public get items(): InventoryItem[] {
        return this._items
    }

    public set items(items: InventoryItem[]) {
        this._items = items
    }

// ========Shop Class Methods========
    shopConstructor(item1: InventoryItem, item2: InventoryItem, item3: InventoryItem): void{
        const anItem = item1
        const anItem2 = item2
        const anItem3 = item3
        this._items.push(anItem, anItem2, anItem3)
    }
    autoConstructor(): void{
        const anItem = new Armor('Justiciar Faceguard', 14442221, 'A helm that once belonged to a Justiciar, a loyal zealot of Saradomin.', 75)
        const anItem2 = new Armor('Justiciar Chestguard', 18249491, "A Justiciar's chestguard. They once roamed the land casting judgements on wrongdoers, their decisions were never questioned.", 75)
        const anItem3 = new Armor('Justiciar Legguards', 13744156, "	A Justiciar's platelegs. Their once bright colours have since faded.", 75)
        this._items.push(anItem, anItem2, anItem3)
    }
}


// ==================================================================================Driver==================================================================================

document.addEventListener("DOMContentLoaded", function() {
    const character = Character.createRPGCharacter('Cow31337Killer', 'Warrior');
    const shopInventory = new Inventory(character.inventory)
    shopInventory.createRPGItems(character)
    const item1 = new Weapon('Sword', 10, 'A basic sword', 15, false);
    const item2 = new Weapon('Bow', 15, 'A ranged weapon', 10, true);
    const item3 = new Armor('Chainmail', 20, 'Protective armor', 30);
    const item4 = new Armor('Helmet', 15, 'No arrows to the head here', 20)
    const item5 = new Weapon('Staff', 50, 'Make Gandalf proud', 40, true)
    character.addToInventory(item1);
    character.addToInventory(item2);
    character.addToInventory(item3);
    character.addToInventory(item3);
    character.addToInventory(item3);
    character.inventoryHTMLElement()

    shopInventory.showItems()
    character.addToInventory(item4);
    character.addToInventory(item5);
    shopInventory.updateInventory()
    console.log(character)
    console.log(shopInventory)
});