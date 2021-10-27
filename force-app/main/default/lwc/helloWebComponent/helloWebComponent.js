import { LightningElement, track, api } from "lwc";

export default class HelloWebComponent extends LightningElement {
  @track greeting = "Trailblazer";
  @api strRecordId;
  arrayFields = ["Name", "AccountNumber", "Phone", "Type", "Website"];

  handleGreetingChange(event) {
    this.greeting = event.target.value;
  }

  currentDate = new Date().toDateString();
  get capitalizedGreeting() {
    return `Hello ${this.greeting.toUpperCase()}!`;
  }
}
