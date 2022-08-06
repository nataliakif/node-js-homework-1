const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const {
  listContacts,
  addContact,
  getContactById,
  removeContact,
} = require("./contacts");

// TODO: рефакторить

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const list = await listContacts();
      console.log(list);
      break;

    case "get":
      const contact = await getContactById(id);
      console.log(contact);
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      console.log(newContact);
      break;

    case "remove":
      const contactToDelete = await removeContact(id);
      console.log(contactToDelete);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

// invokeAction({ action: "list" });
// invokeAction({ action: "get", id: "2" });
// invokeAction({
//   action: "add",
//   name: "Natalia",
//   email: "nataliakiif@gmail.com",
//   phone: "234-345-678",
// });
// invokeAction({ action: "remove", id: "3" });

invokeAction(argv);
