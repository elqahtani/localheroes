var insert = function(db) {
    // Get the documents collection
    db
        .collection("pahlawan")
        // Insert some documents
        .insertMany(
            [{ firstName: "Pangeran", lastName: "Diponegoro", die: 70, area: "Yogyakarta", senjata: "keris" },
            { firstName: "Sultan", lastName: "Hasanuddin", die: 39, area: "Makassar", senjata: "badik" },
            { firstName: "Tuanku", lastName: "Imam Bonjol", die: 92, area: "Padang", senjata: "meriam" },
            { firstName: "Jendral", lastName: "Sudirman", die: 34, area: "Purbalingga", senjata: "senapan api" },
            { firstName: "Bung", lastName: "Tomo", die: 61, area: "Surabaya", senjata: "bambu runcing" },
            { firstName: "Cut Nyak", lastName: "Dhien", die: 60, area: "Aceh", senjata: "rencong" }],

            function(err, result) {
                console.log("Inserted 3 documents into the document collection");
            })
}

module.exports = insert