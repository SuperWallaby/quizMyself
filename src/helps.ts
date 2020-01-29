import { useState } from "react";
import { openDB, deleteDB, wrap, unwrap, IDBPDatabase } from "idb";
import { MyDB } from "./types/declations";


const DB_VERSION = 1.0;
export let DB: null | IDBPDatabase<MyDB> = null;

export function shuffle(array: any[]) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}



export const checkIndexDBsupport = () => {
    if (!window.indexedDB) {
        console.log(
            "Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available."
        );
    }
}

export const useDB = () => {
    const [loading, setLoading] = useState(true);
    if (!DB && loading) {
        openDB<MyDB>("Selfquestion", DB_VERSION, {
            upgrade(db, oldVersion, newVersion, transaction) {
                const store = db.createObjectStore("question", {
                    keyPath: "id",
                    autoIncrement: true
                });
                store.createIndex("date", "date");
            },
            blocked() { },
            blocking() { },
            terminated() { }
        }).catch(e => { console.error(e) }).then(v => { DB = v || null }).finally(() => {
            setLoading(false);
        })
    }
    return { loading }
}