//node for the doubly linked list, containing status and id
class TrekkerNode {
    constructor(trekkerId, capacity = 12, status = 'not-available') {
        this.trekkerId = trekkerId;
        this.status = status;
        this.capacity = capacity // MaxCapacity of the trekker (by default 12)
        this.studentsInTrekker = 0; // no of students in trekker currently
        this.next = null;
        this.prev = null;
    }

    //adding the students in trekker
    addStudent() {
        if(this.studentsInTrekker < this.capacity) {
            this.studentsInTrekker += 1;
            return true;
        }
        return false; //that student cant be added hence false
    }

    removeStudent() {
        if(this.studentsInTrekker > 0) {
            this.studentsInTrekker -= 1;
            return true;
        }
        return false;
    }

    getAvailableSeats() {
        return this.capacity - this.studentsInTrekker;
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
    addTrekker(trekkerId, capacity = 12) {
        //checking if node with same id already exists
        if(this.trekkerMap[trekkerId]) return ;
        if(capacity <= 0) capacity = 12;

        const newTrekker = new TrekkerNode(trekkerId, capacity);
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

    //addign student to trekker
    addStudentToTrekker(trekkerId) {
        const trekkerNode = this.trekkerMap[trekkerId];
        if(!trekkerNode) return { message: "Trekker not found!" }
        if(trekkerNode && trekkerNode.addStudent()) return { message: "Student added to the trekker successfully!" };
        return { message: "Trekker is full!" };
    }

    //removing student from trekker
    removeStudentFromTrekker(trekkerId) {
        const trekkerNode = this.trekkerMap[trekkerId];
        if(!trekkerNode) return { message: "Trekker not found!" }
        if(trekkerNode && trekkerNode.removeStudent()) return { message: "Student removed successfully!" };
        return { message: "Trekker is empty!" };
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
            if(current.status === 'available') {
                availableTrekkers.push({
                    trekkerId: current.trekkerId,
                    availableSeats: current.getAvailableSeats(),
                });
            }
            current = current.next;
        }
        return availableTrekkers;
    }

    displayList() {
        let current = this.head;
        while(current) {
            console.log(`${current.trekkerId} ${current.status} (Seats left: ${current.getAvailableSeats()})`);
            current = current.next;
        }
    }
}

module.exports = TrekkerList;