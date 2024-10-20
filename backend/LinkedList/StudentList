// linkedList.js
class Node {
  constructor(data) {
    this.data = data; // The student data
    this.next = null; // Pointer to the next node
  }
}

class LinkedList {
  constructor() {
    this.head = null; // Head of the list
    this.tail = null; // Tail of the list
    this.size = 0; // Size of the list
  }

  // Add a student to the end of the list
  add(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.size++;
  }

  // Remove a student from the front of the list
  remove() {
    if (!this.head) return null; // List is empty
    const removedData = this.head.data;
    this.head = this.head.next;
    this.size--;
    return removedData;
  }

  // Get the current list of students
  getList() {
    const list = [];
    let current = this.head;
    while (current) {
      list.push(current.data);
      current = current.next;
    }
    return list;
  }
}

module.exports = LinkedList;
