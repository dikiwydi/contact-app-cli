const fs = require("fs");
// const readLine = require("readline");
const validator = require("validator");
const chalk = require("chalk");


if (!fs.existsSync("./data")) {
    fs.mkdirSync("./data");
}
if (!fs.existsSync("./data/contact.json")) {
    fs.writeFileSync("./data/contact.json", "[]", "utf-8");
}
// const rl = readLine.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });

// const pertanyaan = (pertanyaan) => {
//     return new Promise((resolve, rejects) => {
//         rl.question(pertanyaan, (nama) => {
//             resolve(nama);
//         });
//     });
// };

const readContact = () => {
    const file = fs.readFileSync("data/contact.json", "utf-8");
    const contacts = JSON.parse(file);
    return contacts;
};

const simpanContact = (nama, email, nomor) => {
    const contact = { nama, email, nomor };
    const contacts = readContact();
    // JIKA ADA DUPLIKAT
    const duplikat = contacts.find((contact) => contact.nama === nama);
    if (duplikat) {
        console.log(chalk.red.inverse.bold("nama sudah ada terdaftar mohon di ganti"));
        return false;
    }
    // jika tidak masukan email
    if (email) {
        if (!validator.isEmail(email)) {
            console.log(chalk.red.inverse.bold("harap masukan email yang bener"));
            return false;
        }
    }
    // jika nomor tidak indonesia

    if (!validator.isMobilePhone(nomor, "id-ID")) {
        console.log(chalk.red.inverse.bold("harap masukan nomor indo"));
        return false;
    }

    contacts.push(contact);

    fs.writeFileSync("data/contact.json", JSON.stringify(contacts));
    console.log("terimah kasih sudha mengisi");
    // rl.close();
};

// function menampilakn listcontact
const listContact = () => {
    const contacts = readContact();
    console.log("daftar kontak");
    contacts.forEach((contact, i) => {
        console.log(`${i + 1} ${contact.nama} - ${contact.nomor}`);
    });
};
// function menampilkan detail contact

const detailContact = (nama) => {
    const contacts = readContact();
    const contact = contacts.find((contact) => {
        return contact.nama.toLowerCase() === nama.toLowerCase();
    });

    if (!contact) {
        console.log(`${nama} tidak di temukan`);
        return false;
    }
    console.log(contact.nama);
    console.log(contact.nomor);
    if (contact.email) {
        console.log(contact.email);
    }
};

// menghapus kontak
const deleteContact = (nama) => {
    const contacts = readContact();
    const newContacts = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase());

    if (contacts.length === newContacts.length) {
        console.log(`${nama} tidak di temukan`);
        return false;
    }
    fs.writeFileSync("data/contact.json", JSON.stringify(newContacts));
    console.log("terimah kasih sudha megnhapus");
};
module.exports = { simpanContact, listContact, detailContact, deleteContact };
