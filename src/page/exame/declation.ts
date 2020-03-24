import React from "react";
import { QExame } from "../../types/declations";
import { IUseModal } from "../../hooks/hook";
import { TSurrenderModalInfo } from "../createQuestion/components/SurrenderModal";
import { IToastProps } from "../../atom/Toast";

export type TExameContext = {
    data: QExame[];
    setData: React.Dispatch<React.SetStateAction<QExame[]>>;
    setHint: React.Dispatch<React.SetStateAction<string>>;
    isLastStep: boolean;
    currentQuiz: QExame;
    expect: string;
    surrenderModalHook: IUseModal<TSurrenderModalInfo>;
    isFinish: boolean;
    activeStep: number;
    hint: string;
    detailMode: boolean;
    setDetailMode: React.Dispatch<React.SetStateAction<boolean>>;
    setActiveStep: React.Dispatch<React.SetStateAction<number>>;
    setIsFinish: React.Dispatch<React.SetStateAction<boolean>>;
    setExpect: React.Dispatch<React.SetStateAction<string>>;
    toastOps?: IToastProps,
    toastHandle: (options: IToastProps) => void
}