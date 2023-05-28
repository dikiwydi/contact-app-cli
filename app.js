const yargs = require("yargs");
const { simpanContact, listContact, detailContact, deleteContact } = require("./contact");

yargs
    .command({
        command: "add",
        describe: "menambahkan contact baru ",
        builder: {
            nama: {
                describe: "nama lengkap",
                demandOption: true,
                type: "string",
            },
            email: {
                describe: "email",
                demandOption: false,
                type: "string",
            },
            nomor: {
                describe: "nomor hp",
                demandOption: true,
            },
        },
        handler: (argv) => {
            simpanContact(argv.nama, argv.email, argv.nomor);
        },
    })
    .demandCommand();

// menampilkan daftar list  kontak
yargs.command({
    command: "list",
    describe: "menampilkan list nama dan nomor",
    handler: (argv) => {
        listContact(argv);
    },
});
// detail contact
yargs.command({
    command: "detail",
    describe: "menampilkan detail seluruh kontak",
    builder: {
        nama: {
            describe: "detail",
            demandOption: true,
            type: "string",
        },
    },
    handler: (argv) => {
        detailContact(argv.nama);
    },
});

// memnghapus contact
yargs.command({
    command: "remove",
    describe: "menghapus kontak",
    builder: {
        nama: {
            describe: "detail",
            demandOption: true,
            type: "string",
        },
    },
    handler: (argv) => {
        deleteContact(argv.nama);
    },
});
yargs.parse();

// mengambil argumen dari comand line
// console.log(process.argv);

// const { simpanContact, pertanyaan } = require("./contact");
// const main = async () => {
//     const nama = await pertanyaan("masukan nama kamu : ");
//     const email = await pertanyaan("masukan email kamu : ");
//     simpanContact(nama, email);
// };
// main();
