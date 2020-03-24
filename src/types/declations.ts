import { DBSchema } from "idb";

interface IDBCommon {
    id: number
}

export interface AppInfo {
    needGuid: boolean;
}


export type TtempOption = { op: string; checked: boolean };

export type TquizType = "essayQ" | "multipleQ";


// DB에 들어가는 문제들
export interface Question extends IDBCommon {
    question: string;
    // 객관식일 경우 옵션 선택한것을 순서대로 스트링 합하면됨
    answer: any;
    type: TquizType
    date: Date;
    img?: Blob;
    priority: number;
    smallQuestion?: string;
    explain?: string
    customHint?: string
    lastSolve?: Date;
    options?: string[];
}

// 시험문제
export interface QExame {
    data: Question;
    testResult?: boolean;
    solve: () => Promise<void>;
    surrender: () => Promise<void>;
}

export interface MyDB extends DBSchema {
    question: {
        value: Question;
        key: string;
        indexes: { 'date': Date };
    };
}