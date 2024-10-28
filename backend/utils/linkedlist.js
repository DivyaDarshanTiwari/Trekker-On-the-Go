//Linked List for maintaining Passenger Waiting List
//It will be a Sorted Linked List as one who requests at early time should be shown above

//class for representing passenger (basically the name and when the user asked for trekker availability)
class PassengerNode {
    constructor(name, requestTime) {
        this.name = name;
        this.requestTime = requestTime;
        this.next = null;
    }
}

//Waiting list maintaining the passengers
class WaitingList {
    constructor() {
        this.head = null; //initialization of linked list
    }

    //addition operation based on sorted time of request
    addPassenger(name, requestTime) {
        const newNode = new PassengerNode(name, requestTime);

        //if first node or newnode has requestTime lesss than headnode
        if(!this.head || this.head.requestTime > requestTime) {
            newNode.next = this.head;
            this.head = newNode;
        } else {
            //traverse to correct position according to request time
            let current = this.head;
            while(current.next && current.next.requestTime <= requestTime) {
                current = current.next;
            }
            newNode.next = current.next;
            current.next = newNode;
        }
    }

    removePassenger(name) {
        if(!this.head) return false; //empty list

        //if head is to be removed
        if(this.head.name === name) {
            this.head = this.head.next;
            return true;
        }

        //traverse to the node need to be removed
        let current = this.head;
        while(current.next && current.next.name != name) {
            current = current.next;
        }
        if(current.next) {
            current.next = current.next.next;
            return true;
        }

        return false; //in case passenger not found
    }

    //finding a passenger with name
    findPassenger(name) {
        let current = this.head;
        while(current) {
            if(current.name === name) return current;
            current = current.next;
        }
        return null; //if passenger not found
    }

    getSize() {
        let count = 0;
        let current = this.head;
        while(current) {
            count++;
            current = current.next;
        }
        return count;
    }

    getFirstPassenger() {
        return this.head;
    }

    //deleting the whole list
    clearList() {
        this.head = null;
    }

    displayList() {
        let current = this.head;
        const list = [];
        while(current) {
            list.push({ name: current.name, requestTime: current.requestTime });
            current = current.next;
        }
        return list;
    }
}

module.exports = WaitingList;