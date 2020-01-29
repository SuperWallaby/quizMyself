import { DBSchema } from "idb";

interface IDBCommon {
    id?: number
}

export interface AppInfo {
    needGuid: boolean;
}

export interface QuestionCreate {
    question: string;
    answer: any;
    date: Date;
}
export interface Question extends IDBCommon {
    question: string;
    answer: any;
    date: Date;
}

export interface QExame extends Question {
    solved: boolean;
}

export interface MyDB extends DBSchema {
    question: {
        value: Question;
        key: string;
        indexes: { 'date': Date };
    };
}