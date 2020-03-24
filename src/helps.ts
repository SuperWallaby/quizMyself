import { useState } from "react";
import { openDB, deleteDB, wrap, unwrap, IDBPDatabase } from "idb";
import { MyDB } from "./types/declations";
// @ts-ignore
import detectBrowserLanguage from "detect-browser-language";
import { Tlangs } from "./interface";


const DB_VERSION = 7;
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

export const getHint = (data: any[], activeStep: number) => {
    let hintString = "○";
    const rightAnswer = data[activeStep].answer || "";

    if (rightAnswer.length > 2) {
        const first = rightAnswer.substring(0, 1);
        hintString = first + new Array(rightAnswer.length - 1).fill("○").join("");
    }

    return hintString

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
                if (!oldVersion) {
                    const store = db.createObjectStore("question", {
                        keyPath: "id",
                        autoIncrement: true
                    });
                    store.createIndex("date", "date");
                } else {
                    transaction.done.then(async () => {
                        let cursor = await db?.transaction("question", "readwrite").store.openCursor();
                        while (cursor) {
                            if (cursor.value.type === undefined) {
                                cursor.value.type = "essayQ"
                            }
                            if (cursor.value.priority === undefined)
                                cursor.value.priority = 9;
                            await cursor.update(cursor.value);
                            console.log("udpated");
                            cursor = await cursor.continue();
                        }
                    });
                }

            },
            blocked() {
                console.info("blcoked");
            },
            blocking() {
                console.info("blocking");
            },
            terminated() {
                console.info("terminated");
            }
        }).catch(e => { console.error(e) }).then(v => { DB = v || null }).finally(() => {
            setLoading(false);
        })
    }
    return { loading }
}


export const getLang = (): string => {
    return getUrlLang() || localStorage.getItem("currentLang") || detectBrowserLanguage();
}

export const getUrlLang = (): Tlangs | null => {
    const url_string = window.location.href;
    const url = new URL(url_string);
    const ln = url.searchParams.get("ln");
    return ln as Tlangs
}
