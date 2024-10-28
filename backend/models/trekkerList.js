//node for the doubly linked list, containing status and id
class TrekkerNode {
    constructor(trekkerId, status = 'available') {
        this.trekkerId = trekkerId;
        this.status = status;
        this.next = null;
        this.prev = null;
    }
}

//list and map structure for operations
class TrekkerList {
    //initialising the list
    constructor() {
        this.trekkerMap = {}; //Hash-Map for fast lookups
        this.head = null;
        this.tail = null;
    }

    //adding trekker while logging in
    addTrekker(trekkerId) {
        const newTrekker = new TrekkerNode(trekkerId);
        this.trekkerMap[trekkerId] = newTrekker;

        //if it is an empty list
        if(!this.head) {
            this.head = this.tail = newTrekker;
        } else {
            newTrekker.next = this.head;
            this.head.prev = newTrekker;
            this.head = newTrekker;
        }
    }

    //updating trekker status to `avaiable` or `On the Go`
    updateTrekkerStatus(trekkerId, status) {
        const trekkerNode = this.trekkerMap[trekkerId];
        if(trekkerNode) trekkerNode.status = status;
    }

    //removing trekker from list on logging out
    removeTrekker(trekkerId) {
        const trekkerNode = this.trekkerMap[trekkerId];
        if(!trekkerNode) return false;

        //if head is to be deleted
        if(trekkerNode === this.head) {
            this.head = trekkerNode.next;
            if(this.head) this.head.prev = null;
        } else if(trekkerNode === this.tail) {
            this.tail = trekkerNode.prev;
            if(this.tail) this.tail.next = null;
        } else {
            trekkerNode.next.prev = trekkerNode.prev;
            trekkerNode.prev.next = trekkerNode.next;
        }
        
        //deleting from the hash-map
        delete this.trekkerMap[trekkerId];
        return true;
    }

    //printing all avaiable trekkers
    getAvailableTrekkers() {
        let current = this.head;
        const availableTrekkers = [];
        while(current) {
            if(current.status === 'available') availableTrekkers.push(current.trekkerId);
            current = current.next;
        }
        return availableTrekkers;
    }

    displayList() {
        let current = this.head;
        while(current) {
            console.log(current.trekkerId + " " + current.status);
            current = current.next;
        }
    }
}

module.exports = TrekkerList;